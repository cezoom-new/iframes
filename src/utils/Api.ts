import { NextRequest } from 'next/server';
import 'server-only'

export const fetchAllViewport = async () => {
  try {
    const res = await fetch(`${process.env.PROJECT_URL}/api/viewports`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
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

export const fetchViewportByDimensionValue = async (
  viewport: string,
  customer: string
) => {
  const url = new URL(`${process.env.PROJECT_URL}/api/viewports`);
  url.searchParams.append("slug", viewport);

  try {
    const res = await fetch(url, {
      next: { tags: [viewport, customer] },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
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

export const fetchCampaignByIDs = async (
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
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
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

export const fetchBannerByID = async (
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
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
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

export const fetchCookieSettings = async (
  viewport: string,
  customer: string
) => {
  const url = new URL(`${process.env.PROJECT_URL}/api/cookie-settings`);
  try {
    const res = await fetch(url, {
      next: { tags: [viewport, customer] },

      method: "GET",
      headers: {
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
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


