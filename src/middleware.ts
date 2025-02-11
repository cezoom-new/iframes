import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log("url", request)
  try {
    const { searchParams, pathname } = request.nextUrl;

    const splitPath = pathname.trim().split("/");

    const countrys = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];

    const customer = searchParams.get("domain") ?? "unknown";

    if (product && countrys && customer) {
      url.pathname = `${product}-${countrys}/${customer}`;
    }

    // Get geolocation data
    const { city, country, region, latitude, longitude } = geolocation(request);
    const ip = ipAddress(request)
    // Store the location data in a cookie or pass it to the response headers
    const location = { city, country, region, latitude, longitude };
  
    // Create a response with the new URL and include the location data in the headers
    const response = NextResponse.rewrite(url);
    response.headers.set('x-location-data', JSON.stringify(location));
    response.headers.set('x-your-ip-address', JSON.stringify(ip));
   
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
