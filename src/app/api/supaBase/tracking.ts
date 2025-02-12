import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (
  loc?: any,
  locations?: any,
  locationIpAddress?: string,
  browseData?: any,
  ctaBtnLink?: string,
  campaignName?:string,
  eventType?: string
) => {
  const url = loc;
  const customerValue = loc.search.replace("?domain=", "");

  try {
    const { data, error } = await supabase
      .from("iframe_events")
      .insert([
        {
          current_path: url.href,
          e_type: eventType,
          utm_campaign: campaignName,
          domain: url.origin,
          browser: browseData[0].browser,
          os: browseData[0].os,
          platform: browseData[0].platform,
          referrer_url: window.document.referrer,
          ip_address: locationIpAddress,
          location: locations?.country,
          destination_url: ctaBtnLink,
          practice_name: customerValue,
        },
      ]);

    if (error) {
      console.error("Error inserting page view:", error.message);
    } else {
      console.log("Page view saved:", data);
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
};
