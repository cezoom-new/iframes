// // app/api/location/route.js
// import { NextRequest } from 'next/server';
// // import fetch from 'node-fetch';

// export async function GET(request: NextRequest) {
//   const ip = request.headers.get('x-forwarded-for');
  
//   const response = await fetch(`https://ipinfo.io/${ip}/json?token=YOUR_API_KEY`);
//   const location = await response.json();

//   return new Response(JSON.stringify(location), {
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
