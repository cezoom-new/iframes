import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    const campaignSlug = params.slug.split(".")[0];
    const res = await fetch(

      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-11-25/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type+%3D%3D+%22emailSignature%22+%26%26+slug.current+%3D%3D%22${campaignSlug}%22%5D%7B%0A++%22image%22%3AemailSignatureCampaignList%5B0%5D-%3E%0A+++signatureImage.asset-%3Eurl%0A++%0A%7D%5B0%5D%0A++%0A%0A`,
      {
        next: { tags: ["product-management"] },
      }
    );
    const response = await res.json();

    const data = await fetch(response.result.image, {
      next: { tags: ["product-management"] },
    });
    const response2 = await data;

    const headers = new Headers();
    return new NextResponse(response2.body, {
      status: 200,
      statusText: "OK",
      headers,
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
