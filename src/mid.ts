// // middleware.js
// import { NextRequest, NextResponse } from 'next/server';
// import { geolocation } from '@vercel/edge';

// export const config = {
//   matcher: '/', // Apply middleware to the root path (or any other path you want)
// };

// export function middleware(request:NextRequest) {
//   // Extract geolocation data from the request
//   const { city, country, region, latitude, longitude } = geolocation(request);

//   // Store the location data in a cookie or pass it to the response
//   const location = { city, country, region, latitude, longitude };

//   // Add the location data to the request headers
//   const response = NextResponse.next();
//   response.headers.set('x-location-data', JSON.stringify(location));

//   return response;
// }