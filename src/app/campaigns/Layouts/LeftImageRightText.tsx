import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import { Color } from "./RightImageLeftText";
import DynamicStructure from "@/app/components/dynamicStructure";
import VideoPlayer from "@/app/components/VideoPlayer";
import Image from "next/image";

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
    <Section className="relative w-full min-h-screen overflow-hidden">
      {colors?.selectedBgColor && (
        <div
          className="absolute inset-0 z-[-2]"
          style={{ background: colors?.selectedBgColor }}
        />
      )}

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
        <Container className={` flex flex-col pt-4 md:py-4 gap-3  `}>
          <div className="flex-grow flex items-center gap-4 md:gap-16 xl:gap-24">
            {/* <CampaignImageArea
              campaignImage={campaign}
              className=" max-w-[500px] hidden lg:block"
            /> */}
            {campaign?.structure?.campaignvideoUrl ? (
              <div className="items-center max-w-[500px] hidden lg:block flex-1 rounded-xl overflow-hidden">
                 <Image
                  src={campaign?.structure?.campaignvideoUrl}
                  alt="Campaign GIF"
                  width={500}
                  height={300}
                  unoptimized // Required because it's an external GIF
                  priority
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
