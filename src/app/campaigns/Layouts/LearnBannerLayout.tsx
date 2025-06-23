import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageAreaLearn from "@/app/components/learn/CampaignImageAreaLearn";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";
import Image from "next/image";
import DynamicStructureNew from "@/app/components/learn/DynamicStructureLearn";

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
      
        <Container
          className={`max-w-full flex flex-col z-10 gap-3 `}
        >
          <div className="flex items-center justify-between w-full gap-32">

            <div className="flex flex-col gap-4 max-w-1/3 pl-8">
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
              <CampaignImageAreaLearn
              campaignImage={campaign}
              className="flex justify-end items-center max-h-[250px] h-[250px] w-full"
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
    
      {banner && (
        <Banner className="" banner={banner} campaignName={campaign?.name} />
      )}
    </Section>
  );
}
