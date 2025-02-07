import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
import countries from "@/components/countries.json";

export const config = {
  runtime: "edge", // Ensure it's running on Edge
};

export async function GET(request: NextRequest) {
  try {
    // ✅ Explicitly type `request.geo`
    const geo = (request as any).geo || {}; // Type assertion to bypass TS error
    const ip =
      ipAddress(request) || request.headers.get("x-forwarded-for") || "unknown";

    const country = geo.country || "US";
    const city = geo.city || "San Francisco";
    const region = geo.region || "CA";

    const countryInfo = countries.find((x) => x.cca2 === country);
    const currencyCode = countryInfo
      ? Object.keys(countryInfo.currencies)[0]
      : "USD";
    // const currency = countryInfo ? countryInfo.currencies[currencyCode] : "Dollar";
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
