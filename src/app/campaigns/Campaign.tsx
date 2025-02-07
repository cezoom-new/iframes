"use client";

import CenterText from "./Layouts/CenterText";
import RightImageLeftText from "./Layouts/RightImageLeftText";
import LeftImageRightText from "./Layouts/LeftImageRightText";
import { useEffect, useState } from "react";
import { trackPageView } from "../api/supaBase/tracking";

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

function Campaign({ campaigns, cookies, banner }: { campaigns: any; cookies: any; banner: any }) {
  const [campaignIdx, selectedCampaignIdx] = useState<any>(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/');
        const locationData = response.headers.get('x-location-data');
console.log("llllll",locationData)
        if (locationData) {
          setLocation(JSON.parse(locationData));
        } else {
          setError("Location data not found");
        }
      } catch (err) {
        setError('Failed to fetch location');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);



  useEffect(() => {
    if (parseInt(getCookie("_csi_idx") ?? "0") >= campaigns.length - 1) {
      setCookie("_csi_idx", 0);
    } else {
      setCookie("_csi_idx", parseInt(getCookie("_csi_idx") ?? "0") + 1);
    }
    selectedCampaignIdx(parseInt(getCookie("_csi_idx") ?? "0"));
  }, []);

    useEffect(() => {
      // console.log(window.location,'yyyyyy')
      trackPageView(window.location, 'page_load');
    }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  if (!(campaignIdx || campaignIdx == 0))
    return <></>;

  if (campaigns[campaignIdx]?.selectedLayout == "rilt") {
    return (
      <>
      <RightImageLeftText 
      campaign={campaigns[campaignIdx]}
       banner={banner} 
       cookies={cookies}
       colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? 'defaultColor'}
       />
       {location && (
        <div>
          {/* <p>Country: {location?.country}</p>
          <p>City: {location?.city}</p>
          <p>Region: {location.region}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p> */}
        </div>
      )}
      </>
    );
  }
  if (campaigns[campaignIdx]?.selectedLayout == "lirt") {
    return (
      <LeftImageRightText 
      campaign={campaigns[campaignIdx]} 
      banner={banner}
       cookies={cookies}
       colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? 'defaultColor'}/>
    );
  }

  return <CenterText 
  campaign={campaigns[campaignIdx]}
   banner={banner} 
   cookies={cookies}
   colors={campaigns[campaignIdx]?.colorTemplate1?.[0] ?? 'defaultColor'}/>;
}

export default Campaign;
