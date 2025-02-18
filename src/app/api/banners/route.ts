import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import {
  getBannerByID
} from "../../../sanity/lib/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bannerID = searchParams.get("banner-id");
  if (bannerID) {
    const banner = await runQuery(getBannerByID(), { bannerID }, [bannerID]);
    return Response.json({
      error: false,
      message: `Successfully fetch banner with ID - ${bannerID} `,
      data: [banner],
    });
  }
  return Response.json({
    error: false,
    message: `Successfully fetch data`,
    data: [],
  }); 
}
