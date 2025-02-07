// packages/tracking/src/tracking.ts
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || "";
console.log(supabaseUrl,supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (url: string, eventType: string) => {
  console.log(`Tracking ${eventType} for: ${url}`);

  try {
    const { data, error } = await supabase
      .from("page_views")
      .insert([{ url, event_type: eventType }]);

    if (error) {
      console.error("Error inserting page view:", error.message);
    } else {
      console.log("Page view saved:", data);
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
};
