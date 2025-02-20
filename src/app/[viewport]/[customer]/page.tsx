import { getCampaigns } from "@/utils/getCampaigns";
import Campaign from "../../campaigns/Campaign";
import customerDB from "../../../../database.json";
import { runQuery } from "@/sanity/lib/client";
import { getViewPortByProductRegion } from "@/sanity/lib/queries";
import NotFound from "@/app/not-found";

export const dynamicParams = true;
const sanityUrl: string | undefined = process.env.PROJECT_URL;

const fetchAllViewports = async () => {
  try {
    const res = await fetch(`${sanityUrl}/api/viewports`, {
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

const fetchViewportByDimensionValue = async (
  viewport: string,
  customer: string
) => {
  const url = new URL(`${sanityUrl}/api/viewports`);
  url.searchParams.append("slug", viewport);

  try {
    const res = await fetch(url, {
      next: { tags: [viewport, customer] },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
    });
    if (res.ok) {
      return (await res.json())?.data;
    } else {
      console.error("Something went wrong");
    }
  } catch (error) {
    throw new Error("Unexpected Error");
  }
};

const fetchCampaignByIDs = async (
  campaignIDs: string[],
  viewport: string,
  customer: string
) => {
  const url = new URL(`${sanityUrl}/api/campaigns`);
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
        tags: [viewport, customer, ...campaignIDs],
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
    const url = new URL(`${sanityUrl}/api/banners`);
    url.searchParams.append("banner-id", bannerID);
    const res = await fetch(url, {
      next: { tags: [viewport, customer, bannerID] },
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
  debugger
  const url = new URL(`${sanityUrl}/api/cookie-settings`);
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

export async function generateStaticParams() {
  const viewports = await fetchAllViewports();
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

  const requiredCampaigns = await getCampaigns(
    viewport,
    customer,
    viewportData
  );
  const campaignIDs =
    requiredCampaigns && requiredCampaigns.length !== 0
      ? await Promise.all(
          requiredCampaigns
            .filter((campaign: any) => !!campaign)
            .map(async (campaign: any) => campaign._id)
        )
      : [];

  const campaigns = await fetchCampaignByIDs(campaignIDs, viewport, customer);

  const bannerID = viewportData.showBanner
    ? viewportData.selectedBanner?.[0]?._ref
    : null;
  const banner = bannerID
    ? await fetchBannerByID(bannerID, viewport, customer)
    : null;

    const cookies = viewportData.isCookieShow ? await fetchCookieSettings(viewport, customer) : null;

  return <Campaign campaigns={campaigns} banner={banner} cookies={cookies} />;
}
