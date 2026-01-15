"use client";

import CenterText from "./Layouts/CenterText";
import RightImageLeftText from "./Layouts/RightImageLeftText";
import LeftImageRightText from "./Layouts/LeftImageRightText";
import { useEffect, useState } from "react";
import { GetUserDevice } from "@/components/common/BrowseData/browseData";
import {
  checkCookiePermission,
  createSession,
  getLocationDetails,
} from "@/utils/helper";
import { ipAddress } from "@vercel/edge";
import RightVideoLeftText from "./Layouts/RightVideoLeftText";
import OSDentalLayout from "./Layouts/OsdentalLayout";
import LearnBannerLayout from "./Layouts/LearnBannerLayout";
import RighImageWithPopup from "./Layouts/RightImageWithPopup";
import CustomLayout from "./Layouts/CustomLayout";
import WebinarLayout from "./Layouts/WebinarLayout";
import VoicestackLayout from "./Layouts/VoicestackLayout";
import RightImageLeftCenterText from "./Layouts/RightImageLeftCenterText ";

const setCookie = (name: string, value: number) => {
  document.cookie = `${name}=${value}; path=/; SameSite=None; Secure`;
};

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

function Campaign({
  campaigns,
  cookies,
  banner,
}: {
  campaigns: any;
  cookies: any;
  banner: any;
}) {
  const [campaignIdx, selectedCampaignIdx] = useState<any>(null);
  useEffect(() => {
    if (parseInt(getCookie("_csi_idx") ?? "0") >= campaigns.length - 1) {
      setCookie("_csi_idx", 0);
    } else {
      setCookie("_csi_idx", parseInt(getCookie("_csi_idx") ?? "0") + 1);
    }
    selectedCampaignIdx(parseInt(getCookie("_csi_idx") ?? "0"));
  }, []);

  const [location, setLocation] = useState<any>(null);
  const [locationIpAddress, setLocationIpAddress] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [metaData, setMetaData] = useState<Object | null>(null);

  const getUserDetails = new GetUserDevice().getTrackData();
  const fetchLocation = async () => {
    const response = await getLocationDetails();
    const locationData = response;
    const locationIp = response.ipAddress;
    return { locationData, locationIp };
  };

  useEffect(() => {
    let isUserIdExist: any = getCookie("_csi_uid");
    const initialize = async () => {
      try {
        const data = await fetchLocation();
        const locationData = data?.locationData;
        const ipAddressData = data?.locationIp;
        if (checkCookiePermission() && !isUserIdExist) {
          try {
            const res = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
              },
              body: JSON.stringify({
                meta: metaData,
                loc: window.location,
                locationData,
                ipAddressData,
                browserData: getUserDetails,
              }),
            });
            const response = await res.json();
            if (res.ok && response.id) {
              isUserIdExist = true;
              await createSession(response.id, locationData);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else if (checkCookiePermission() && isUserIdExist) {
          if (getCookie("_csi_sid") == null || !getCookie("_csi_sid")) {
            await createSession(getCookie("_csi_uid"), locationData);
          }
        }
      } catch (error) {
        console.error("Error in Initializing");
      }
    };

    initialize();
  }, [location, locationIpAddress]);

  if (!(campaignIdx || campaignIdx == 0)) return <></>;

  if (campaigns[campaignIdx]?.selectedLayout == "rilt") {
    return (
      <>
        <RightImageLeftText
          campaign={campaigns[campaignIdx]}
          banner={banner && banner[0]}
          cookies={cookies && cookies[0]}
          colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
        />
      </>
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "lirt") {
    return (
      <LeftImageRightText
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "rvlt") {
    return (
      <RightVideoLeftText
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
   if (campaigns[campaignIdx]?.selectedLayout == "osdental") {
    console.log(campaigns[campaignIdx],'TprintTYPE')
    return (
      <OSDentalLayout
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
           colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }

     if (campaigns[campaignIdx]?.selectedLayout == "learnbanner") {
    console.log(campaigns[campaignIdx],'TprintTYPE')
    return (
      <LearnBannerLayout
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
           colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );

    }

  if (campaigns[campaignIdx]?.selectedLayout == "imageWithPopup") {
    
    return (
      <RighImageWithPopup
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
           colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }

  if (campaigns[campaignIdx]?.selectedLayout == "customLayout") {
    return (
      <CustomLayout
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
    if (campaigns[campaignIdx]?.selectedLayout == "webinarLayout") {
    return (
      <WebinarLayout
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "voicestackLayout") {
    return (
      <VoicestackLayout
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "riltc") {
    return (
      <RightImageLeftCenterText
        campaign={campaigns[campaignIdx]}
        banner={banner && banner[0]}
        cookies={cookies && cookies[0]}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }
  return (
    <CenterText
      campaign={campaigns[campaignIdx]}
      banner={banner && banner[0]}
      cookies={cookies && cookies[0]}
      colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
    />
  );
}

export default Campaign;
