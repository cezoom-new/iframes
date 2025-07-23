import customerDB from "../../database.json";

/*
  From customer metadata get eligible campaigns based on adjacencies the customer is subscribed to.
*/
async function getEligibleAdjacencyCampaignsIds(
  viewport: string,
  customer: any,
  campaigns: any
) {
  const DB: any = customerDB;
  if (!customer || !DB[customer]) return [];
  const adjacencies = DB[customer].subscriptions;
  const customerType =
    DB[customer].locations >= 15 ? "largeScale" : "smallScale";

  if (!campaigns || campaigns.length == 0) return [];

  const eligibleCampaigns = (
    await Promise.all(
      adjacencies.map(async (adjacency: any) => {
        const campaign: any = await fetchCampaignByFilters(
          viewport,
          customer,
          adjacency.adjacencyName,
          campaigns?.map((campaign: any) => campaign._ref),
          customerType
        );
        
        
        // filter the campaigns which is show on the viewport
        return campaign.filter((campaign: any) => {
          
          
          if (campaign?.excludeAudienceLists?.includes(customer)) {
            return false;
          }

          if (campaign?.includeAudienceLists?.includes(customer)) {
            return true;
          }



          return (
            (adjacency.subscriptionStatus == false &&
              campaign.audience == "exclude") ||
            (adjacency.subscriptionStatus == true &&
              campaign.audience == "include") 
              &&
              (campaign.filterAudienceLists ? campaign?.filterAudienceLists?.includes(customer) : true)
          );
        });
      })
    )
  ).reduce((a, b) => a.concat(b));
  return eligibleCampaigns;
}
const fetchCampaignByFilters = async (
  viewport: string,
  customer: string,
  adjacency: string,
  campaignIDs: string[],
  customerType: string
) => {
  const url = new URL(`${process.env.PROJECT_URL}/api/campaigns`);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
    },
    method: "POST",
    body: JSON.stringify({ adjacency, campaignIDs, customerType }),
    next: {
      tags: [String(viewport), String(customer)]
    }
  });
  return (await res.json())?.data;
};

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

export async function getCampaigns(
  viewport: string,
  customer: string,
  viewportData: any
) {
  try {
    const adjacencyOrientedCampaigns: any =
      await getEligibleAdjacencyCampaignsIds(
        viewport,
        customer,
        viewportData.selectedAdjacencyCampaigns
      );

    const totalCampaignPool: any = getTotalCampaignPool(
      adjacencyOrientedCampaigns,
      viewportData.additionalCampaigns?.map((campaign: any) => {
        return { _id: campaign._ref };
      }),
      viewportData.combiningMode
    );
    return totalCampaignPool;
  } catch (error) {
    console.error("Error in getting current campaign:", error);
  }
}

