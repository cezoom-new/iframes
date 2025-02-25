import React from "react";
import { PortableText } from "next-sanity";
import { formatCustomDate, formatDateChange } from "@/utils/page";
import Link from "next/link";
import Image from "next/image";
import locIcon from "../../../../public/Frame.svg";
import { urlFor } from "@/sanity/lib/image";
import Anchor from "../anchor/anchor";

export interface IBannerInterface {
  className: string;
  bannerText?: string;
  bannerHeading?: string;
  registerBtnText?: string;
}

const headingComponents: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-2xl lg:text-3xl font-semibold">{children}</p>
    ),
  },
  marks: {
    textColor: ({ children, value }: any) => (
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }: any) => (
      <span style={{ background: value.value }}>{children}</span>
    ),
  },
};
const descriptionComponents: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-sm md:text-[16px] text-[#FFFFFFBF] font-normal">
        {children}
      </p>
    ),
  },
  marks: {
    textColor: ({ children, value }: any) => (
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }: any) => (
      <span style={{ background: value.value }}>{children}</span>
    ),
  },
};
export default function Banner({ className, banner, campaignName }: any) {
  const getMonths = (date: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [year, month, day] = date.split("-");
    const formattedDate = `${months[parseInt(month, 10) - 1]} `;

    return formattedDate;
  };

  const getDate = (date: string) => {
    const currentDate = new Date(date); // Get the current date
    const day = String(currentDate.getDate()).padStart(2, "0");
    return day;
  };
  return (
    <div className="px-4 md:px-8 xl:px-12">

      <div
        className={`flex text-white bottom-0 w-full flex-col xs:flex-row ${banner?.isFullScreen ? "" : "xl:max-w-7xl xl:m-auto rounded-lg"}`}
        style={{
          backgroundColor: banner?.backgroundColorGradient,
        }}
      >
        {banner?.isFullScreen ? (
          <div className="w-full xs:w-1/6 bg-slate-800 text-teal-400 font-medium">
            <div className="flex flex-col items-center h-full justify-center w-52 justify-self-center">
              <span className="md:font-medium text-base md:text-lg">
                {getMonths(banner?.eventStartingDate)}
              </span>
              <span className="text-2xl lg:text-4xl font-medium">
                {getDate(banner?.eventStartingDate)}-
                {getDate(banner?.eventEndingDate)}
              </span>
              <span className="text-sm lg:text-lg font-medium text-white">
                {new Date(banner?.eventStartingDate).getFullYear()}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            backgroundColor: banner?.backgroundColorGradient,
            padding: banner?.sectionPadding,
          }}
          className={`text-white w-full px-6 xl:px-12 py-6 xl:py-10 ${banner?.isFullScreen ? "flex-1 w-5/6 " : "rounded-lg"}`}
        >
          <div
            className=""
            style={{ padding: banner?.containerPadding }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 xl:gap-8 relative">
              <div>

              {banner?.banner?.map((component: any, index: number) => {
                switch (component._type) {
                  case "bannerHeading":
                    return (
                      <PortableText
                        key={`bannerHeading-${index}`}
                        value={component?.bannerHeading}
                        components={headingComponents}
                      />
                    );
                  case "eventDescription":
                    return (
                      <PortableText
                        key={`eventDescription-${index}`}
                        value={component?.eventDescription}
                        components={descriptionComponents}
                      />
                    );

                  case "buttonComponents":
                    return null;
                  case "pillElement":
                    return (
                      <div
                        className="flex gap-2 items-center py-3 "
                        key={`pillElement-${index}`}
                      >
                        {component?.eventLocationBadges?.eventLocationBadges?.map(
                          (item: any, i: number) => (
                            <span
                              key={i}
                              style={{ backgroundColor: item?.badgeColor }}
                              className="text-xs font-semibold p-2 text-center uppercase rounded text-[#CBD5E1]"
                            >
                              {item?.badgeTitle}
                            </span>
                          )
                        )}
                        {component?.eventLocation && (
                          <div className="flex gap-2">
                            <Image
                              src={locIcon}
                              alt="location"
                              width={20}
                              height={20}
                            />
                            <span className="text-xs lg:text-lg font-medium">
                              {component?.eventLocation}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  
                  default:
                    return <div key={`unknown-${index}`}>Unknown component</div>;
                }
              })}
              </div>
              <div>
              {banner?.banner?.map((component: any, index: number) => {                
                return (
                  component._type == "buttonComponents" ?
                  <div
                    className="relative"
                    key={`buttonComponents-${index}`}
                  >
                    <Link href={component?.ctaBtnTextLink} target="_blank">
                      <Anchor
                        style={{
                          backgroundColor: component?.ctaBtnColor,
                          color: component?.ctaBtnTextColor,
                        }}
                        className="font-bold text-sm h-11 w-40 rounded bg-white text-[#1E293B]"
                        campaignName={campaignName}
                        ctaBtnLink={component?.ctaBtnTextLink}
                      >
                        {component?.ctaBtnTextForEvent}
                      </Anchor>
                    </Link>
                  </div>
                  : null
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
