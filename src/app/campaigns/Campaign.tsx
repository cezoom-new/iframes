"use client";

import CenterText from "./Layouts/CenterText";
import RightImageLeftText from "./Layouts/RightImageLeftText";
import LeftImageRightText from "./Layouts/LeftImageRightText";
import { useEffect, useState } from "react";
import { GetUserDevice } from "@/components/common/BrowseData/browseData";
import { checkCookiePermission, createSession, getLocationDetails } from "@/utils/helper";

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

  const [locations, setLocation] = useState<Location | null>(null);
  const [locationIpAddress, setLocationIpAddress] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [metaData, setMetaData] = useState<Object | null>(null);

  const getUserDetails = new GetUserDevice().getTrackData();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await getLocationDetails();
        const locationData = response.location;
        const locationIp = response.ipAddress;
        console.log(response)
        setLocationIpAddress(locationIp);
        console.log(locationData, "---", locationIp, "---", getUserDetails);
        if (locationData) {
          setLocation(JSON.parse(locationData));
          const metaData = {
            path: window.location.href,
            location: {
              data: locations,
              name: `${locationData}`,
            },
            getUserDetails,
          };
          setMetaData(metaData);
          console.log("lo", metaData);
        } else {
          console.log("Location data not found");
        }
      } catch (err) {
        console.log("Failed to fetch location");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    let isUserIdExist = getCookie("_UID");
    if (checkCookiePermission() && !isUserIdExist) {
      const createUser = async () => {
        try {
          const res = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meta: metaData,
              loc: window.location,
              locations,
              locationIpAddress,
              browserData: getUserDetails,
            }),
          });

          if (res.ok) {
            await createSession(getCookie("_UID"));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      createUser();
    }
  }, [locationIpAddress, locations, metaData]);

  if (!(campaignIdx || campaignIdx == 0)) return <></>;

  if (campaigns[campaignIdx]?.selectedLayout == "rilt") {
    return (
      <>
        <RightImageLeftText
          campaign={campaigns[campaignIdx]}
          banner={banner}
          cookies={cookies}
          colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
        />
      </>
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "lirt") {
    return (
      <LeftImageRightText
        campaign={campaigns[campaignIdx]}
        banner={banner}
        cookies={cookies}
        colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
      />
    );
  }

  return (
    <CenterText
      campaign={campaigns[campaignIdx]}
      banner={banner}
      cookies={cookies}
      colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? "defaultColor"}
    />
  );
}

export default Campaign;
