import { useState, useEffect, ReactNode, CSSProperties, useRef } from "react";
import { GetUserDevice } from "../BrowseData/browseData";
import { debounce } from "@/components/common/Common";
import { getCookie, getLocationDetails } from "@/utils/helper";

interface Location {
  country?: string;
}

interface BrowserData {
  browser: string;
  os: string;
  platform: string;
}

type ButtonProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ctaBtnLink?: string;
  onHandleClick?: () => void;
  campaignName?: string;
};

export default function Anchor(button: ButtonProps) {
  const [locations, setLocation] = useState<Location | null>(null);
  const [locationIpAddress, setLocationIpAddress] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [buttonId, setButtonID] = useState<string>("");
  const buttonRef = useRef<any>()


  const getUserDetails = new GetUserDevice().getTrackData();
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await getLocationDetails();
        const locationData = response?.location;
        const locationIp = response?.ipAddress;
        setLocationIpAddress(locationIp);
        if (locationData) {
          setLocation(JSON.parse(locationData));
        } else {
          setError("Location data not found");
        }
      } catch (err) {
        setError("Failed to fetch location");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);
  useEffect(() => {
    if (window != undefined) {
      const campaignName: string = button?.campaignName || "";
      const btnTextValue: any = button?.children || "";
      const costumerName: string =
        window?.location?.search?.replace("?domain=", "") || "";
      const id = campaignName + " " + btnTextValue + " " + costumerName;
      setButtonID(id);
    }
  }, [button]);

  async function trackUserInteraction(btnRef:string) {
    try {
      const response = await fetch(`/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loc: window.location,
          locations,
          locationIpAddress,
          browserData: getUserDetails,
          ctaBtnLink: button?.ctaBtnLink,
          campaignName: button?.campaignName,
          eventType: "click",
          sessionId: getCookie("_SID") ?? null,
          userId: getCookie("_UID") ?? null,
          element_id: buttonId,
          e_name: btnRef,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to track page view");
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }

  const handleButtonClick = async (e: any) => {
    await trackUserInteraction(e);
    if (typeof button?.onHandleClick === "function") {
      button.onHandleClick();
    }
  };
  return (
    <button
      ref={buttonRef}
      id={buttonId}
      className={button?.className}
      style={button?.style}
      onClick={(e) => debounce(handleButtonClick(buttonRef?.current?.innerText), 300)}
    >
      {button?.children}
    </button>
  );
}
