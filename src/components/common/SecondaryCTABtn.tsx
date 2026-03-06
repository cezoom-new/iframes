"use client";
import PlayButton from "@/app/components/PlayButton";
import VideoRender from "@/app/components/VideoModal";
import React, { useState } from "react";
import Link from "next/link";
import Anchor from "./anchor/anchor";

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
  const isLinkMode = Boolean(ctaBtnLink);

  const anchorClassName = `font-semibold text-center flex justify-center border items-center py-3 rounded-lg ${
    themeMode !== "darkMode" ? "text-black border-black" : "text-white border-white"
  } ${videoDetails ? "pl-3 pr-6" : "px-8"}`;
  const anchorStyle = {
    backgroundColor: ctaBtnColor ?? "",
    color: ctaBtnTextColor === "blackMode" ? "#000000" : "#fff",
    borderColor: ctaBtnColor ?? "",
  };
  const displayText = ctaText ?? "";

  const anchorContent = isVideoMode ? (
    <>
      <PlayButton
        className="mr-2"
        color={ctaBtnTextColor === "blackMode" ? "#000000" : "#fff"}
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
    >
      {anchorContent}
    </Anchor>
  );

  return (
    <div>
      {isLinkMode ? (
        <Link href={ctaBtnLink!} target="_blank" rel="noopener noreferrer">
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
