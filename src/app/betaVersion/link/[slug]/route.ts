import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const url: any = req.nextUrl.searchParams;
  const email = url.get("email");
  const team = await params.slug;

  const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
  const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const metadata = Object.fromEntries(req.headers.entries());
  try {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${team}%22%5D%7B%0A%0A++%22url%22%3AemailSignatureCampaignList%5B0%5D-%3Eurl%2C%0A++%22campaign%22%3AemailSignatureCampaignList%5B0%5D-%3Eslug.current+%0A++%0A++%0A+++%0A++%0A%7D%5B0%5D%0A++%0A%0A`
    );
    const response = await res.json();
    const { data, error } = await supabase.from("email_signature_logs").insert([
      {
        event_type: "Email Link Clicked",
        sender_email: email,
        campaign: response.result.campaign,
        meta: metadata,
        team: team,
        redirect_url: response.result.url,
      },
    ]);
    /*   ### stale-while-revalidate = receive the old cached response while the new one is being fetched for 30 mins
           ### stale-while-revalidate=1800:allows a cached response to be served stale for up to 1800 seconds (30 minutes) 
           ###  
      */

    return NextResponse.redirect(new URL(response.result.url), {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Cache-Control":
      //     "public, max-age=3600, s-maxage=3600, stale-while-revalidate",
      // },
    });
  } catch (error) {
    return new NextResponse("", {
      status: 401,
      statusText: "Error",
    });
  }
}

export const revalidate = 200;