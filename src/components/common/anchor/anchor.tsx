import { useState, useEffect, ReactNode, CSSProperties } from "react";
import { GetUserDevice } from "../BrowseData/browseData";

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

  const handleButtonClick = async () => {
    if (typeof button?.onHandleClick === "function") {
      button?.onHandleClick(); // Call the function if it exists
    }
    console.log(
      "b",
      JSON.stringify({
        loc: window.location,
        locations,
        locationIpAddress,
        browserData: getUserDetails,
        ctaBtnLink: button?.ctaBtnLink,
        campaignName: button?.campaignName,
        eventType: "click",
      })
    );

    try {
      const response = await fetch(`${process.env.PROJECT_URL}/api/supaBase`, {
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to track page view");
      }

      const data = await response.json();
      console.log("Page view saved:", data);
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <button
      id={buttonId}
      className={button?.className}
      style={button?.style}
      onClick={handleButtonClick}
    >
      {button?.children}
    </button>
  );
}
