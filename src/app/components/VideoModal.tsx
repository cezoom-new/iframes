import React from "react";
import { CloseIcon } from "@sanity/icons";
import { VideoModal } from "@/components/common/SecondaryCTABtn";
import Anchor from "@/components/common/anchor/anchor";

type VideoPlatform = "vimeo" | "vidyard" | "youtube";

interface VideoProps {
  videoDetails: VideoModal;
  className?: string;
  isPopup?: boolean;
  onClose?: () => any;
  video?: VideoModal;
  openForm?: () => void;
  hasDemoBanner?: boolean;
}

const getIframeUrl = (videoPlatform: string, videoId: string): string => {
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
const VideoIframe: React.FC<VideoModal> = ({
  videoPlatform,
  videoId,
  title = "",
}) => (
  <iframe
    src={getIframeUrl(videoPlatform, videoId)}
    title={title}
    frameBorder="0"
    allowFullScreen
    className="w-full h-full"
  />
);

export default function VideoRender({
  videoDetails,
  className = "",
  isPopup = false,
  onClose,
  openForm,
  video,
  hasDemoBanner,
}: any) {
  const videoData = video || videoDetails;

  const toggleRef = React.useRef(null);

  // Close the modal if clicking on the parent outside the child
  const handleParentClick = (e: any) => {
    // Check if the click target is the parent
    if (e.target === e.currentTarget) {
      e.target.onclick?.(e);
    }
  };

  if (!videoData) {
    return null;
  }

  return (
    <div
      onClick={handleParentClick}
      className={`${
        isPopup
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          : ""
      } ${className}`}
    >
      <div className="w-full max-w-[750px] px-4" ref={toggleRef}>
        <div
          className={`${
            isPopup
              ? "relative w-full aspect-[16/9] b rounded-lg bg-white"
              : "w-full aspect-[16/9] relative "
          }`}
        >
          {isPopup && onClose && (
            <Anchor
              className="absolute -top-10 -right-[5px] md:-right-5  hover:text-gray-800 transition-colors duration-200 p-1 rounded-full"
              onHandleClick={onClose}
              aria-label="Close video"
            >
              <CloseIcon color="white" height={30} />
            </Anchor>
          )}

          {Array.isArray(videoData) ? (
            videoData.map((item) => (
              <VideoIframe
                key={item._id || `${item.videoPlatform}-${item.videoId}`}
                {...item}
              />
            ))
          ) : (
            <VideoIframe {...videoData} />
          )}
        </div>
      </div>
    </div>
  );
}

export { getIframeUrl };
