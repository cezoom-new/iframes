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
console.log(ctaBtnLink, "ctaBtnLink");
  return (
    <div>

      {(videoDetails && isSecondaryBtn) ? (
        <>
          <Anchor
            className={`font-semibold text-center flex justify-center border items-center py-3  rounded-lg ${themeMode !== "darkMode"
              ? "text-black border-black"
              : "text-white border-white"
              } ${videoDetails ? "pl-3 pr-6" : "px-8"}`}
            style={{
              backgroundColor: ctaBtnColor ? ctaBtnColor : "",
              color: ctaBtnTextColor === "blackMode" ? "#000000" : "#fff",

              borderColor: ctaBtnColor ? ctaBtnColor : "",
            }}
            onHandleClick={() => setIsOpen(!isOpen)}
            campaignName={campaignName}
            text={ctaText ?? ""}
          >
            <PlayButton
              className="mr-2"
              color={ctaBtnTextColor === "blackMode" ? "#000000" : "#fff"}
            />
            {ctaText ?? ""}
          </Anchor>
          {isOpen && (
            <VideoRender
              isPopup={true}
              videoDetails={videoDetails}
              className={`pt-9 flex items-start`}
              onClose={() => setIsOpen(false)}
              openForm={() => setOpenForm(true)}
              hasDemoBanner={true}
              campaignName={campaignName}
            />
          )}
        </>

      ) : (
        ctaBtnLink ? (
          <Link href={ctaBtnLink} target="_blank" rel="noopener noreferrer">
            <Anchor
              className={`font-semibold text-center flex justify-center border items-center py-3  rounded-lg ${themeMode !== "darkMode"
                ? "text-black border-black"
                : "text-white border-white"
                } ${videoDetails ? "pl-3 pr-6" : "px-8"}`}
              style={{
                backgroundColor: ctaBtnColor ? ctaBtnColor : "",
                color: ctaBtnTextColor === "blackMode" ? "#000000" : "#fff",
                borderColor: ctaBtnColor ? ctaBtnColor : "",
              }}
              ctaBtnLink={ctaBtnLink}
              campaignName={campaignName}
              text={ctaText ?? ""}
            >
              {ctaText ?? ""}
            </Anchor>
          </Link>
        ) : (
          <Anchor
            className={`font-semibold text-center flex justify-center border items-center py-3  rounded-lg ${themeMode !== "darkMode"
              ? "text-black border-black"
              : "text-white border-white"
              } ${videoDetails ? "pl-3 pr-6" : "px-8"}`}
            style={{
              backgroundColor: ctaBtnColor ? ctaBtnColor : "",
              color: ctaBtnTextColor === "blackMode" ? "#000000" : "#fff",
              borderColor: ctaBtnColor ? ctaBtnColor : "",
            }}
            ctaBtnLink={ctaBtnLink}
            campaignName={campaignName}
            text={ctaText ?? ""}
          >
            {ctaText ?? ""}
          </Anchor>
        )
      )}



    </div>
  );
}
