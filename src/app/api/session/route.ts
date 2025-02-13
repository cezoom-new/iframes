import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (req.method == "POST") {
    const request: any = await req.json();
    const { userId }: any = request;
    try {
      const { data, error } = await supabase
        .from("iframe_sessions")
        .insert([
          {
            user_id: userId,
            start_time: new Date(),
            end_time: new Date(),
          },
        ])
        .select()
        .single();
      if (data && Object.keys(data)?.length) {
        cookieStore.set("_SID", data?.id, {
          sameSite: "none",
          secure: true,
          maxAge: 60 * 60 * 24 * 30 * 12,
        });
      }
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
