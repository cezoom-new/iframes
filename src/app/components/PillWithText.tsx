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
        <div className="flex items-center gap-2 text-sm mt-6">
         {eventType && (
            <div
              className="font-medium px-2.5 py-1.5 rounded uppercase text-white"
              style={{ backgroundColor: "#FFFFFF29" }}
            >
              {eventType}
            </div>
          )}
         {templateHeader && (
            <h2 className="text-white font-normal text-lg">
              {templateHeader}
            </h2>
          )}
        </div>
      )}
    </>
  );
}
