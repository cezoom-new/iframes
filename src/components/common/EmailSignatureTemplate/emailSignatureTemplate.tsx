/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

export default function EmailSignatureTemplate(props: {
  link?: string;
  redirectUrl?: string;
}) {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const emailId = searchParams.get("email");

  const copyToClipboard = async () => {
    if (hiddenDivRef.current) {
      // Copy the inner HTML of the hidden div
      const htmlToCopy = hiddenDivRef.current.innerHTML;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([htmlToCopy], { type: "text/html" }),
          }),
        ]);
        setCopySuccess("Copied!");
        // Clear the message after 3 seconds
        setTimeout(() => {
          setCopySuccess("");
        }, 3000);
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
        <a href={props.link + `?email=${emailId}`} target="_blank" rel="noopener noreferrer">
          <img
            src={props.redirectUrl + `?email=${emailId}`}
            alt="Email Signature Image"
            style={{ border: "none" }}
          />
        </a>
      </div>

      {/* Preview of the email signature */}
      <div className="w-2/3">
        <a href={props.link + `?email=${emailId}`} target="_blank" rel="noopener noreferrer">
          <img
            src={props.redirectUrl + `?email=${emailId}`}
            alt="Email Signature Image"
            style={{ border: "none" }}
          />
        </a>
      </div>
      <div className="flex pt-6 gap-3  flex-col relative">
        <button
          className="bg-green-600 p-2 rounded-md text-white"
          onClick={copyToClipboard}
        >
          Copy Signature
        </button>
        <div className="flex w-full absolute -bottom-8 text-center justify-center">{copySuccess}</div>
      </div>
    </div>
  );
}
