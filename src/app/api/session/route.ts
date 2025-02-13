import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const cookieStore: any = await cookies();
    console.log(cookieStore.get("_UID")?.value, "mycookie");
    const body = await req.json();
    try {
      const { data, error } = await supabase
        .from("iframe_sessions")
        .insert([
          {
            user_id: cookieStore.get("_UID")?.value,
            start_time: new Date(),
            end_time: new Date(),
          },
        ])
        .select()
        .single();

      console.log(data, "sessionData...");

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
  }
}
