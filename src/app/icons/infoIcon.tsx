// components/CheckIcon.tsx
import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const infoIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
}) => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clipPath="url(#clip0_99_245)">
    <path d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z" stroke="#0F172A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10.6667V8" stroke="#0F172A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 5.33325H8.00667" stroke="#0F172A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_99_245">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
  );
};

export default infoIcon;
