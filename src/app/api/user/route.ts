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
  
  const request: any = await req.json();
  const { meta, loc, locationData, browserData }: any = request;
  const ip = req.headers.get("x-forwarded-for");
  const customerValue = loc?.search?.replace("?domain=", "");

  // Validate required fields
  if (!meta || !locationData || !browserData?.systemConfig?.browser) {
    return Response.json({
      error: true,
      status: 400,
      message: "Missing required fields: meta, locationData, or browserData",
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
    console.log("Cookies are disabled:", cookieError);
    cookiesEnabled = false;
  }

  // If cookies are disabled, return error and don't create user
  if (!cookiesEnabled) {
    return Response.json({
      error: true,
      status: 403,
      message: "Cookies are disabled. Please enable cookies to create a user account.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("iframe_users")
      .insert([
        {
          meta: meta,
          location: locationData,
          ip_address: ip,
          browser: browserData.systemConfig.browser,
          practice_name: customerValue,
        },
      ])
      .select()
      .single();

    /******
     * Setting cookie for userDetails
     * call  session Api
     *******/
    if (cookieStore && data && data.id) {
      try {
        cookieStore.set("_csi_uid", data.id, {
          sameSite: "none",
          secure: true,
          maxAge: 60 * 60 * 24 * 30 * 12,
        });
      } catch (cookieError) {
        console.log("Failed to set user cookie:", cookieError);
        // Continue even if cookie setting fails
      }
    }
    if (error) {
      console.error("Error creating user:", error?.message || error);
      return Response.json({
        error: true,
        status: 500,
        message: "Failed to create user",
      });
    }
    return Response.json({ id: data?.id });
  } catch (err) {
    console.error("Error in user API:", err);
    return Response.json({
      error: true,
      status: 500,
      message: "Internal server error",
    });
  }
}
