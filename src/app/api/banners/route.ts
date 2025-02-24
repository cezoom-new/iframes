import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import {
  getBannerByID
} from "../../../sanity/lib/queries";
import { error } from "console";

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization");
  if (token != process.env.REVALIDATE_SECRET) {
    return Response.json({
      error: true,
      status: 401,
      message: "UnAuthorized Token",
    });
  }
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
