import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
import countries from "@/components/countries.json";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  try {
    // ✅ Explicitly type `request.geo`
    const geo = (request as any).geo || {}; // Type assertion to bypass TS error
    const ip =
      ipAddress(request) || request.headers.get("x-forwarded-for") || "unknown";

    const country = geo.country
    const city = geo.city 
    const region = geo.region 

    const countryInfo = countries.find((x) => x.cca2 === country);

    const languages = countryInfo
      ? Object.values(countryInfo.languages).join(", ")
      : "English";

    return NextResponse.json({
      ip,
      country,
      city,
      region,
      // currency,
      languages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
