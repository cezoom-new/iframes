import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import { Color } from "./RightImageLeftText";
import DynamicStructure from "@/app/components/dynamicStructure";

export default function LeftImageRightText({
  campaign,
  cookies,
  banner = null,
  colors,
}: {
  campaign: any;
  cookies: any;
  banner: any;
  colors?: Color;
}) {
  return (
    <Section
      bgColor={colors?.selectedBgColor}
      bgImage={campaign?.backgroundImage?.url}
      //  className={`w-full h-screen`}
    >
      {cookies && (
        <CookieShow cookie={cookies} campaign={campaign} />
      )}
      <div className="px-4 md:px-8 xl:px-12">
        <Container
          className={` flex flex-col pt-4 md:py-8 gap-3  `}
        >
          <div className="flex items-center gap-4 lg:gap-24 pb-8 justify-between">
            {/* <CampaignImageArea
              campaignImage={campaign}
              className=" max-w-[500px] hidden lg:block"
            /> */}
            <CampaignImageArea
              campaignImage={campaign}
              className="items-center max-w-[500px] hidden lg:block"
              isCarousal={
                campaign?.structure?.campaignCarousalImage?.length >= 1 ? true : false
              }
            />
            <DynamicStructure
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="max-w-lg xl:max-w-xl gap-3"
            />
          </div>
        </Container>
      </div>
      {banner && <Banner className="" banner={banner} />}
    </Section>
  );
}
