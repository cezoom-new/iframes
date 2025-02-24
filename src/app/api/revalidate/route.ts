import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();

  // if (res.secret !== process.env.TOKEN) {
  //   return new Response(JSON.stringify({ message: "Invalid secret" }), {
  //     status: 401,
  //   });
  // }
  const token = req.headers.get("Authorization");
  if (token != process.env.TOKEN) {
    return Response.json({
      error: true,
      status: 401,
      message: "UnAuthorized Token",
    });
  }
  const token = req.headers.get("authorization");
  if (token != process.env.REVALIDATE_SECRET) {
    return Response.json({
      error: true,
      status: 401,
      message: "UnAuthorized Token",
    });
  }

  try {
    
    if (res.tag) {
     revalidateTag(res.tag);
    }

    return new Response(JSON.stringify({ message: res }), { status: 200 });
  } catch (error) {
    console.error("Error revalidating path:", error);
    return new Response(
      JSON.stringify({ message: "Error revalidating path" }),
      { status: 500 }
    );
  }
}
