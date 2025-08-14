import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  className: string;
  style?: CSSProperties;
  children: ReactNode; // Use ReactNode directly
};

export default function Container(props: Props) {
  return (
    <div
      className={`w-full max-w-6xl m-auto flex justify-self-center ${props.className}`}
      style={props?.style}
    >
      {props.children}
    </div>
  );
}
