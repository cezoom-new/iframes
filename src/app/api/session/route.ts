import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  // const token = req.headers.get("Authorization");
  // if (token != process.env.REVALIDATE_SECRET) {
  //   return Response.json({
  //     error: true,
  //     status: 401,
  //     message: "UnAuthorized Token",
  //   });
  // }
  const cookieStore = await cookies();
  if (req.method == "POST") {
    const Ip = req.headers.get("x-forwarded-for");
    const {locationData} = await req.json();
    const userId = cookieStore?.get("_csi_uid")?.value;
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
      if (data && Object.keys(data)?.length) {
        cookieStore.set("_csi_sid", data?.id, {
          sameSite: "none",
          secure: true,
        });
      }
      if (error) {
        console.error("Error inserting page view:", error.message);
        return new Response("", { status: 500 });
      } else {
        return new Response("status 200 ok", { status: 200 });
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
      return new Response("", { status: 500 });
    }
  }
}
