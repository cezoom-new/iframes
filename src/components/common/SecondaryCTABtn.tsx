"use client";
import PlayButton from "@/app/components/PlayButton";
import VideoRender from "@/app/components/VideoModal";
import React, { useState } from "react";
import Link from "next/link";
import Anchor from "./anchor/anchor";

/** Secondary CTA color preset: transparent fill, 1px #4A3CE1 border, 8px radius, royal blue text. */
const SECONDARY_CTA_LEGEND_BLUE_OUTLINE = "legendblueOutline";

export interface VideoModal {
  videoId: string;
  videoPlatform: string;
  videoTitle: string;
  title: string;
}
export interface CtaBtnProps {
  ctaText?: string;
  themeMode?: string;
  isSecondaryBtn?: boolean;
  videoDetails?: VideoModal;
  ctaBtnTextColor?: string;
  ctaBtnColor?: string;
  campaignName?: string;
  ctaBtnLink?: string;
}

export default function SecondaryCTABtn({
  ctaText,
  themeMode,
  isSecondaryBtn = true,
  videoDetails,
  ctaBtnTextColor,
  ctaBtnColor,
  campaignName,
  ctaBtnLink,
}: CtaBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const isVideoMode = Boolean(videoDetails && isSecondaryBtn);
  /** Link wrapper only when URL exists and we are not using the button for the video modal. */
  const isLinkMode = Boolean(ctaBtnLink) && !isVideoMode;

  const isLegendBlueOutline = ctaBtnColor === SECONDARY_CTA_LEGEND_BLUE_OUTLINE;
  const legendBlue = "#4A3CE1";

  const anchorClassName = isLegendBlueOutline
    ? `font-semibold text-center inline-flex justify-center items-center py-3 min-h-[48px] rounded-[8px] border border-solid border-[#4A3CE1] bg-transparent text-[#4A3CE1] ${videoDetails ? "pl-3 pr-6" : "px-8"}`
    : `font-semibold text-center inline-flex justify-center border items-center py-3 min-h-[48px] rounded-lg ${
        themeMode !== "darkMode"
          ? "text-black border-black"
          : "text-white border-white"
      } ${videoDetails ? "pl-3 pr-6" : "px-8"}`;
  const anchorStyle = isLegendBlueOutline
    ? {
        backgroundColor: "transparent",
        color: legendBlue,
        borderColor: legendBlue,
        borderWidth: 1,
        borderStyle: "solid" as const,
        borderRadius: 8,
      }
    : {
        backgroundColor: ctaBtnColor ?? "",
        color: ctaBtnTextColor === "blackMode" ? "#000000" : "#fff",
        borderColor: ctaBtnColor ?? "",
      };
  const displayText = ctaText ?? "";

  const anchorContent = isVideoMode ? (
    <>
      <PlayButton
        className="mr-2"
        color={
          isLegendBlueOutline
            ? legendBlue
            : ctaBtnTextColor === "blackMode"
              ? "#000000"
              : "#fff"
        }
      />
      {displayText}
    </>
  ) : (
    displayText
  );

  const anchor = (
    <Anchor
      className={anchorClassName}
      style={anchorStyle}
      campaignName={campaignName}
      text={displayText}
      ctaBtnLink={ctaBtnLink}
      onHandleClick={isVideoMode ? () => setIsOpen(!isOpen) : undefined}
      as={isLinkMode ? "span" : "button"}
    >
      {anchorContent}
    </Anchor>
  );

  return (
    <div className="inline-flex shrink-0 items-center self-center">
      {isLinkMode ? (
        <Link
          href={ctaBtnLink!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center"
        >
          {anchor}
        </Link>
      ) : (
        anchor
      )}
      {isVideoMode && isOpen && (
        <VideoRender
          isPopup={true}
          videoDetails={videoDetails!}
          className="pt-9 flex items-start"
          onClose={() => setIsOpen(false)}
          openForm={() => setOpenForm(true)}
          hasDemoBanner={true}
          campaignName={campaignName}
        />
      )}
    </div>
  );
}
