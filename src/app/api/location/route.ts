import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const locationData = req.headers.get("x-location-data");
    const locationIp = req.headers.get("x-your-ip-address");
    return new Response(JSON.stringify({ locationData, locationIp }), {
      status: 200,
    });
  }
}
