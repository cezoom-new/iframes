import React, { CSSProperties, ReactNode } from "react";
type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string | undefined;
  bgColor?: string;
  bgImage?: string;
};

export default function Section(props: Props) {
  return (
    <section
      id={props?.id}
      style={{
        background: `
        ${props?.bgImage ? `url(${props.bgImage}) center center / cover no-repeat` : ''}
        ${props?.bgImage && props?.bgColor ? ',' : ''}
        ${props?.bgColor || ''}
      `.trim(),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
      }}
      className={`w-full flex flex-col min-h-screen justify-center relative ${props.className}`}
    >
      {props.children}
    </section>
  );
}
