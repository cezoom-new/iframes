import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const cookieStore = await cookies();
    const location: any = cookieStore.get("_loc")?.value;
    const ipAddress: any = cookieStore.get("_IPA")?.value;
    /* check from cookie if location and ip exist*/
    if (location?.value) {
      console.log(location, ipAddress, "ipAddress11");
      return new Response(JSON.stringify({ location, ipAddress }), {
        status: 200,
      });
    } else {
      /* fetch from header */
      const locationData = req.headers.get("x-location-data");
      const locationIp = req.headers.get("x-your-ip-address");
      console.log(location, ipAddress, "ipAddress3333");
      return new Response(JSON.stringify({ locationData, locationIp }), {
        status: 200,
      });
    }
  }
}
