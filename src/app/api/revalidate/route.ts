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
    if (res._type == "viewport" && res.dimensionValue) {
      await revalidatePath(`/${res.dimensionValue.current}/[customer]`, "page");
    }

    if (res.type == "campaign" && res._id) {
      await revalidateTag(res._id);
    }

    if (res.type == "banner" && res._id) {
      await revalidateTag(res._id);
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
