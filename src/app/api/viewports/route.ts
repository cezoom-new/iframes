import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import { getViewPortByProductRegion, getViewPorts } from "../../../sanity/lib/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get("slug")

  if (!slug) {
    const viewports = await runQuery(getViewPorts());
    return Response.json({ error: false, message: "Successfully fetch all viewports", data: viewports });
  }

  const viewportData = await runQuery(getViewPortByProductRegion(), {
    productRegion: slug,
  });

  return Response.json({ error: false, message: `Successfully fetch data of ${slug} viewport`, data: viewportData });

}
