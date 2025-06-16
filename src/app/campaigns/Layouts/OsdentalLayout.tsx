import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";
import CampaignVideo from "@/app/components/CampaignVideo";
import VideoPlayer from "@/app/components/VideoPlayer";
import { PortableText } from "next-sanity";
import CTAButton from "@/components/common/CTAButton";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import VideoIframe from "@/app/components/videoFrame";

export interface Color {
  h1Color: string;
  highlightColor: string;
  paragraphColor: string;
  selectedBgColor: string;
  subtitleText: string;
  popupTextColor: string;
  popupTitleBgColor: string;
}

export default function OSDentalLayout({
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
  const popupComponent: any = (textColor: any) => ({
    block: {
      normal: ({ children }: any) => (
        <p
          style={{
            color: textColor,
            background: textColor,
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-base font-semibold"
        >
          {children}
        </p>
      ),
    },
    marks: {
      highlight: ({ children }: any) => (
        <span style={{ color: colors?.highlightColor }}>{children}</span>
      ),
    },
  });
  return (
    <Section className="!justify-start">
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
      <div className="">
        <div
          className={`flex flex-col gap-3  ${banner?.isFullScreen ? "flex-1" : ""}`}
        >
          <div className="w-full text-center flex flex-col">
            <div
              // style={{ background: "linear-gradient(270deg, #9B42F1 -0.66%, #F768D1 101.16%)" }}
              style={{ background: campaign?.frameTitleBgColor }}
              className="text-white py-6 px-6 xl:py-10 xl:px-16 text-xl xl:text-3xl font-bold"
            >
              {campaign?.structure?.popupTitle}
            </div>
            <div className="w-full max-w-[1628px] m-auto flex justify-self-center">
              <div className="flex-grow flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8 xl:gap-16 p-4 xl:p-16 text-left">
                <DynamicStructure
                  colors={colors}
                  campaign={campaign}
                  components={campaign?.structure?.components}
                  className="flex flex-col xl:max-w-[450px] max-w-[350px]"
                  layout="osdental"
                />
                {campaign?.structure?.campaignVideo ? (
                  <div className="items-center block flex-1 rounded-xl overflow-hidden aspect-video justify-items-end min-w-[300px]">
                          <VideoIframe videoPlatform={campaign?.structure?.campaignVideo?.videoPlatform} videoId={campaign?.structure?.campaignVideo?.videoId}/>
                  </div>
                ) : (
                  <CampaignImageArea
                    campaignImage={campaign}
                    className="items-center block flex-1 justify-items-end min-w-[300px]"
                    isCarousal={
                      campaign?.structure?.campaignCarousalImage?.length >= 1
                        ? true
                        : false
                    }
                  />
                )}
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </Section>
  );
}
