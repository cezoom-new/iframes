import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "../../../sanity/lib/client";
import {
  getCampaignByIDs,
  getCampaignIdsByAdjacency,
} from "../../../sanity/lib/queries";

export async function POST(request: NextRequest) {
  const { adjacency, campaignIDs, customerType } = await request.json();

  if (adjacency && campaignIDs && customerType) {
    const campaigns = await runQuery(getCampaignIdsByAdjacency(), {
      adjacency,
      campaignIds: campaignIDs,
      customerType,
    });

    return Response.json({
      error: false,
      message: `Successfully fetch campaigns with filter ${JSON.stringify({ adjacency, campaignIDs, customerType })}`,
      data: campaigns,
    });
  }

  if (campaignIDs) {
    const campaigns = await runQuery(getCampaignByIDs(), { campaignIDs }, [
      campaignIDs,
    ]);
    return Response.json({
      error: false,
      message: `Successfully fetch campaigns with filter ${JSON.stringify({ adjacency, campaignIDs, customerType })}`,
      data: campaigns,
    });
  }

  return Response.json({
    error: false,
    message: `Successfully fetch campaigns with filter ${JSON.stringify({ adjacency, campaignIDs, customerType })}`,
    data: [],
  });
}
