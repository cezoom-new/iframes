"use client";
import React, { useEffect, useState } from "react";

interface ICampaignImageArea {
  className: string;
  campaignVideo?: any;
}

function CampaignVideo({ className, campaignVideo }: ICampaignImageArea) {
  const videoId = campaignVideo?.videoId;
  const platform = campaignVideo?.videoPlatform;

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Tailwind 'md' breakpoint
    if (!isMobile) {
      setShowVideo(true);
    }
  }, []);

  const getVideoUrl = () => {
    if (!videoId || !platform) return "";
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

  if (!showVideo || !videoId) return null;

  return (
    <div className="items-center flex-1 w-full hidden md:flex">
      <iframe
        className="w-full h-full aspect-video rounded-xl border-2 border-[#FFFFFF40]"
        src={`${getVideoUrl()}?autoplay=1&mute=1`}
        title="Video"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default CampaignVideo;
