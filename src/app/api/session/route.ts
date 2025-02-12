import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {

  try {
    const id = crypto.randomUUID();
    const startTime = new Date();
    try {
      const { data, error } = await supabase.from("iframe_sessions").insert([
        {
          
          start_time: startTime,
          end_time: new Date(),
        },
      ]);
      if (error) {
        console.error("Error inserting page view:", error.message);
        return new Response("", { status: 500 });
      } else {
        return new Response("status 200 ok", { status: 200 });
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
      return new Response("", { status: 500 });
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
    return new Response("", { status: 500 });
  }
}
