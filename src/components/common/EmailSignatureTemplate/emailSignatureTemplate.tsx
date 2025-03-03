/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";

const copySearchParams = (sourceUrl: string, destUrl: string): string => {
  try {
    if (!destUrl) return "";
    const source = new URL(sourceUrl);
    const dest = new URL(destUrl);
    source.searchParams.forEach((value, key) => {
      dest.searchParams.set(key, value);
    });
    return dest.toString();
  } catch (error) {
    console.error("Invalid URL in copySearchParams:", error);
    return destUrl; 
  }
};

export default function EmailSignatureTemplate(props: {
  link?: string;
  redirectUrl?: string;
}) {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const [updatedLink, setUpdatedLink] = useState<string>("");
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setUpdatedLink(props?.link ? copySearchParams(currentUrl, props.link) : "");
      setUpdatedRedirectUrl(props?.redirectUrl ? copySearchParams(currentUrl, props.redirectUrl) : "");
    }
  }, [props.link, props.redirectUrl]); 

  const copyToClipboard = async () => {
    if (hiddenDivRef.current) {
      const htmlToCopy = hiddenDivRef.current.innerHTML;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([htmlToCopy], { type: "text/html" }),
          }),
        ]);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 3000);
      } catch (err) {
        console.error("Failed to copy:", err);
        setCopySuccess("Failed to copy");
      }
    }
  };

  return (
    <div className="p-6 justify-items-center h-screen flex flex-col items-center justify-center">
      {/* Hidden container to hold the HTML we want to copy */}
      <div ref={hiddenDivRef} style={{ display: "none" }}>
        {updatedLink && updatedRedirectUrl ? (
          <a href={updatedLink} target="_blank" rel="noopener noreferrer">
            <img src={updatedRedirectUrl} alt="Email Signature Image" style={{ border: "none" }} />
          </a>
        ) : (
          <p>Invalid link</p>
        )}
      </div>

      {/* Preview of the email signature */}
      <div className="w-2/3">
        {updatedLink && updatedRedirectUrl ? (
          <a href={updatedLink} target="_blank" rel="noopener noreferrer">
            <img src={updatedRedirectUrl} alt="Email Signature Image" style={{ border: "none" }} />
          </a>
        ) : (
          <p>Invalid link</p>
        )}
      </div>

      <div className="flex pt-6 gap-3 flex-col relative">
        <button className="bg-green-600 p-2 rounded-md text-white" onClick={copyToClipboard}>
          Copy Signature
        </button>
        <div className="flex w-full absolute -bottom-8 text-center justify-center">{copySuccess}</div>
      </div>
    </div>
  );
}
