import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: any) {

    const {slug } = params
    const data = await fetch(`${process.env.PROJECT_URL}/sign/image/${slug}.gif`, {
        next: { tags: ["product-management"] },
      });
      
    const response = await data;
    const headers = new Headers();
      return new NextResponse(response.body, {
        status: 200,
        statusText: "OK",
        headers,
    });
    
}