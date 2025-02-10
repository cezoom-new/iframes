import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (
  loc?: any,
  locations?: any,
  locationIpAddress?: string,
  browseDatas?: any,
  ctaBtnLink?: string,
  eventType?: string
) => {
  const url = loc;
  const customerValue = loc.search.replace("?domain=", "");

  try {
    const { data, error } = await supabase
      .from("page_views")
      .insert([
        {
          current_path: url.href,
          e_type: eventType,
          // utm_campaign: customerValue,
          domain: url.origin,
          browser: browseDatas[0].browser,
          os: browseDatas[0].os,
          referrer_url: browseDatas[2].referrer,
          ip_address: locationIpAddress,
          location: locations?.country,
          destination_url: ctaBtnLink,
          practice_name: customerValue,
          platform: browseDatas[3].platform
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
