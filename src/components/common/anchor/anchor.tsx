import { useState, useEffect, ReactNode, CSSProperties } from "react";
import { GetUserDevice } from "../BrowseData/browseData";
import { debounce } from "@/components/common/Common";

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

  const getUserDetails = new GetUserDevice().getTrackData();
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/");
        const locationData = response.headers.get("x-location-data");
        const locationIp = response.headers.get("x-your-ip-address");
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

  async function trackUserInteraction(){
    try {
      const response = await fetch(`/api/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to track page view");
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }

  const handleButtonClick = async () => {
    await trackUserInteraction();
    if (typeof button?.onHandleClick === "function") {
      button.onHandleClick();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <button
      id={buttonId}
      className={button?.className}
      style={button?.style}
      onClick={debounce(handleButtonClick,300)}
    >
      {button?.children}
    </button>
  );
}
