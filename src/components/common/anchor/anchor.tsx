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
  text?: string;
  /** Use inside `<Link>` so the control is not a nested `<button>` inside `<a>`. */
  as?: "button" | "span";
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
    if (window != undefined) { 
      const campaignName: string = button?.campaignName || "";
      const btnTextValue: any = typeof button?.children === 'object' && button?.children !== null 
      ? button?.text 
      : button?.children;
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
          // "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
        },
        body: JSON.stringify({
          loc: window.location,
          locations,
          locationIpAddress,
          browserData: getUserDetails,
          ctaBtnLink: button?.ctaBtnLink,
          campaignName: button?.campaignName,
          eventType: "click",
          sessionId: getCookie("_csi_sid") ?? null,
          userId: getCookie("_csi_uid") ?? null,
          element_id: buttonId,
          e_name: btnRef || button?.text,
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
  const onClick = () =>
    debounce(handleButtonClick(buttonRef?.current?.innerText), 100);
  if (button.as === "span") {
    return (
      <span
        ref={buttonRef}
        id={buttonId}
        role="presentation"
        className={`${button?.className ?? ""} inline-flex cursor-pointer`}
        style={button?.style}
        onClick={onClick}
      >
        {button?.children}
      </span>
    );
  }
  return (
    <button
      ref={buttonRef}
      id={buttonId}
      className={button?.className}
      style={button?.style}
      onClick={onClick}
    >
      {button?.children}
    </button>
  );
}
