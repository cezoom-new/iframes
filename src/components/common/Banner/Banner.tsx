import React from "react";
import { PortableText } from "next-sanity";
import { formatCustomDate, formatDateChange } from "@/utils/page";
import Link from "next/link";
import Image from "next/image";
import locIcon from "../../../../public/Frame.svg";
import { urlFor } from "@/sanity/lib/image";

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
      <p className="pt-4 text-sm md:text-[16px] text-[#FFFFFFBF] font-normal">{children}</p>
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
export default function Banner({ className, banner }: any) {
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
    <div
      className={`flex text-white bottom-0 w-full ${banner?.isFullScreen ? "" : "max-w-7xl m-auto rounded-lg"}`}
      style={{
        backgroundColor: banner?.backgroundColorGradient,
      }}
    >
      {banner?.isFullScreen ? (
        <div className="w-1/6 bg-slate-800 text-teal-400 font-medium">
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
        className={`text-white w-full px-12 py-8 ${banner?.isFullScreen ? "flex-1 w-5/6 " : "rounded-lg"}`}
      >
        <div
          className="container mx-auto"
          style={{ padding: banner?.containerPadding }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4">
            <div>
              <div className="flex gap-2 items-center mb-4 pb-3 border-b-[0.5px] border-b-slate-700">
                {banner?.eventLocationBadges?.map((item: any, i: number) => (
                  <span
                    key={i}
                    style={{ backgroundColor: item?.badgeColor }}
                    className={`text-xs font-semibold p-2 text-center uppercase rounded text-[#CBD5E1]`}
                  >
                    {item?.badgeTitle}
                  </span>
                ))}
                {banner?.eventLocation && 
                <div className="flex gap-2">
                  <Image src={locIcon} alt="location" width={20} height={20} />
                  <span className="text-xs lg:text-lg font-medium">{banner?.eventLocation}</span>
                </div>
                }
              </div>
              <PortableText
                value={banner?.bannerHeading}
                components={headingComponents}
              />
              <PortableText
                value={banner?.eventDescription}
                components={descriptionComponents}
              />
            </div>

            <Link href={banner?.ctaBtnTextLink} target="_blank">
              <button
                style={{
                  backgroundColor: banner?.ctaBtnColor,
                  color: banner?.ctaBtnTextColor,
                }}
                className={` font-bold text-sm h-11 w-40 rounded bg-white text-[#1E293B]`}
              >
                {" "}
                {banner?.ctaBtnTextForEvent}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
