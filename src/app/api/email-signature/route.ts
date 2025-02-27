import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch("https://picsum.photos/200/300");
  
  const blob = await res.blob();
  const headers = new Headers();
  headers.set('Content-Type', 'image/png');
  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
