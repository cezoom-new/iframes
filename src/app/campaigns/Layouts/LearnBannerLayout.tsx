import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";
import Image from "next/image";
import DynamicStructureNew from "@/app/components/DynamicStructureNew";

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
      <div className="">
        <Container
          className={`max-w-full flex flex-col z-10  gap-3 `}
        >
          <div className="flex items-center justify-between w-full gap-32">

            <div className="flex flex-col gap-4 max-w-1/3 pl-16">
            <DynamicStructureNew
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className=""
            />
            </div>
             {campaign?.structure?.campaignvideoUrl ? (

                // <div></div>
              <div className="">
                 <Image
                  src={campaign?.structure?.campaignvideoUrl}
                  alt="Campaign GIF"
                  width={500}
                  height={300}
                />
              </div>
            ) : (
              <CampaignImageArea
              campaignImage={campaign}
              className="items-center max-w-[500px]"
              isCarousal={
                campaign?.structure?.campaignCarousalImage?.length >= 1
                  ? true
                  : false
              }
            />

            // <div></div>
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
