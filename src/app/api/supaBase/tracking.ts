import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (
  loc?: any,
  locations?: any,
  locationIpAddress?: string,
  browseDatas?: any,
  ctaBtnLink?: string,
  campaignName?:string,
  eventType?: string
) => {
  const url = loc;
  const customerValue = loc.search.replace("?domain=", "");
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
  const countryName = regionNamesInEnglish?.of(locations?.country || "US");

  try {
    const { data, error } = await supabase
      .from("iframe_events")
      .insert([
        {
          current_path: url.href,
          e_type: eventType,
          utm_campaign: campaignName,
          domain: url.origin,
          browser: browseDatas[0].browser,
          os: browseDatas[0].os,
          platform: browseDatas[0].platform,
          referrer_url: window.document.referrer,
          ip_address: locationIpAddress,
          location: countryName,
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
