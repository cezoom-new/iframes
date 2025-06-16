import React from "react";

interface VideoPlayerProps {
  videoPlatform?: any;
  videoId?: any;
  title?: string;
}

const getIframeUrl = (videoPlatform: string, videoId: string) => {
  switch (videoPlatform) {
    case "vimeo":
      return `https://player.vimeo.com/video/${videoId}`;
    case "vidyard":
      return `https://play.vidyard.com/${videoId}`;
    case "youtube":
      return `https://www.youtube.com/embed/${videoId}`;
    default:
      throw new Error(`Unsupported platform: ${videoPlatform}`);
  }
};

// Move VideoIframe outside of the main component to avoid re-creation on each render
export default function VideoIframe ({
  videoPlatform,
  videoId,
  title = "",
}:VideoPlayerProps) {
    return (
        <iframe
          src={getIframeUrl(videoPlatform, videoId)}
          title={title}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
          allow="autoplay"
        />
    )
}

