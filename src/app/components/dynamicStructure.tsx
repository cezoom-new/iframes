import CampaignHeader from "@/app/components/CampaignHeader";
import { PortableText } from "next-sanity";
import React, { Children } from "react";
import Image from "next/image";
import urlBuilder from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import CTAButton from "@/components/common/CTAButton";
import SecondaryCTABtn from "@/components/common/SecondaryCTABtn";
const builder = urlBuilder(client);

const DynamicComponents = ({
  campaign,
  components,
  className,
  colors,
}: any) => {
  const urlBuilder: any = (source: any) => urlBuilder(client).image(source);

  // const ImageComponent = ({ value, isInline }: any) => {
  //   if (!value?.asset?._ref) return null;

  //   const { width, height } = value.asset.metadata?.dimensions || { width: 800, height: 600 };

  //   return (
  //     <img
  //       src={builder.image(value).fit('max').auto('format').url()}
  //       alt={value.alt || 'Sanity Image'}
  //       // className="w-24 h-6"
  //       className="h-[92px] pt-[20px] pb-[19px] mx-2"
  //       loading="eager"
  //       style={{

  //         aspectRatio: width / height,
  //         width:value?.width,
  //         height:value?.height

  //       }}
  //     />
  //   );
  // };

  const titleComponent: any = {
    block: {
      normal: ({ children }: any) => (
        <p
          style={{ color: colors?.h1Color }}
          className="text-3xl lg:text-5xl font-extrabold pt-3 !leading-tight font-manrope"
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
  };

  const subTitleComponent: any = {
    block: {
      normal: ({ children }: any) => (
        <p
          style={{ color: colors?.subtitleText }}
          className="text-2xl lg:text-3xl font-semibold pb-3 !leading-snug"
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
  };

  const noteComponents: any = {
    block: {
      normal: ({ children }: any) => (
        <p
          style={{ color: colors?.paragraphColor }}
          className="text-sm font-semibold pb-3 !leading-snug"
        >
          {children}
        </p>
      ),
    },
    marks: {
      highlight: ({ children }: any) => (
        <span style={{ color: colors?.highlightColor }}>{children}</span>
      ),
      strong: ({ children }: any) => (
        <span style={{ fontSize: "24px" }}>{children}</span>
      ),
      em: ({ children }: any) => (
        <span className="text-sm ml-1 relative opacity-70">
          {" "}
          <span>{children}</span>
          <span
            className="absolute inset-2 w-full h-0.5 bg-red-500"
            style={{ transform: "rotate(-10deg)", transformOrigin: "center" }}
          ></span>
        </span>
      ),
    },
  };

  const paragraphComponents: any = {
    block: {
      normal: ({ children }: any) => (
        <p
          style={{ color: colors?.paragraphColor }}
          className="xl:text-lg pb-3"
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
  };

  return (
    <div
      className={`${className} ${
        campaign?.themeMode == "lightMode"
          ? "text-[#000000B2]"
          : "text-[#FFFFFFB2]"
      }`}
    >
      {components?.map((component: any, index: number) => {
        switch (component._type) {
          case "topTemplateLogo":
            return (
              <div key={`topTemplateLogo-${index}`} className="mt-2">
                {campaign?.templateLogos?.components[0]?.templateLogos?.length >
                1 ? (
                  <div className="flex gap-6 flex-wrap items-center justify-start">
                    {campaign?.templateLogos?.components[0]?.templateLogos?.map(
                      (item: any, i: number) => {
                        return (
                          <div
                            key={item?.asset?._id}
                            className="w-24 flex items-center"
                          >
                            <Image
                              className="w-full max-h-[100px] object-contain"
                              src={item?.asset?.url}
                              width={
                                item?.asset?.metadata?.dimensions?.width || 200
                              }
                              height={
                                item?.asset?.metadata?.dimensions?.height || 200
                              }
                              alt={"sampleText"}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <Image
                    src={
                      campaign?.templateLogos?.components[0]?.templateLogos[0]
                        ?.asset?.url
                    }
                    alt={"sampleText"}
                    // className="max-h-full"
                    width={
                      campaign?.templateLogos?.components[0]?.templateLogos[0]
                        ?.asset?.metadata?.dimensions?.width || 200
                    }
                    height={
                      campaign?.templateLogos?.components[0]?.templateLogos[0]
                        ?.asset?.metadata?.dimensions?.height || 200
                    }
                    key={
                      campaign?.templateLogos?.components[0]?.templateLogos[0]
                        ?.asset?._id
                    }
                  />
                )}
              </div>
            );

          case "pillElement":
            return (
              <CampaignHeader
                key={`pillElement-${index}`}
                logoUrl={component?.templateLogo?.url}
                templateHeader={component?.templateText}
                eventType={component?.templateEventType}
                eventDate={component?.templateEventDate}
                eventLocation={component?.eventLocation}
              />
            );

          case "headingComponent":
            return (
              <div
                className="flex"
                key={`headingComponent-${index + Math.random()}`}
              >
                <PortableText
                  key={`headingComponent-${index}`}
                  value={component?.title}
                  components={titleComponent}
                />
              </div>
            );

          case "subHeadingComponent":
            return (
              <div
                key={`subHeadingComponent-${index}`}
                className="flex items-center gap-10"
              >
                <PortableText
                  value={component?.subTitle}
                  components={subTitleComponent}
                />
              </div>
            );

          case "paragraphComponent":
            return (
              <PortableText
                key={`paragraphComponent-${index}`}
                value={component?.paragraph}
                components={paragraphComponents}
              />
            );

          case "buttonComponents":
            return (
              <div
                key={`buttonComponents-${index}`}
                className="flex gap-6 py-3 items-center"
              >
                {component?.ctaBtn?.ctaBtnText && (
                  <CTAButton
                    ctaText={component?.ctaBtn?.ctaBtnText}
                    ctaBtnColor={component?.ctaBtn?.ctaBtnColor}
                    themeMode={campaign?.themeMode}
                    ctaBtnTextColor={component?.ctaBtn?.ctaBtnTextColor}
                    ctaBtnLink={component?.ctaBtn?.ctaBtnLink}
                  />
                )}
                {component?.secondaryBtnComponent?.secondaryBtnText && (
                  <SecondaryCTABtn
                    ctaText={component?.secondaryBtnComponent?.secondaryBtnText}
                    themeMode={campaign?.themeMode}
                    isSecondaryBtn={true}
                    ctaBtnTextColor={
                      component?.secondaryBtnComponent?.ctaBtnTextColor
                    }
                    ctaBtnColor={component?.secondaryBtnComponent?.ctaBtnColor}
                    videoDetails={
                      component?.secondaryBtnComponent?.videoDetails
                    }
                  />
                )}
                {component?.note && (
                  <PortableText
                    value={component?.note}
                    components={noteComponents}
                  />
                )}
              </div>
            );
          case "noteComponent":
            return (
              <p className="pt-3 text-base" key={`disclaimer-${index}`}>
                {component?.disclaimer}
              </p>
            );

          default:
            return <div key={`unknown-${index}`}>Unknown component</div>;
        }
      })}
    </div>
  );
};

export default DynamicComponents;
function rotate(arg0: number, deg: any) {
  throw new Error("Function not implemented.");
}
