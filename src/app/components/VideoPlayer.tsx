import React, { useMemo } from 'react'

interface VideoPlayerProps {
  videoData?: any;
  className?: string;
  refer?: any;
  isMobile?: boolean;
  campaignImage?: any;
}

export default function VideoPlayer({
  videoData,
  className = '',
  refer = null,
  isMobile,
  campaignImage
}: VideoPlayerProps) {
  console.log('videoData', videoData)
  const movFile = isMobile
    ? videoData?.bgVideoUrlMobileMacMov
    : videoData?.bgVideoUrlMobile

  const webmFile = isMobile
    ? videoData?.bgVideoUrlMobileChromeWebp
    : videoData?.bgVideoUrlWebm || videoData?.bgVideoUrl

  const videoKey = useMemo(() => `${movFile}-${webmFile}`, [movFile, webmFile])

  return (
    <video
      key={videoKey}
      ref={refer}
      className={`w-full h-full ${className} `}
      style={{ backgroundColor: 'transparent', objectFit: 'cover' }}
      autoPlay
      loop
      muted
      playsInline
      poster={campaignImage}
    >
      {videoData && <source src={videoData} type='video/mp4;' />}
      {/* {webmFile && <source src={webmFile} type="video/webm" />} */}
      Your browser does not support the video tag.
    </video>
  )
}
