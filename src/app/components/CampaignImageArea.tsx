"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { urlFor } from "@/sanity/lib/image";

interface ICampaignImageArea {
  campaignImage: any;
  className: string;
  isCarousal?: boolean;
}

function CampaignImageArea({
  campaignImage,
  className,
  isCarousal = false,
}: ICampaignImageArea) {
  const fontColor =
    campaignImage?.themeMode == "lightMode" ? "text-black" : "text-white";
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={className}>
      {campaignImage?.campaignImage && !isCarousal && (
        <Image
          alt={
            campaignImage?.campaignImage?.metadata?.altText || "campaign Image"
          }
          src={campaignImage?.campaignImage?.url}
          width={1200}
          height={1200}
        />
      )}

      {isCarousal &&
        campaignImage?.structure?.campaignCarousalImage?.length > 0 && (
          <Swiper
            navigation={true}
            pagination={{
              clickable: true, // This enables bullet pagination
              type: "bullets", // Bullet pagination style
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay, Navigation]}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)} // Update current slide index
          >
            {/* Number pagination (current/total) */}
            <div className="absolute top-0 left-12 text-white">
              <span className="text-lg font-semibold">
                0{currentSlide + 1} /{" "}
                <span className="opacity-50">
                  0{campaignImage?.structure?.campaignCarousalImage?.length}
                </span>
              </span>
            </div>

            {campaignImage?.structure?.campaignCarousalImage?.map(
              (e: any, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    className="max-h-[48vh] w-auto justify-self-end"
                    src={urlFor(e.speakerImage).url()}
                    alt={"campaign carousel image"}
                    width={500}
                    height={500}
                  />
                  <h3
                    className={`${fontColor} text-2xl text-right font-semibold break-words w-[500px] mt-4`}
                  >
                    {e.speakerName}
                  </h3>
                  <p
                    className={`${fontColor} text-sm text-right font-normal break-words w-[500px]`}
                    style={{ opacity: 0.5 }}
                  >
                    {e.speakerDesignation}
                  </p>
                </SwiperSlide>
              )
            )}
          </Swiper>
        )}
    </div>
  );
}

export default CampaignImageArea;
