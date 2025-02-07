import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { geolocation } from '@vercel/edge';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  try {
    const { city, country, region, latitude, longitude } = geolocation(request);
    
    const location = { city, country, region, latitude, longitude };
    console.log("res",location)
    const response = NextResponse.next();
    response.headers.set('x-location-data', JSON.stringify(location));
    console.log("res",response)
    const { searchParams, pathname } = request.nextUrl;

    const splitPath = pathname.trim().split("/");

    const countrys = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];

    const customer = searchParams.get("domain") ?? "unknown";

    if (product && countrys && customer)
      url.pathname = `${product}-${countrys}/${customer}`;

    return NextResponse.rewrite(url);
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher:
    "/((?!studio|_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg).*)",
};
