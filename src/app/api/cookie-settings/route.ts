import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import {
  getCookiesData
} from "../../../sanity/lib/queries";

export async function GET() {
  const cookieSettings = await runQuery(getCookiesData());
  return Response.json({
    error: false,
    message: `Successfully fetch data`,
    data: [cookieSettings],
  }); 
}
