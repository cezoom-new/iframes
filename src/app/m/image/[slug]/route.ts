import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
  const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const metadata = Object.fromEntries(req.headers.entries());
  const url: any = req.nextUrl.searchParams;
  const email = url.get("email");
  try {
    const campaignSlug = params.slug.split(".")[0];
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${campaignSlug}%22%5D%7B%0A%0A++%27image%27%3AemailSignatureCampaignList%5B0%5D-%3EsignatureImage.asset-%3Eurl%2C%0A++++%27campagin%27%3AemailSignatureCampaignList%5B0%5D-%3Eslug.current%2C%0A++++teamName%2C%0A+++%27url%27%3AemailSignatureCampaignList%5B0%5D-%3Eurl%0A++%7D%5B0%5D%0A++%0A%0A`,
      { next: { tags: campaignSlug } }
    );
    const response = await res.json();
    const data1 = await fetch(response.result.image, {});
    const response2 = await data1;
    await supabase.from("email_signature_logs").insert([
      {
        event_type: "Email Opened",
        sender_email: email,
        campaign: response.result.campagin,
        meta: metadata,
        team: response.result.teamName,
        redirect_url: response.result.url,
      },
    ]);

      /*
      - public: Allows both browser and CDN to cache the response.
      - max-age=3600: Browser caches the response for 1 hour.
      - s-maxage=3600: CDN caches the response for 1 hour (overrides max-age for CDNs).
      - stale-while-revalidate=3600: After 1 hour, serve stale content for up to another 1 hour while fetching a fresh version in the background.
      */

    return new NextResponse(response2.body, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control":
          "public, max-age=300, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    // Base64-encoded 1x1 pixel GIF (transparent)
    const pixelGif = "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    const headers = new Headers();
    headers.set("Content-Type", "image/gif");
    return new NextResponse(Buffer.from(pixelGif, "base64"), {
      status: 200,
      statusText: "OK",
      headers,
    });
  }
}
