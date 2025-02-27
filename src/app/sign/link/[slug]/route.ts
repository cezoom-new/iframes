import { runQuery } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const url = req.nextUrl;
  const campaignSlug = params.slug;
  try {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${campaignSlug}%22%5D%7B%0A++%22url%22%3AemailSignatureCampaignList%5B0%5D-%3E%0A+++url%0A++%0A%7D%5B0%5D%0A++%0A%0A`
    );
    const response = await res.json();
    return NextResponse.redirect(new URL(response.result.url));
  } catch (error) {
    return new NextResponse("", {
      status: 401,
      statusText: "Error",
    });
  }
}
