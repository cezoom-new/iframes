/* eslint-disable react-hooks/rules-of-hooks */
// packages/tracking/src/tracking.ts
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Initialize Supabase client
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const trackPageView = async (loc: any, eventType: string) => {
  const url = loc.href;
  const customerValue = loc.search.replace("?domain=", "")
  // console.log(`Tracking ${eventType} for: ${url} ${customerValue}`);
 const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/');
        const locationData = response.headers.get('x-location-data');
        if (locationData) {
          setLocation(JSON.parse(locationData));
        } else {
          setError("Location data not found");
        }
      } catch (err) {
        setError('Failed to fetch location');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  try {
    console.log("location",location)

    const { data, error } = await supabase
      .from('page_views')
      .insert([{ url, event_type: eventType, customer: customerValue}]);

    if (error) {
      console.error("Error inserting page view:", error.message);
    } else {
      console.log("Page view saved:", data);
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
};
