import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { ipAddress } from "@vercel/edge";
import { geolocation } from "@vercel/functions";
import countries from "@/components/countries.json";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  try {
    const { nextUrl: url, geo }: any = request;
    const ipa = request.headers.get("x-forwarded-for");
    console.log(geolocation(request),'geolocation12')
    const geoLocation = geolocation(request);

    const country = geo.country || "US";
    const city = geo.city || "San Francisco";
    const region = geo.region || "CA";
    const ip = ipAddress(request) || "unknown";

    const countryInfo: any = countries.find((x) => x.cca2 === country);
    const currencyCode = Object.keys(countryInfo.currencies)[0];
    const currency = countryInfo.currencies[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");
    return new Response(
      JSON.stringify({
        geoLocation,
      })
    );
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
