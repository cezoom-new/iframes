import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  console.log(req.cookies.get("_loc"), req.cookies.get("_iPa"), "eeeeee");
  const request: any = await req.json();
  const cookie = await cookies()
  const locationValue = req.cookies.get("_loc")?.value;
  const {
    loc,
    locations,
    locationIpAddress,
    browserData,
    ctaBtnLink,
    campaignName,
    eventType,
    sessionId,
    userId,
  }: any = request;

  console.log(req.headers.get("x-forwarded-for"), "yourIp");
  const userIp = locationIpAddress ?? req.headers.get("X-Forwarded-For");
  const sessionIdValue = cookie.get("_SID")
  const userIdValue = cookie.get("_UID")
  console.log(sessionIdValue,userIdValue,'IMP')

  const customerValue = loc?.search?.replace("?domain=", "");
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryName = locations?.country
    ? regionNamesInEnglish.of(locations?.country)
    : "US";
  try {
    console.log({
      current_path: loc.href,
      e_type: eventType,
      utm_campaign: campaignName,
      domain: loc.origin,
      browser: browserData.systemConfig.browser,
      os: browserData.systemConfig.os,
      platform: browserData.systemConfig.platform,
      referrer_url: browserData.referrerUrl,
      ip_address: userIp,
      location: locationValue,
      destination_url: ctaBtnLink,
      practice_name: customerValue,
      session_id: sessionId,
      user_id: userId,
    },'object to save 11111')
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
        ip_address: userIp,
        location: locationValue,
        destination_url: ctaBtnLink,
        practice_name: customerValue,
        session_id: sessionId,
        user_id: userId,
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

    // return res.status(500).json({ error: "Error tracking page view" });
  }
}
