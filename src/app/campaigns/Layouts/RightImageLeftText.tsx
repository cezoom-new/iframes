import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";

export  interface Color{
  h1Color:string
  highlightColor:string
  paragraphColor:string
  selectedBgColor:string
  subtitleText: string
}

export default function RightImageLeftText({
  campaign,
  cookies,
  banner = null,
  colors
}: {
  campaign: any;
  cookies: any;
  banner?: any;
  colors?:Color
}) {
  console.log("hhij",campaign)

  return (
    <Section
      bgColor={colors?.selectedBgColor}
      bgImage={campaign?.backgroundImage?.url}
    >
      {campaign?.isCookieShow &&
        <CookieShow cookie={cookies}  campaign={campaign}/>
      }
      <Container
        className={` flex flex-col px-4 md:px-12 pt-4 md:py-8 z-10  gap-3  ${banner?.isFullScreen ? "flex-1" : ""}`}
      >
        <div className="flex-grow flex items-center justify-between gap-4 lg:gap-20">
          <DynamicStructure colors={colors} campaign={campaign} components={campaign?.structure?.components} className="flex flex-col max-w-lg xl:max-w-xl gap-3" />
          <CampaignImageArea
            campaignImage={campaign}
            className="items-center max-w-[500px] hidden lg:block"
            isCarousal={
              campaign?.structure?.campaignCarousalImage?.length >= 1 ? true : false
            }
          />
        </div>
      </Container>
      {banner && <Banner className="" banner={banner} campaignName={campaign?.name}/>}
    </Section>
  );
}
