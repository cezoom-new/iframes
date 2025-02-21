import { NextRequest } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import { getViewPortByProductRegion, getViewPorts } from "../../../sanity/lib/queries";

export async function GET(request: NextRequest) {
  // const token = request.headers.get("Authorization");
  // if (token != process.env.REVALIDATE_SECRET) {
  //   return Response.json({
  //     error: true,
  //     status: 401,
  //     message: "UnAuthorized Token",
  //   });
  // }
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get("slug")

  if (!slug) {
    const viewports = await runQuery(getViewPorts());
    return Response.json({ error: false, message: "Successfully fetch all viewports", data: viewports });
  }

  const viewportData = await runQuery(getViewPortByProductRegion(), {
    productRegion: slug,
  },
  [slug]
  // request.next.tags
);

  return Response.json({ error: false, message: `Successfully fetch data of ${slug} viewport`, data: viewportData });

}
