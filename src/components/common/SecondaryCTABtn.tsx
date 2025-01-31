"use client";
import PlayButton from "@/app/components/PlayButton";
import  VideoRender  from "@/app/components/VideoModal";
import React, { useState } from "react";

export interface VideoModal {
  videoId: string;
  videoPlatform: string;
  videoTitle: string;
  title:string
}
export interface CtaBtnProps {
  ctaText?: string;
  themeMode?: string;
  isSecondaryBtn?: boolean;
  videoDetails?:VideoModal ;
  ctaBtnTextColor?: string;
  ctaBtnColor?:string;
}

export default function SecondaryCTABtn({
  ctaText,
  themeMode,
  isSecondaryBtn = true,
  videoDetails,
  ctaBtnTextColor,
  ctaBtnColor
}: CtaBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <button
        className={`font-semibold text-center flex justify-center border items-center py-3 pl-3 pr-6 rounded-lg ${
          themeMode !== "darkMode"
            ? "text-black border-black"
            : "text-white border-white"
        } `}
        style={{
          backgroundColor: ctaBtnColor
            ? ctaBtnColor
           : "",
          color:
            ctaBtnTextColor === "blackMode"
              ? "#000000"
              : "#fff",

          borderColor:ctaBtnColor
          ? ctaBtnColor
         : "",
        }}
        onClick={(e: React.SyntheticEvent) => setIsOpen(!isOpen)}
      >
        {isSecondaryBtn && (
          <PlayButton className="mr-2" color={ctaBtnTextColor === "blackMode" ? "#000000"  : "#fff"}/>
        )}
        {ctaText}
      </button>
      {isOpen && (
        <VideoRender
          isPopup={true}
          videoDetails={videoDetails}
          className={`pt-9 flex items-start`}
          onClose={() => setIsOpen(false)}
          openForm={() => setOpenForm(true)}
          hasDemoBanner={true}
        />
      )}
    </div>
  );
}
