import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization");
  // if (token != process.env.REVALIDATE_SECRET) {
  //   return Response.json({
  //     error: true,
  //     status: 401,
  //     message: "UnAuthorized Token",
  //   });
  // }
  
  if (req.method !== "POST") {
    return Response.json({
      error: true,
      status: 405,
      message: "Method not allowed",
    });
  }

  // Check if cookies are enabled by testing cookie functionality
  let cookiesEnabled = false;
  let cookieStore;
  
  try {
    cookieStore = await cookies();
    
    // Test cookie functionality by trying to set a test cookie
    cookieStore.set("_csi_test", "test", {
      sameSite: "none",
      secure: true,
      maxAge: 1, // 1 second test cookie
    });
    
    // Try to read the test cookie
    const testCookie = cookieStore.get("_csi_test");
    cookiesEnabled = !!(testCookie && testCookie.value === "test");
    
    // Clean up test cookie
    if (testCookie) {
      cookieStore.delete("_csi_test");
    }
    
  } catch (cookieError) {
    console.log("Cookies are disabled in session API:", cookieError);
    cookiesEnabled = false;
  }

  // If cookies are disabled, return error and don't create session
  if (!cookiesEnabled) {
    return Response.json({
      error: true,
      status: 403,
      message: "Cookies are disabled. Please enable cookies to create a session.",
    });
  }

  const Ip = req.headers.get("x-forwarded-for");
  const {locationData} = await req.json();
  const userId = cookieStore?.get("_csi_uid")?.value;

  // Handle null/undefined user ID
  if (!userId) {
    console.log("No user ID found in cookies, skipping session creation");
    return Response.json({
      error: true,
      status: 400,
      message: "User ID not found. Please ensure user is created first.",
    });
  }
  try {
    const { data, error } = await supabase
      .from("iframe_sessions")
      .insert([
        {
          user_id: userId,
          start_time: new Date(),
          end_time: new Date(),
          ip_address: Ip,
          location: locationData,
        },
      ])
      .select()
      .single();

    if (data && Object.keys(data)?.length && cookieStore) {
      try {
        cookieStore.set("_csi_sid", data?.id, {
          sameSite: "none",
          secure: true,
          maxAge: 60 * 60 * 24, // 24 hours
        });
      } catch (cookieError) {
        console.log("Failed to set session cookie:", cookieError);
        // Continue even if cookie setting fails
      }
    }

    if (error) {
      console.error("Error creating session:", error?.message || error);
      return Response.json({
        error: true,
        status: 500,
        message: "Failed to create session",
      });
    }

    return Response.json({ 
      success: true, 
      sessionId: data?.id,
      message: "Session created successfully" 
    });
  } catch (error) {
    console.error("Error in session API:", error);
    return Response.json({
      error: true,
      status: 500,
      message: "Internal server error",
    });
  }
}
