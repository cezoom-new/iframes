import Link from "next/link";
import React from "react";
import Anchor from "./anchor/anchor";

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
