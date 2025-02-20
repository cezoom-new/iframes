import { geolocation } from "@vercel/edge";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const geoData = geolocation(req);
  const ipAddress = req.headers.get("x-forwarded-for");
  const data: any = geoData;
  data.ipAddress = ipAddress;

  return new Response(JSON.stringify(geoData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
