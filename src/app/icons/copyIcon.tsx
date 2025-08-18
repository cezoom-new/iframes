// components/CopyIcon.tsx
import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const CopyIcon: React.FC<Props> = ({
  width = 16,
  height = 16,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_162_123)">
        <path
          d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
          stroke={color}
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 9.99992H2.66659C2.31296 9.99992 1.97382 9.85944 1.72378 9.60939C1.47373 9.35935 1.33325 9.02021 1.33325 8.66659V2.66659C1.33325 2.31296 1.47373 1.97382 1.72378 1.72378C1.97382 1.47373 2.31296 1.33325 2.66659 1.33325H8.66659C9.02021 1.33325 9.35935 1.47373 9.60939 1.72378C9.85944 1.97382 9.99992 2.31296 9.99992 2.66659V3.33325"
          stroke={color}
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_162_123">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CopyIcon;
