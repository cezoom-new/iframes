import { trackPageView } from "@/app/api/supaBase/tracking";
import { useState, useEffect, ReactNode, CSSProperties } from "react";
import { GetUserDevice } from "../BrowseData/browseData";

type ButtonProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ctaBtnLink?: string;
  onHandleClick?: any;
};
export default function Anchor(button: ButtonProps) {
  const [locations, setLocation] = useState(null);
  const [locationIpAddress, setLocationIpAddress] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <button
      className={button?.className}
      style={button?.style}
      onClick={() => {
        if (typeof button?.onHandleClick === "function") {
          button?.onHandleClick(); // Call the function if it exists
        }
        trackPageView(
          window.location,
          locations,
          locationIpAddress,
          getUserDetails,
          button?.ctaBtnLink,
          "click"
        );
      }}
    >
      {button?.children}
    </button>
  );
}
