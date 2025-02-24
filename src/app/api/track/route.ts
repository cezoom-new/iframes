import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization");
  if (token != process.env.REVALIDATE_SECRET) {
    return Response.json({
      error: true,
      status: 401,
      message: "UnAuthorized Token",
    });
  }
  const request: any = await req.json();
  const cookie = await cookies();

  const {
    loc,
    browserData,
    ctaBtnLink,
    campaignName,
    eventType,
    sessionId,
    userId,
    element_id,
    e_name,
  }: any = request;

  const customerValue = loc?.search?.replace("?domain=", "");

  try {
    const { data, error } = await supabase.from("iframe_events").insert([
      {
        current_path: loc.href,
        e_type: eventType,
        utm_campaign: campaignName,
        domain: loc.origin,
        browser: browserData.systemConfig.browser,
        os: browserData.systemConfig.os,
        platform: browserData.systemConfig.platform,
        referrer_url: browserData.referrerUrl,
        destination_url: ctaBtnLink,
        practice_name: customerValue,
        session_id: sessionId,
        user_id: userId,
        element_id: element_id,
        e_name: e_name,
      },
    ]);

    if (error) {
      console.error("Error inserting page view:", error.message);
      return new Response("", { status: 500 });
    } else {
      return new Response("", { status: 200 });
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
    return new Response("", { status: 500 });
  }
}
