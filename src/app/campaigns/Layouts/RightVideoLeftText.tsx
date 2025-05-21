import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";
import CampaignVideo from "@/app/components/CampaignVideo";
import Image from "next/image";

export interface Color {
  h1Color: string;
  highlightColor: string;
  paragraphColor: string;
  selectedBgColor: string;
  subtitleText: string;
  popupTextColor: string;
  popupTitleBgColor: string;
}

export default function RightVideoLeftText({
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
          <div className="flex-grow flex items-center gap-4 md:gap-16 xl:gap-24">
            <DynamicStructure
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="flex flex-col flex-1 lg:max-w-[500px]"
            />
            <CampaignVideo
              className="items-center flex-1 hidden invisible md:visible lg:block w-full"
              campaignVideo={campaign?.structure?.campaignVideo}
            />
          </div>
        </Container>
      </div>
      {banner && (
        <Banner className="" banner={banner} campaignName={campaign?.name} />
      )}
    </Section>
  );
}
