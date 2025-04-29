import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import { Color } from "./RightImageLeftText";
import DynamicStructure from "@/app/components/dynamicStructure";
import VideoPlayer from "@/app/components/VideoPlayer";

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
      {cookies && <CookieShow cookie={cookies} campaign={campaign} />}
      <div className="px-4 md:px-12 xl:px-12">
        <Container className={` flex flex-col pt-4 md:py-4 gap-3  `}>
          <div className="flex-grow flex items-center gap-4 md:gap-16 xl:gap-24">
            {/* <CampaignImageArea
              campaignImage={campaign}
              className=" max-w-[500px] hidden lg:block"
            /> */}
            {campaign?.structure?.campaignvideoUrl ? (
              <div className="items-center max-w-[500px] hidden lg:block flex-1 rounded-xl overflow-hidden">
                <VideoPlayer
                  videoData={campaign?.structure?.campaignvideoUrl}
                  campaignImage={campaign?.campaignImage?.url}
                />
              </div>
            ) : (
              <CampaignImageArea
                campaignImage={campaign}
                className="items-center max-w-[500px] hidden lg:block flex-1"
                isCarousal={
                  campaign?.structure?.campaignCarousalImage?.length >= 1
                    ? true
                    : false
                }
              />
            )}
            <DynamicStructure
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="flex flex-col max-w-xl xl:max-w-2xl"
            />
          </div>
        </Container>
      </div>
      {banner && <Banner className="" banner={banner} />}
    </Section>
  );
}
