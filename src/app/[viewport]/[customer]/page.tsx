import { runQuery } from "@/sanity/lib/client";
import {
  getBannerByID,
  getCampaignByID,
  getCookiesData,
} from "@/sanity/lib/queries";
import { getCampaigns } from "@/utils/getCampaigns";
import Campaign from "../../campaigns/Campaign";
import customerDB from "../../../../database.json";
import NotFound from "@/app/not-found";
import { fetchAllViewport, fetchViewportByDimensionValue } from "@/utils/Api";


export async function generateStaticParams() {
  // const viewports = await runQuery(getViewPorts());
  const viewports = await fetchAllViewport()
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

  const cookies = viewportData.isCookieShow ? await runQuery(getCookiesData()) : null;

  // const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
  // const campaigns = campaigns.map((campaign: any) => campaign._id )
  return <Campaign campaigns={campaigns} banner={banner} cookies={cookies} />;
}
