import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const request: any = await req.json();

  const {
    event_type,
    sender_email,
    campaign,
    meta,
    team
  }: any = request;


  try {
    const { data, error } = await supabase.from("email_signature_logs").insert([
      {
        event_type: event_type,
        // sender_email: eventType,
        // campaign: campaignName,
        // meta: loc.origin,
        // team: browserData.systemConfig.browser
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
  }
}

