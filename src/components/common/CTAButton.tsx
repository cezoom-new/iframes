import Link from "next/link";
import React, { useEffect, useState } from "react";
import Anchor from "./anchor/anchor";
import { getLocationDetails } from "@/utils/helper";

export interface CtaBtnProps {
  ctaText?: string;
  themeMode?: string;
  ctaBtnColor?: string;
  ctaBtnTextColor?: string;
  ctaBtnLink?: string;
  campaignName?: string;
}

export default function CTAButton({
  ctaText,
  themeMode,
  ctaBtnColor,
  ctaBtnTextColor,
  ctaBtnLink,
  campaignName,
}: CtaBtnProps) {
  const [locations, setLocation] = useState(null);
  const [locationIpAddress, setLocationIpAddress] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
      const fetchLocation = async () => {
        try {
          const response = await getLocationDetails();
          const locationData = response?.location
          const locationIp = response?.ipAddress
          setLocationIpAddress(locationIp)
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
  
  return (
    <div>
      <Link href={ctaBtnLink ? ctaBtnLink : ""} target="_blank" passHref>
        <Anchor
          className={`font-semibold text-center py-3 px-8 rounded-lg whitespace-nowrap
            ${themeMode === "darkMode" ? "text-black " : "text-white"}`}
          style={{
            background: ctaBtnColor
              ? ctaBtnColor
              : themeMode === "darkMode"
                ? "#ffffff"
                : "#000000",
            color:
              ctaBtnTextColor === "blackMode"
                ? "#000000"
                : ctaBtnTextColor === "whiteMode"
                  ? "#ffffff"
                  : "",
          }}
          ctaBtnLink={ctaBtnLink}
          campaignName={campaignName}
        >
          {ctaText}
        </Anchor>
      </Link>
    </div>
  );
}
