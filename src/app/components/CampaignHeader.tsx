import { formatDateChange, formatShortDateChange } from "@/utils/page";
import Image from "next/image";
import React from "react";

interface ICampaignHeader {
  logoUrl: string;
  templateHeader: string;
  eventType: string;
  eventDate: string;
  eventLocation:string;
}

export default function CampaignHeader({
  logoUrl,
  templateHeader,
  eventType,
  eventDate,
  eventLocation
}: ICampaignHeader) {
  return (
    <>
      {(templateHeader || eventType || eventDate) && (
        <div className="flex items-center gap-2 text-sm mt-6">
          {templateHeader && (
            <h2 className="text-green-700 font-semibold uppercase">
              {templateHeader}
            </h2>
          )}
          {eventType && (
            <button
              className="font-medium px-2.5 py-1.5 rounded uppercase"
              style={{ backgroundColor: "#FFFFFF29" }}
            >
              {eventType}
            </button>
          )}
          {eventDate && (
            <button
              className="font-medium px-2.5 py-1.5 rounded uppercase"
            >
              {eventDate.replace(/\s*\|\s*/g, "   |   ")} {eventLocation? "  |  " : ""}  {eventLocation}
            </button>
          )}
        </div>
      )}
    </>
  );
}
