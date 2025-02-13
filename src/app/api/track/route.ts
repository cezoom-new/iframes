import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Location {
  country?: string;
}

interface BrowserData {
  browser: string;
  os: string;
  platform: string;
}

interface TrackPageViewRequest {
  loc: URL;
  locations: Location;
  locationIpAddress: string;
  browserData: BrowserData[];
  ctaBtnLink?: string;
  campaignName?: string;
  eventType?: string;
}

export async function POST(req: NextRequest) {
  const request: any = await req.json();
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

  console.log({sessionId,userId})

  const customerValue = loc?.search?.replace("?domain=", "");
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryName = locations?.country
    ? regionNamesInEnglish.of(locations?.country)
    : "US";
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
        ip_address: locationIpAddress,
        location: countryName,
        destination_url: ctaBtnLink,
        practice_name: customerValue,
        session_id: sessionId,
        // user_id: userId,
      },
    ]);

    if (error) {
      console.error("Error inserting page view:", error.message);
      return new Response("", { status: 500 });
      //   return res.status(500).json({ error: error.message });
    } else {
      return new Response("", { status: 200 });
      //   return res.status(200).json({ data });
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
    return new Response("", { status: 500 });

    // return res.status(500).json({ error: "Error tracking page view" });
  }
}
