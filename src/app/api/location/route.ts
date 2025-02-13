import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const cookieStore = await cookies();
    const location = cookieStore.get("_loc")?.value;
    console.log(location, "mylocation");
    if (location) {
      return new Response(JSON.stringify(location), {
        status: 200,
      });
    } else {
      const locationData = req.headers.get("x-location-data");
      const locationIp = req.headers.get("x-your-ip-address");
      return new Response(JSON.stringify({ locationData, locationIp }), {
        status: 200,
      });
    }
  }
}
