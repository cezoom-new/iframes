import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  
  const cookieStore = await cookies();
  const request: any = await req.json();
  const { meta, loc, locationData, browserData }: any = request;
  const ip = req.headers.get("x-forwarded-for");
  const customerValue = loc?.search?.replace("?domain=", "");

  try {
    const { data, error } = await supabase
      .from("iframe_users")
      .insert([
        {
          meta: meta,
          location: locationData,
          ip_address: ip,
          browser: browserData.systemConfig.browser,
          practice_name: customerValue,
        },
      ])
      .select()
      .single();

    /******
     * Setting cookie for userDetails
     * call  session Api
     *******/
    if (data && Object.keys(data)?.length) {
      cookieStore.set("_UID", data?.id, {
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 24 * 30 * 12,
      });
    }

    if (error) {
      console.error("Error inserting page view:", error.message);
      return new Response("", { status: 500 });
    } else {
      return new Response("success", { status: 200 });
    }
  } catch (err) {
    console.error("Error tracking page view:", err);
    return new Response("", { status: 500 });
  }
  // }
}
