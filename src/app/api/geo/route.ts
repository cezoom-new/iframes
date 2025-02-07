import type { NextRequest } from 'next/server';
// import { geolocation, ipAddress } from "@vercel/edge";
import { geolocation } from '@vercel/functions';
import countries from "@/components/countries.json"

export const config = {
 runtime: 'edge',
};

export async function GET(
 request: NextRequest
) {
  try {
    const { nextUrl: url, geo }: any = request
    console.log(geo)
  if(!geo ){
  return new Response(JSON.stringify({request}))
  }
  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'
  const ip = geolocation(request) || "unknown";

  const countryInfo:any = countries.find((x) => x.cca2 === country)
  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')
  return new Response(JSON.stringify({
    country, city, region, currencyCode, currency, languages,ip
  }));
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
  
}