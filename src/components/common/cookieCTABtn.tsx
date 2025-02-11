import { PortableText } from "next-sanity";
import React, { useState } from "react";
import Anchor from "./anchor/anchor";

export interface CtaBtnProps {
  ctaText: string;
  cookieMode: boolean;
  toggleDrawer?: any;
  campaignName:string;
}

export default function CookieCTAButton({
  ctaText,
  cookieMode,
  toggleDrawer,
  campaignName
}: CtaBtnProps) {
  return (
    <>
      <Anchor
        className={`font-semibold w-28 md:text-sm text-center py-2 px-4 rounded-lg  ${cookieMode ? "text-white bg-[#1e8fa3]" : "text-white bg-transparent border  !border-[#1e8fa3]"}`}
        onHandleClick={toggleDrawer}
        campaignName={campaignName}
      >
        {ctaText}
      </Anchor>
    </>
  );
}
