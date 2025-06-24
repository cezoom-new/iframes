import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignImageArea from "../../components/CampaignImageArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import DynamicStructure from "@/app/components/dynamicStructure";
import Image from "next/image";
import VideoModalNew from "@/app/components/VideoModalNew";
import { PlayIcon } from "lucide-react";
import PlayButton from "@/app/components/PlayButton";

export interface Color {
  h1Color: string;
  highlightColor: string;
  paragraphColor: string;
  selectedBgColor: string;
  subtitleText: string;
  popupTextColor: string;
  popupTitleBgColor: string;
}

export default function RighImageWithPopup({
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

  const [modalShow, setModalShow] = React.useState<Boolean>(false);


  const handleClose = () => {
    setModalShow(false);
  }


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
          \
          <div className="flex-grow flex items-center gap-4 md:gap-16 xl:gap-24">
            <DynamicStructure
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="flex flex-col max-w-xl xl:max-w-2xl"
            />


            <div className="cursor-pointer relative" onClick={() => setModalShow(true)}>


              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1.5 pl-2.5 items-center justify-center flex hover:scale-110 transform duration-300 ease-in-out">
                <PlayButton color={campaign.structure.imageButtonColor ? campaign.structure.imageButtonColor : "#000"} className="w-12 h-12 ml-px" />
              </div>

              <CampaignImageArea
                campaignImage={campaign}
                className="items-center max-w-[500px] hidden lg:block flex-1 rounded-xl overflow-hidden"
                isCarousal={
                  campaign?.structure?.campaignCarousalImage?.length >= 1
                    ? true
                    : false
                }
              />
            </div>

          </div>
        </Container>
      </div>
      {banner && (
        <Banner className="" banner={banner} campaignName={campaign?.name} />
      )}




      {campaign?.structure?.campaignVideo && modalShow && (
        <VideoModalNew
          videoDetails={campaign?.structure?.campaignVideo}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          isPopup={true}
          onClose={handleClose}

          video={campaign?.structure?.campaignVideo}
          hasDemoBanner={false}
          campaignName={campaign?.name}
        />
      )}
    </Section>
  );
}
