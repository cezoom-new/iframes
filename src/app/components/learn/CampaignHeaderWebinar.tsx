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

export default function CampaignHeaderWebinar({
  logoUrl,
  templateHeader,
  eventType,
  eventDate,
  eventLocation
}: ICampaignHeader) {

    const CalenderIcon = () => {return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.75272 2.69754 5.27581 3.04917 4.92417C3.40081 4.57254 3.87772 4.375 4.375 4.375H15.625C16.1223 4.375 16.5992 4.57254 16.9508 4.92417C17.3025 5.27581 17.5 5.75272 17.5 6.25V15.625M2.5 15.625C2.5 16.1223 2.69754 16.5992 3.04917 16.9508C3.40081 17.3025 3.87772 17.5 4.375 17.5H15.625C16.1223 17.5 16.5992 17.3025 16.9508 16.9508C17.3025 16.5992 17.5 16.1223 17.5 15.625M2.5 15.625V9.375C2.5 8.87772 2.69754 8.40081 3.04917 8.04917C3.40081 7.69754 3.87772 7.5 4.375 7.5H15.625C16.1223 7.5 16.5992 7.69754 16.9508 8.04917C17.3025 8.40081 17.5 8.87772 17.5 9.375V15.625"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )};
  return (
    <>
      {(templateHeader || eventType || eventDate) && (
        <div className="flex items-center gap-2 text-sm mb-6">
          {templateHeader && (
            <h2 className="text-green-700 font-semibold uppercase">
              {templateHeader}
            </h2>
          )}
          {eventType && (
            <div
              className="font-medium px-2.5 py-1.5 rounded uppercase"
              style={{ backgroundColor: "#FFFFFF29" }}
            >
              {eventType}
            </div>
          )}
          {eventDate && (
            <div
              className="text-white flex flex-row text-[18px] font-manrope font-medium gap-3"
            >
             <CalenderIcon/> <span>{eventDate.replace(/\s*\|\s*/g, "\u00A0 |  \u00A0")}</span>
 <span> {eventLocation? "  |  " : ""} </span>  {eventLocation}
            </div>
          )}
        </div>
      )}
    </>
  );
}
