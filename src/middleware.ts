import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import next from "next";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { searchParams, pathname } = request.nextUrl;

console.log({pathname});

  if(pathname.startsWith("/m/image")){
    const response = await fetch(`${process.env.PROJECT_URL}/sign/image/product-management.gif`, { cache: 'force-cache' });
    const headers = new Headers();
    headers.set("Content-Type", "image/gif"); 

    return new NextResponse(response.body, {
      status: 200,
      statusText: "OK",
      headers,
    });
  
  }
  if (pathname.startsWith("/api")) {
    if (["/api/session", "/api/track", "/api/location"].includes(pathname)) {

      return NextResponse.next();
    }
  }
  if (
    pathname.startsWith("/api") &&
    !["/api/session", "/api/track", "/api/location"].includes(pathname)
  ) {
    const authToken = request.headers.get("authorization");

    if (!authToken) {
      return NextResponse.json(
        { error: true, message: "Auth Token Missing", status: 401 },
        { status: 401 }
      );
    }

    const tokenParts = authToken.split(" ");
    const isBearer = tokenParts[0] === "Bearer";
    const authKey = tokenParts[1] === process.env.REVALIDATE_SECRET;

    if (!isBearer || !authKey) {
      return NextResponse.json(
        { error: true, message: "Invalid Token", status: 401 },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  try {
    const { searchParams, pathname } = request.nextUrl;
    const splitPath = pathname.trim().split("/");
    const country = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];
    const customer = searchParams.get("domain") ?? "unknown";
    if (product && country && customer) {
      url.pathname = `${product}-${country}/${customer}`;
    }
    const response = NextResponse.rewrite(url);
    console.log("Middleware executed successfully");
    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher:
    "/((?!studio|_next/static|_next/image|sign|m|sign-preview|favicon.ico|robots.txt|sitemap.xml|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg).*)",
};
