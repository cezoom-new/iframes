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
  layout,
}: any) => {
  const urlBuilder: any = (source: any) => urlBuilder(client).image(source);

  const titleComponent: any = {
    block: {
      normal: ({ children }: any) => (
        <p
          style={{ color: colors?.h1Color}}
          className={`${layout == "osdental" ? "text-sm" : "text-3xl lg:text-5xl"} font-extrabold py-3 !leading-tight font-manrope`}
        >
          {children}
          {campaign?.headingUnderline && <div style={{background: campaign?.headingUnderline}} className="w-full h-[3px] mt-3"></div>}
          
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
          className={`${layout == "osdental" ? "text-xl xl:text-3xl font-bold" : "text-2xl lg:text-3xl font-semibold"} pb-3 !leading-snug`}
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

  const promoComponent: any = {
    block: {
      normal: ({ children }: any) => <p className="text-xs">{children}</p>,
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
          className="text-sm font-semibold !leading-snug text-left"
        >
          {children}
        </p>
      ),
    },
    marks: {
      highlight: ({ children }: any) => (
        <span style={{ color: colors?.highlightColor }}>{children}</span>
      ),
      "large-text": ({ children }: any) => (
        <span className="text-2xl">{children}</span>
      ),
      "strike-through": ({ children }: any) => (
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

  const listComponents: any = (listIcon: any) => ({
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="text-xs xl:text-sm text-[#404040] gap-3 flex flex-col">
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="flex gap-2 text-[#404040] items-start font-medium text-xs xl:text-sm">
          <div className="w-4 flex-shrink-0">
            {listIcon && (
              <Image
                src={urlBuilder(listIcon).url()}
                alt="icon"
                width={28}
                height={28}
              />
            )}
          </div>
          <div className="flex-1">{children}</div>
        </li>
      ),
    },
  });
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
                templateHeader={component?.subTitle}
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
          case "listComponent":
            return (
              <PortableText
                key={`listComponent-${index}`}
                value={component?.list}
                components={listComponents(component?.listIcon)}
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
                    campaignName={campaign?.name}
                    className={`${layout == "osdental" ? 'w-full': ''}`}
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
                    campaignName={campaign?.name}
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

          case "promocodeButton":
            return (
              <div className="flex gap-6 mt-4" key={`promocodeButton-${index}`}>
                {component?.ctaBtn?.ctaBtnText && (
                  <CTAButton
                    ctaText={component?.ctaBtn?.ctaBtnText}
                    ctaBtnColor={component?.ctaBtn?.ctaBtnColor}
                    themeMode={campaign?.themeMode}
                    ctaBtnTextColor={component?.ctaBtn?.ctaBtnTextColor}
                    ctaBtnLink={component?.ctaBtn?.ctaBtnLink}
                    campaignName={campaign?.name}
                  />
                )}
                <div className="flex flex-col text-white gap-0.5">
                  <div className="flex gap-1 text-xs">
                    {/* <span>USE PROMO CODE</span> */}
                    <span className="">
                      <PortableText
                        value={component?.promocode}
                        components={promoComponent}
                      />
                    </span>
                  </div>
                  <div className="flex gap-2 relative">
                    <span className="font-semibold text-3xl">
                      {component?.discountPrice}
                      <span className="text-white font-normal text-base align-super">
                        .00
                      </span>
                    </span>

                    <span className="text-sm ml-1 relative">
                      {" "}
                      <span className="opacity-70">
                        {component?.originalPrice}
                      </span>
                      <span
                        className="absolute inset-2.5 left-[-6%] w-[110%] h-0.5 bg-[#E32526]"
                        style={{
                          transform: "rotate(-10deg)",
                          transformOrigin: "center",
                        }}
                      ></span>
                    </span>
                  </div>
                </div>
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
