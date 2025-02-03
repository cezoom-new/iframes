import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  try {
    const { searchParams, pathname } = request.nextUrl;

    const splitPath = pathname.trim().split("/");

    const country = splitPath[splitPath.length - 1] ?? "us";
    const product = splitPath[splitPath.length - 2];

    const customer = searchParams.get("domain");

    if (product && country && customer)
      url.pathname = `${product}-${country}/${customer}`;

    return NextResponse.rewrite(url);
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher:
    "/((?!studio|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.css|.*\\.js|.*\\.png|.*\\.jpg).*)",
};
