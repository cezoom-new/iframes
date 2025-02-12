import { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method === "POST") {
    const {
      loc,
      locations,
      locationIpAddress,
      browserData,
      ctaBtnLink,
      campaignName,
      eventType,
    }: TrackPageViewRequest = req.body;


    const url = loc;
    const customerValue = loc.search.replace("?domain=", "");
    const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });
    const countryName = locations?.country
      ? regionNamesInEnglish.of(locations?.country)
      : "US";

    try {
      const { data, error } = await supabase.from("iframe_events").insert([
        {
          current_path: url.href,
          e_type: eventType,
          utm_campaign: campaignName,
          domain: url.origin,
          browser: browserData[0].browser,
          os: browserData[0].os,
          platform: browserData[0].platform,
          referrer_url: document.referrer, // Use document.referrer on server-side
          ip_address: locationIpAddress,
          location: countryName,
          destination_url: ctaBtnLink,
          practice_name: customerValue,
        },
      ]);

      if (error) {
        console.error("Error inserting page view:", error.message);
        return res.status(500).json({ error: error.message });
      } else {
        console.log("Page view saved:", data);
        return res.status(200).json({ data });
      }
    } catch (err) {
      console.error("Error tracking page view:", err);
      return res.status(500).json({ error: "Error tracking page view" });
    }
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
