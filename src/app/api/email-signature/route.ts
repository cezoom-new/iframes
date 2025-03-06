import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const campaignSlug = req
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${campaignSlug}%22%5D%7B%0A++%22image%22%3AemailSignatureCampaignList%5B0%5D-%3E%0A+++signatureImage.asset-%3Eurl%0A++%0A%7D%5B0%5D%0A++%0A%0A`);
  
  const blob = await res.blob();
  const headers = new Headers();
  headers.set('Content-Type', 'image/png');
  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
