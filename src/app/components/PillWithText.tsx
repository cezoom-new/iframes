import { formatDateChange, formatShortDateChange } from "@/utils/page";
import Image from "next/image";
import React from "react";

interface ICampaignHeader {
  logoUrl: string;
  templateHeader: string;
  eventType: string;
}

export default function PillElementWithText({
  templateHeader,
  eventType,
}: ICampaignHeader) {
  return (
    <>
      {(templateHeader || eventType) && (
        <div className="flex items-center gap-4  mb-6">
         {eventType && (
            <div
              className="font-medium px-2.5 py-1 rounded uppercase text-white leading-[150%] text-sm"
              style={{ backgroundColor: "#FFFFFF29" }}
            >
              {eventType}
            </div>
          )}
         {templateHeader && (
            <h2 className="text-white font-normal text-[20px] leading-[120%]">
              {templateHeader}
            </h2>
          )}
        </div>
      )}
    </>
  );
}
