import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (
  loc: any,
  location: any,
  browseDatas: any,
  eventType: string
) => {
  const url = loc;
  const customerValue = loc.search.replace("?domain=", "");

  console.log("location",location);

  try {
    const { data, error } = await supabase
      .from("page_views")
      .insert([
        {
          current_path: url.href,
          e_type: eventType,
          utm_campaign: customerValue,
          domain: url.origin,
          browser: browseDatas[0].browser,
          os: browseDatas[0].os,
          entrypath: browseDatas[1].entryPath,
          referrer_url: browseDatas[2].referrer
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
