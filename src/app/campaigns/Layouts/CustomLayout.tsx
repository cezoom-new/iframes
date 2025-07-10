import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructureCustom from "@/app/components/custom/DynamicStructureCustom";
import Image from "next/image";
import VideoPlayer from "@/app/components/VideoPlayer";

export interface Color {
  h1Color: string;
  highlightColor: string;
  paragraphColor: string;
  selectedBgColor: string;
  subtitleText: string;
  popupTextColor: string;
  popupTitleBgColor: string;
}

export default function RightImageLeftText({
  campaign,
  cookies,
  banner = null,
  colors,
}: {
  campaign: any;
  cookies: any;
  banner?: any;
  colors?: Color;
}) {
  return (
    <Section
      bgColor={colors?.selectedBgColor}
      bgImage={campaign?.backgroundImage?.url}
    >
      <div
        className="absolute inset-0 z-[-2]"
        style={{
          background: colors?.selectedBgColor || "transparent",
        }}
      />
      {campaign?.backgroundImage?.url && (
        <Image
          src={campaign?.backgroundImage?.url}
          alt="Background"
          fill
          quality={75}
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -1,
          }}
        />
      )}
      {cookies && <CookieShow cookie={cookies} campaign={campaign} />}
      <div className="px-4 md:px-12 xl:px-12">
        <Container
          className={` flex flex-col pt-4 md:py-4 z-10  gap-3  ${banner?.isFullScreen ? "flex-1" : ""}`}
        >
          <div className="flex-grow flex items-center gap-4 md:gap-12 xl:gap-16 w-full">
            <DynamicStructureCustom
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="flex flex-col xmd:w-1/2 w-2/3 xl:w-1/2 "
            />
             {campaign?.structure?.campaignvideoUrl ? (
              <div className="items-center max-w-[500px] hidden xmd:block flex-1 rounded-xl overflow-hidden">
                 {/* <Image
                  src={campaign?.structure?.campaignvideoUrl}
                  alt="Campaign GIF"
                  width={500}
                  height={300}
                /> */}

                <VideoPlayer videoData={campaign?.structure?.campaignvideoUrl}>

                </VideoPlayer>
              </div>
            ) : (
              <CampaignImageArea
              campaignImage={campaign}
              className="items-center w-1/2 hidden xmd:block flex-1 rounded-xl overflow-hidden"
              isCarousal={
                campaign?.structure?.campaignCarousalImage?.length >= 1
                  ? true
                  : false
              }
            />
            )}
            
          </div>
        </Container>
      </div>
      {banner && (
        <Banner className="" banner={banner} campaignName={campaign?.name} />
      )}
    </Section>
  );
}
