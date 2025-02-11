import React, { Children, useState } from "react";
import { PortableText } from "next-sanity";
import { CloseIcon } from "@sanity/icons";

import CookieCTAButton from "../cookieCTABtn";
import Anchor from "../anchor/anchor";

export interface IBannerInterface {
  className: string;
  bannerText?: string;
  bannerHeading?: string;
  registerBtnText?: string;
}

const customComponents: any = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-sm font-normal">{children}</p>
    ),
  },
  marks: {
    highlight: ({ children, value }: any) => (
      <span style={{ color: value.value }}>{children}</span>
    ),
    strong: ({ children }: any) => (
      <span className="md:text-2xl text-lg font-semibold">{children}</span>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="text-gray-500 underline text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    table: (props:any) => {
      const rows = props.value?.rows || [];      

      return (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
            {rows[0]?.cells?.map((cell:any, idx:number) => (
                <th className="border border-[#6ab1bd] px-4 py-2 text-left" key={idx}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row:any, idx:number) => (
              <tr key={idx}>
                {row?.cells?.map((cell:any, i:number) => (
                  <td className="border border-[#6ab1bd] px-4 py-2 text-left" key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },
};

export default function CookieShow({ cookie, campaign }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const closeDrawer = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        className={`flex text-white w-full absolute top-0 ${isVisible ? "block" : "hidden"}`}
        style={{
          backgroundColor: cookie?.backgroundColorGradient,
        }}
      >
        <div
          style={{
            backgroundColor: cookie?.backgroundColorGradient,
          }}
          className={`flex text-white px-12 py-6 gap-6 max-w-7xl m-auto text-sm justify-center`}
        >
          <div className="flex justify-center max-w-2xl text-[#c4e2e8]">
            <PortableText value={cookie?.content} />
          </div>
          <div className="flex gap-6 justify-center items-center">
            {cookie?.ctaBtn?.ctaBtnText && (
              <CookieCTAButton
                ctaText={cookie?.ctaBtn?.ctaBtnText}
                cookieMode={true}
                toggleDrawer={closeDrawer}
                campaignName={campaign?.name}
              />
            )}
            {cookie?.secondaryCtaBtn?.secondaryBtnText && (
              <CookieCTAButton
                ctaText={cookie?.secondaryCtaBtn?.secondaryBtnText}
                cookieMode={false}
                toggleDrawer={toggleDrawer}
                campaignName={campaign?.name}
              />
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#1e8fa3",
          height: "calc(100% - 88px)",
        }}
        className={`fixed overflow-auto bottom-0 left-0 right-0 shadow-lg transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        } z-20`}
      >
        <Anchor onHandleClick={toggleDrawer}
          className="absolute top-4 right-4 text-white">
        <CloseIcon style={{ color: '#fff', fontSize: '36px' }} />
        </Anchor>
        <div className="py-8 px-2 text-white max-w-7xl m-auto">
          <PortableText
            value={cookie?.cookiesDetail}
            components={customComponents}
          />
        </div>
      </div>
    </>
  );
}
