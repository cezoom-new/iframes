import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();

  // if (res.secret !== process.env.REVALIDATE_SECRET) {
  //   return new Response(JSON.stringify({ message: "Invalid secret" }), {
  //     status: 401,
  //   });
  // }

  try {
    if (res._type == "custom" && res.path) {
      await revalidatePath(`${res.path}`, "page");
    }
    if (res._type == "viewport" && res.tag) {
      await revalidateTag(res.tag);
    }

    if (res.type == "campaign" && res.tag) {
      await revalidateTag(res.tag);
    }

    if (res.type == "banner" && res.tag) {
      await revalidateTag(res.tag);
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
