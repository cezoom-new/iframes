import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const locationIp = req.headers.get("x-forwarded-for");
    console.log(locationIp, "locationIp");
    const cookieStore = await cookies();
    const location = cookieStore.get("_loc")?.value;
    if (location) {
      return new Response(JSON.stringify(location), {
        status: 200,
      });
    } else {
      const locationData = req.headers.get("x-location-data");
      const locationIp = req.headers.get("x-forwarded-for");
      console.log(locationIp, "locationIp");
      return new Response(JSON.stringify({ locationData, locationIp }), {
        status: 200,
      });
    }
  }
}
