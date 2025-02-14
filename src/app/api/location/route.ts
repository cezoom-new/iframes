import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const location = cookieStore.get("_loc")?.value;
  const ipAddress = cookieStore.get("_IPA")?.value;

  /* Check if location and IP exist in cookies */
  if (location) {
    console.log("Using cookie data:", { location, ipAddress });
    return new Response(JSON.stringify({ location, ipAddress }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  /* Fetch from headers if not available in cookies */
  const locationData = req.headers.get("x-location-data");
  const locationIp = req.headers.get("x-your-ip-address");
  return new Response(JSON.stringify({ location: locationData, ipAddress: locationIp }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/* Handle other HTTP methods */
export async function GET() {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
