import Banner from "@/components/common/Banner/Banner";
import Container from "@/components/common/structure/Container";
import Section from "@/components/common/structure/Section";
import React from "react";
import CookieShow from "@/components/common/cookieShow/cookieShow";
import { Color } from "./RightImageLeftText";
import DynamicStructure from "@/app/components/dynamicStructure";
import Image from "next/image";

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
    <Section className="relative w-full min-h-screen overflow-hidden">
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
      <div className="relative z-10 px-4 md:px-8 xl:px-12">
        {cookies && <CookieShow cookie={cookies} campaign={campaign} />}
        
        <Container
          className={`flex flex-col justify-center max-w-5xl pt-4 md:pb-8 gap-3 ${banner?.isFullScreen ? "flex-1" : ""}`}
        >
          <div className="text-center gap-3 pb-8 w-full max-w-[950px] m-auto">
            <DynamicStructure
              colors={colors}
              campaign={campaign}
              components={campaign?.structure?.components}
              className="w-full items-center flex flex-col"
            />
          </div>
        </Container>

        {banner && <Banner className="relative z-10" banner={banner} />}
      </div>
    </Section>
  );
}
