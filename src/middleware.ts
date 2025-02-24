import { geolocation, ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { searchParams, pathname } = request.nextUrl;
  if (pathname.includes("/api")) {
    const authToken: any = request.headers.get("authorization");
    if (!authToken) {
      return Response.json({
        error: true,
        message: "Invalid Token",
        status: 401,
      });
    }else{
      if (!authToken) {
        return Response.json({
          error: true,
          message: "Success",
          status: 200,
        });
      }
    }
    const authKey = authToken.split(" ").at(1) == process.env.REVALIDATE_SECRET;
    if (!authToken.split(" ").at(0).includes("Bearer") && authKey) {
      return Response.json({
        error: true,
        message: "Invalid Token",
        status: 401,
      });
    } else if (authKey) {
      return Response.json({
        error: false,
        message: "Success",
        status: 200,
      });
    }
  }

  try {
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
    "/((?!studio|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg).*)",
};
