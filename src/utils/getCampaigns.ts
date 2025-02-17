import customerDB from "../../database.json";
import { runQuery } from "../sanity/lib/client";
import {
  getViewPortByRegion,
  getCampaignIdsByAdjacency,
  getCampaignLayoutByID,
  getViewPortByProductRegion,
} from "../sanity/lib/queries";

/*
  From customer metadata get eligible campaigns based on adjacencies the customer is subscribed to.
*/
async function getEligibleAdjacencyCampaignsIds(customer: any, campaigns: any) {
  const DB: any = customerDB;
  if (!customer || !DB[customer]) return [];
  const adjacencies = DB[customer].subscriptions;
  const customerType =
    DB[customer].locations >= 15 ? "largeScale" : "smallScale";

  if (!campaigns || campaigns.length == 0) return []; 
  const eligibleCampaigns = (
    await Promise.all(
      adjacencies.map(async (adjacency: any) => {
        const campaign = await runQuery(getCampaignIdsByAdjacency(), {
          adjacency: adjacency.adjacencyName,
          campaignIds: campaigns?.map((campaign: any) => campaign._ref),
          customerType,
        });

        // filter the campaigns which is show on the viewport
        const filteredCampaigns = campaign.filter(
          (campaign: any) =>
            ((adjacency.subscriptionStatus === false &&
              campaign.audience === "exclude") ||
              (adjacency.subscriptionStatus === true &&
                campaign.audience === "include")) &&
            campaign?.includeAudienceLists?.includes(customer) &&
            !campaign?.excludeAudienceLists?.includes(customer)
        );
        return filteredCampaigns;
      })
    )
  ).reduce((a, b) => a.concat(b));
  return eligibleCampaigns;
}

/* motive of below function is to generate a
 unique banner based of each refresh based on available campaign*/

// async function getNextCampaign(params: any[]) {
//   const cookieStore = await cookies();
//   const currentCampaignValue = Number(cookieStore.get("_CsL_kv")?.value);
//   if (isNaN(currentCampaignValue) || currentCampaignValue >= params.length) {
//     cookieStore.set("_CsL_kv", "0", {
//       sameSite: "none", // cookie is update for iframe,  we can use samesite
//       secure: true,
//     });
//     return 0;
//   }

//   const nextCampaignOrder = currentCampaignValue + 1;
//   if (nextCampaignOrder >= params.length) {
//     cookieStore.set("_CsL_kv", "0", {
//       sameSite: "none",
//       secure: true,
//     });
//     return 0;
//   }
//   cookieStore.set("_CsL_kv", nextCampaignOrder.toString(), {
//     sameSite: "none",
//     secure: true,
//   });
//   return nextCampaignOrder;
// }

// const getCampaignFromPool = async (
//   campaigns: any[],
//   selectMode: any = null
// ) => {
//   const campaignIndex = await getNextCampaign(campaigns);
//   console.log(
//     campaigns?.length + "is the available number of Campaigns and",
//     campaignIndex + "is the position of running campaign"
//   );
//   return selectMode === "random"
//     ? campaigns[Number(campaignIndex)]
//     : campaigns[0];
// };

const getTotalCampaignPool = (
  poolOne: any,
  poolTwo: any,
  combiningMode: any
) => {
  return combiningMode === "override" ? poolTwo : poolOne.concat(poolTwo);
};

export async function getCampaigns(customer: string, viewportData: any) {
  try {
    const adjacencyOrientedCampaigns: any =
      await getEligibleAdjacencyCampaignsIds(
        customer,
        viewportData.selectedAdjacencyCampaigns
      );
    console.log("adjacencyOrientedCampaigns", adjacencyOrientedCampaigns);
    const totalCampaignPool: any = getTotalCampaignPool(
      adjacencyOrientedCampaigns,
      viewportData.additionalCampaigns?.map((campaign: any) => {
        return { _id: campaign._ref };
      }),
      viewportData.combiningMode
    );
    console.log("totalCampaignPool", totalCampaignPool);
    return totalCampaignPool;
  } catch (error) {
    console.error("Error in getting current campaign:", error);
  }
}
