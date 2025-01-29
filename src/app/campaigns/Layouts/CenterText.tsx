import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CampaignTextArea from "../../components/CampaignTextArea";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import { Color } from "./RightImageLeftText";
import DynamicStructure from "@/app/components/dynamicStructure";

export default function CenterText({
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
      // className={`w-full h-screen`}
    >
      {campaign?.isCookieShow && (
        <CookieShow cookie={cookies} campaign={campaign} />
      )}
      <Container
        className={`flex flex-col justify-center max-w-5xl px-4  md:px-8  pt-4 md:pb-8 gap-3 ${banner?.isFullScreen ? "flex-1" : ""}`}
      >
        <div className="text-center gap-3 pb-8 w-full max-w-[950px] m-auto">
          {/* <CampaignTextArea
            campaign={campaign}
            className="w-full justify-items-center"
            colors={colors}
          /> */}
          <DynamicStructure
            colors={colors}
            campaign={campaign}
            components={campaign?.structure?.components}
            className="w-full justify-items-center"
          />
        </div>
      </Container>
      {banner && <Banner className="" banner={banner} />}
    </Section>
  );
}
