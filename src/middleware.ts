import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore: any = await cookies();
  const url = request.nextUrl.clone();
  try {
    const { searchParams, pathname } = request.nextUrl;
    const splitPath = pathname.trim().split("/");

    const countrys = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];
    const customer = searchParams.get("domain") ?? "unknown";

    if (product && countrys && customer) {
      url.pathname = `${product}-${countrys}/${customer}`;
    }

    const ip = ipAddress(request);

    // Retrieve existing location data from cookies
    let locationValue = cookieStore.get("_loc")?.value
      ? JSON.parse(cookieStore.get("_loc")?.value)
      : null;

    // If location already exists, avoid fetching geolocation again
    if (locationValue && Object.keys(locationValue).length > 0) {
      return NextResponse.next();
    }

    // Fetch geolocation data from Vercel Edge
    const geoData = geolocation(request);
    if (!geoData) return NextResponse.next(); // Avoid breaking the request if geolocation fails

    const { city, country, region, latitude, longitude } = geoData;
    locationValue = { city, country, region, latitude, longitude };

    // Store location in cookies for 30 days
    cookieStore.set("_loc", JSON.stringify(locationValue), {
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Rewrite the response with location data
    const response = NextResponse.rewrite(url);
    response.headers.set("x-location-data", JSON.stringify(locationValue));
    response.headers.set("x-your-ip-address", JSON.stringify(ip));

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher:
    "/((?!studio|_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg).*)",
};
