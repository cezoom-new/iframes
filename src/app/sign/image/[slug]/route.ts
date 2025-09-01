import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
  const supabaseKey = process.env.SUPABASE_ANON_PUBLIC || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const metadata = Object.fromEntries(req.headers.entries());
  const url: any = req.nextUrl.searchParams;
  const email = url.get("email");

  // Horizontal gray line GIF (100x5px, gray-300 color, 1px line with 2px padding)
  const pixelGif = "iVBORw0KGgoAAAANSUhEUgAAAaQAAAAQCAYAAABZYAviAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7cCBAAAwDAOwnun+EiUawUaQJAAAAAAAAAAAAAAAAAC31/YHAAAAAAAAAAAAAAAAYDdd3AKrrSahxgAAAABJRU5ErkJggg==";
  const pixelResponse = new NextResponse(Buffer.from(pixelGif, "base64"), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  try {
    const campaignSlug = params.slug.split(".")[0];
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${campaignSlug}%22%5D%7B%0A%0A++%27image%27%3AemailSignatureCampaignList%5B0%5D-%3EsignatureImage.asset-%3Eurl%2C%0A++++%27campagin%27%3AemailSignatureCampaignList%5B0%5D-%3Eslug.current%2C%0A++++teamName%2C%0A+++%27url%27%3AemailSignatureCampaignList%5B0%5D-%3Eurl%0A++%7D%5B0%5D%0A++%0A%0A`,
      { next: { tags: campaignSlug } }
    );

    const response = await res.json();

    //If no result OR no image → return pixel gif
    if (!response?.result || !response?.result?.image) {
      return pixelResponse;
    }

    // fetch actual image
    const data1 = await fetch(response.result.image);
    const response2 = await data1;

    // log to supabase
    await supabase.from("email_signature_logs").insert([
      {
        event_type: "email-opened",
        sender_email: unescape(email),
        campaign: response.result.campagin,
        meta: metadata,
        team: response.result.teamName,
        redirect_url: response.result.url,
      },
    ]);

    return new NextResponse(response2.body, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    // fallback pixel
    return pixelResponse;
  }
}
