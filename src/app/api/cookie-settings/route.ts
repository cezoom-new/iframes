import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import { getCookiesData } from "../../../sanity/lib/queries";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization");
  if (token != process.env.TOKEN) {
    return Response.json({
      error: true,
      status: 401,
      message: "UnAuthorized Token",
    });
  }
  const cookieSettings = await runQuery(getCookiesData());
  return Response.json({
    error: false,
    message: `Successfully fetch data`,
    data: [cookieSettings],
  });
}
