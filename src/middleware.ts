import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore:any = await cookies();
  const url = request.nextUrl.clone();

  try {
    const { searchParams, pathname } = request.nextUrl;
    const splitPath = pathname.trim().split("/");

    const country = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];
    const customer = searchParams.get("domain") ?? "unknown";

    if (product && country && customer) {
      url.pathname = `${product}-${country}/${customer}`;
    }

    let locationValue = cookieStore.get("_loc")?.value
      ? JSON.parse(cookieStore.get("_loc")?.value)
      : null;

    const response = NextResponse.rewrite(url);

    if (!locationValue) {
      const geoData = geolocation(request);
      if (!geoData) return NextResponse.next();

      const { city, country, region, latitude, longitude } = geoData;
      locationValue = { city, country, region, latitude, longitude };

      response.cookies.set("_loc", JSON.stringify(locationValue), {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/", // Ensure the cookie is available across the entire site
      });
    }

    response.headers.set("x-location-data", JSON.stringify(locationValue));

    let userIpAddress = cookieStore.get("_iPa")?.value
      ? JSON.parse(cookieStore.get("_iPa")?.value)
      : null;

    if (userIpAddress == null) {
      const ip = ipAddress(request);
      if (ip) {
        userIpAddress = ip;
        response.headers.set(
          "x-your-ip-address",
          JSON.stringify(userIpAddress)
        );
        response.cookies.set("_iPa", JSON.stringify(userIpAddress), {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30,
          path: "/", // Ensure the cookie is available across the entire site
        });
      }
    }

    response.headers.set("x-your-ip-address", JSON.stringify(userIpAddress));

    console.log("Middleware executed successfully");
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