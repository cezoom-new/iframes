import Link from "next/link";
import React, { use, useEffect } from "react";
import Anchor from "./anchor/anchor";

export interface CtaBtnProps {
  ctaText?: string;
  themeMode?: string;
  ctaBtnColor?: string;
  ctaBtnTextColor?: string;
  ctaBtnLink?: string;
  campaignName?: string;
  className?: string;
  ctaBtnPostMessageKey?: string;
  ctaBtnPostData?: any;
}

export default function CTAButton({
  ctaText,
  themeMode,
  ctaBtnColor,
  ctaBtnTextColor,
  ctaBtnLink,
  ctaBtnPostMessageKey,
  ctaBtnPostData,
  campaignName,
  className
}: CtaBtnProps) {


  const onClickHandler = (e: any) => {
    // e.preventDefault();

    // console.log("CTA Button Clicked", ctaBtnPostMessageKey, ctaBtnPostData);
    const dataPost: { [key: string]: any } = {};
    dataPost[`${ctaBtnPostMessageKey}`] = { detail: { videoId: ctaBtnPostData } };

    if (ctaBtnPostMessageKey && ctaBtnPostData) {
      window.postMessage({ ...dataPost }, "*");
    }
  }


  return (
    <div className={className} onClick={onClickHandler}>
      <Link href={ctaBtnLink ? ctaBtnLink : "#"} target={!ctaBtnLink ? "" :"_blank"} passHref>
        <Anchor
          className={`${className} font-semibold text-center py-3 px-8 rounded-lg whitespace-nowrap
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
