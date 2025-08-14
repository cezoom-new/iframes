// components/CheckIcon.tsx
import React from "react";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const DeleteIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M2.5 4H14.5"
        stroke="#EF4444"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1666 4V13.3333C13.1666 14 12.4999 14.6667 11.8333 14.6667H5.16659C4.49992 14.6667 3.83325 14 3.83325 13.3333V4"
        stroke="#EF4444"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83325 3.99992V2.66659C5.83325 1.99992 6.49992 1.33325 7.16659 1.33325H9.83325C10.4999 1.33325 11.1666 1.99992 11.1666 2.66659V3.99992"
        stroke="#EF4444"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.16675 7.33325V11.3333"
        stroke="#EF4444"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.83325 7.33325V11.3333"
        stroke="#EF4444"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
