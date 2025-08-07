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
  type?: "webinarLayout";
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
  className,
  type,
}: CtaBtnProps) {
  const ArrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M6.54537 11.3011L5.52264 10.2898L9.07378 6.73863H0.15332V5.26135H9.07378L5.52264 1.7159L6.54537 0.698853L11.8465 5.99999L6.54537 11.3011Z"
          fill="white"
        />
      </svg>
    );
  };

  const onClickHandler = (e: any) => {
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
          {type == "webinarLayout" ? (
            <span className="flex items-center gap-3">
             {ctaText}   <ArrowIcon />
            </span>
          ) : (
            <span>{ctaText}</span>
          )}
        </Anchor>
      </Link>
    </div>
  );
}
