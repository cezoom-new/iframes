import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || ""; 
const supabase = createClient(supabaseUrl, supabaseKey);

  export async function POST(req:NextRequest) {
    const request:any = await req.json();

    const {
        meta,
        loc,
        locations,
        locationIpAddress,
        browserData
      }: any = request;
  
      const customerValue = loc?.search?.replace("?domain=", "");
      const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });
      const countryName = locations?.country
        ? regionNamesInEnglish.of(locations?.country)
        : "US";
  
      try {
        const { data, error } = await supabase.from("iframe_users").insert([
          {
            meta: meta,
            location: countryName,
            ip_address: locationIpAddress,
            browser: browserData.systemConfig.browser,
            practice_name: customerValue,
          },
        ]);
  
        if (error) {
            console.log(error,'thisError')
          console.error("Error inserting page view:", error.message);
          return new Response('', { status: 500 })
        //   return res.status(500).json({ error: error.message });
        } else {
          return new Response('', { status: 200 })
        //   return res.status(200).json({ data });
        }
      } catch (err) {
        console.error("Error tracking page view:", err);
        return new Response('', { status: 500 })

        // return res.status(500).json({ error: "Error tracking page view" });
      }

  }
  