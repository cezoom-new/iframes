import { runQuery } from "@/sanity/lib/client";
import {
  getBannerByID,
  getCampaignByID,
} from "@/sanity/lib/queries";
import { getCampaigns } from "@/utils/getCampaigns";
import Campaign from "../../campaigns/Campaign";
import customerDB from "../../../../database.json";
import NotFound from "@/app/not-found";
import { fetchAllViewport, fetchCookieSettings, fetchViewportByDimensionValue } from "@/utils/Api";

// export const revalidate: number = 86400  //  60 * 60 * 24 equals to one day


export async function generateStaticParams({
  params: { viewport, customer },
}: {
  params: { viewport: string, customer:string  }
}) {
  // const viewports = await runQuery(getViewPorts());
  // const viewports = await fetchAllViewport()
  console.log("vie",viewport)
  const res = await fetch(`${process.env.PROJECT_URL}/api/viewports`, {
    next: { tags: [`${viewport}-${customer}`] },
    method: "GET",
    headers: {
      Authorization: `${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json()
  const viewports = response.data;
  const allParams: any = [];

  for (const port of viewports) {
    const customers = Object.keys(customerDB);

    customers.forEach((customer) => {
      allParams.push({
        viewport: port.dimensionValue.current,
        customer,
      });
    });
  }

  return allParams;
}

export default async function ViewPort({ params }: { params: any }) {
  const { viewport, customer } = await params;
  const viewportData = await fetchViewportByDimensionValue(viewport, customer);
  if (!viewportData) {
    return <NotFound />;
  }

  const requiredCampaigns = await getCampaigns(viewport,customer, viewportData);
  const campaigns =
    requiredCampaigns && requiredCampaigns.length !== 0
      ? await Promise.all(
          requiredCampaigns
            .filter((campaign: any) => !!campaign)
            .map(
              async (campaign: any) =>
                await runQuery(
                  getCampaignByID(),
                  { campaignID: campaign._id },
                  [campaign._id]
                )
            )
        )
      : [];

  const bannerID = viewportData.showBanner
    ? viewportData.selectedBanner?.[0]?._ref
    : null;
  const banner = bannerID
    ? await runQuery(getBannerByID(), { bannerID }, [bannerID])
    : null;

  const cookies = await fetchCookieSettings(viewport,customer);

  // const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
  // const campaigns = campaigns.map((campaign: any) => campaign._id )
  return <Campaign campaigns={campaigns} banner={banner} cookies={cookies} />;
}
