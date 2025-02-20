import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import { getViewPortByProductRegion, getViewPorts } from "../../../sanity/lib/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get("slug")
  console.log({request})
  console.log('helo from viewports')

  if (!slug) {
    const viewports = await runQuery(getViewPorts());
    return Response.json({ error: false, message: "Successfully fetch all viewports", data: viewports });
  }

  const viewportData = await runQuery(getViewPortByProductRegion(), {
    productRegion: slug,
  },
  [slug]
  // request.next.tags
);

  return Response.json({ error: false, message: `Successfully fetch data of ${slug} viewport`, data: viewportData });

}
