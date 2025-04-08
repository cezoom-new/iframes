"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { urlFor } from "@/sanity/lib/image";

interface ICampaignImageArea {
  className: string;
  campaignVideo?: any;
}

function CampaignVideo({
  className,
  campaignVideo,
}: ICampaignImageArea) {

    const videoId = campaignVideo?.videoId;
  const platform = campaignVideo?.videoPlatform;

  const getVideoUrl = () => {
    console.log("videoId", videoId);
    console.log("platform", platform);
    if (!videoId || !platform) return ""; // Return empty string if videoId or platform is not provided
    // Construct the video URL based on the platform
      switch (platform) {
        case "youtube":
          return `https://www.youtube.com/embed/${videoId}`;
        case "vimeo":
          return `https://player.vimeo.com/video/${videoId}`;
        case "vidyard":
          return `https://play.vidyard.com/${videoId}.html`;
        default:
          return "";
      }
  };

  return (
    <div className={className}>
          {videoId && (
        <iframe
          className="w-full h-full aspect-video rounded-xl border-4 border-[#FFFFFF80]"
          src={getVideoUrl()}
          title="Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default CampaignVideo;
