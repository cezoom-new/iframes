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

export async function generateStaticParams() {

  const fetchAllViewport = async () => {
    try {
      const res = await fetch(`${process.env.PROJECT_URL}/api/viewports`, {
        method: "GET",
        headers: {
          Authorization: `${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res?.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      } else {
        const data = await res.json();
        return data?.data ?? null;
      }
    } catch (error: any) {
      console.error({ error });
      throw new Error(error);
    }
  };



  const fetchCampaignByIDs = async (
    campaignIDs: string[],
    viewport: string,
    customer: string
  ) => {
    const url = new URL(`${process.env.PROJECT_URL}/api/campaigns`);
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${process.env.TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({ campaignIDs }),
        next: {
          tags: [viewport, customer],
        },
      });
      if (!res?.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      } else {
        return (await res.json())?.data;
      }
    } catch (error: any) {
      throw new Error("ERROR", error);
    }
  };

  const fetchBannerByID = async (
    bannerID: string,
    viewport: string,
    customer: string
  ) => {
    try {
      const url = new URL(`${process.env.PROJECT_URL}/api/banners`);
      url.searchParams.append("banner-id", bannerID);
      const res = await fetch(url, {
        next: { tags: [viewport, customer] },
        headers: {
          Authorization: `${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      } else {
        return (await res.json())?.data;
      }
    } catch (error: any) {
      throw new Error("ERROR", error);
    }
  };

  const fetchCookieSettings = async (viewport: string, customer: string) => {
    const url = new URL(`${process.env.PROJECT_URL}/api/cookie-settings`);
    try {
      const res = await fetch(url, {
        next: { tags: [viewport, customer] },

        method: "GET",
        headers: {
          Authorization: `${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      } else {
        return (await res.json())?.data;
      }
    } catch (error: any) {
      throw new Error("ERROR", error);
    }
  };
  // const viewports = await runQuery(getViewPorts());
  const viewports = await fetchAllViewport();
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
  const fetchViewportByDimensionValue = async (
    viewport: string,
    customer: string
  ) => {
    const url = new URL(`${process.env.PROJECT_URL}/api/viewports`);
    url.searchParams.append("slug", viewport);

    try {
      const res: any = await fetch(url, {
        next: { tags: [viewport, customer] },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.TOKEN}`,
        },
      });
      if (res.ok) {
        const a = await res.json()
        console.log(a,'wwwwwwwwwwwwwee')
        return (a?.data);
      } else {
        console.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      // throw new Error("Unexpected Error");
    }
  };
  const { viewport, customer } = await params;
  const viewportData = await fetchViewportByDimensionValue(viewport, customer);

  if (!viewportData) {
    return <NotFound />;
  }

  const requiredCampaigns = await getCampaigns(
    viewport,
    customer,
    viewportData
  );
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

  const cookies = viewportData.isCookieShow
    ? await runQuery(getCookiesData())
    : null;

  // const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
  // const campaigns = campaigns.map((campaign: any) => campaign._id )
  return <Campaign campaigns={campaigns} banner={banner} cookies={cookies} />;
}
