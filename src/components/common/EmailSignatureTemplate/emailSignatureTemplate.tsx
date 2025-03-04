/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

  const searchParams = useSearchParams();
  const emailId = searchParams.get("email");
  const fullName = searchParams.get("name");
  const phoneNumber = searchParams.get("phone");
  const designation = searchParams.get("role");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setUpdatedLink(
        props?.link ? copySearchParams(currentUrl, props.link) : ""
      );

      if (props?.redirectUrl) {
        const encodedRedirectUrl = copySearchParams(
          currentUrl,
          props.redirectUrl
        );
        setUpdatedRedirectUrl(encodeURI(encodedRedirectUrl)); // Ensure it's properly encoded
      } else {
        setUpdatedRedirectUrl("");
      }
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
          <Link href={updatedLink} target="_blank" rel="noopener noreferrer">
            <table border={1} cellPadding={5} cellSpacing={0}>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    {" "}
                    <b>{fullName}</b>
                    <br />
                    {designation}
                    <br />
                    <img src="https://cdn.sanity.io/images/bgk0i4de/dev/abb19b7036ad3bdfe699063717831052bc8952d9-83x10.svg" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1.875 2.25C1.57663 2.25 1.29048 2.36853 1.0795 2.5795C0.868526 2.79048 0.75 3.07663 0.75 3.375V3.96975C0.7695 3.9765 0.78825 3.98475 0.807 3.99375L5.7555 6.3825C5.91 6.4575 6.09 6.4575 6.2445 6.3825L11.193 3.99375C11.2115 3.98472 11.2306 3.97671 11.25 3.96975V3.375C11.25 3.07663 11.1315 2.79048 10.9205 2.5795C10.7095 2.36853 10.4234 2.25 10.125 2.25H1.875Z"
                        fill="#334155"
                      />
                      <path
                        d="M11.25 5.21545L6.7335 7.39495C6.50474 7.50536 6.25401 7.56271 6 7.56271C5.74599 7.56271 5.49526 7.50536 5.2665 7.39495L0.75 5.21545V8.62495C0.75 8.92332 0.868526 9.20947 1.0795 9.42045C1.29048 9.63143 1.57663 9.74995 1.875 9.74995H10.125C10.4234 9.74995 10.7095 9.63143 10.9205 9.42045C11.1315 9.20947 11.25 8.92332 11.25 8.62495V5.21545Z"
                        fill="#334155"
                      />
                    </svg>
                    {emailId}
                  </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.89125 5.4645L3.6915 5.064C3.83358 4.9931 3.94949 4.87894 4.02254 4.73796C4.09559 4.59698 4.12201 4.43646 4.098 4.2795L3.768 2.136C3.74078 1.95897 3.6511 1.79754 3.51519 1.68088C3.37928 1.56423 3.20611 1.50007 3.027 1.5H2.25C2.05109 1.5 1.86032 1.57902 1.71967 1.71967C1.57902 1.86032 1.5 2.05109 1.5 2.25V3.75C1.5 4.28175 1.5615 4.8 1.6785 5.2965C1.96692 6.51806 2.58978 7.63518 3.4773 8.5227C4.36482 9.41022 5.48194 10.0331 6.7035 10.3215C7.21042 10.4403 7.72935 10.5002 8.25 10.5H9.75C9.94891 10.5 10.1397 10.421 10.2803 10.2803C10.421 10.1397 10.5 9.94891 10.5 9.75V8.973C10.4999 8.79389 10.4358 8.62072 10.3191 8.48481C10.2025 8.3489 10.041 8.25922 9.864 8.232L7.7205 7.902C7.56354 7.87799 7.40302 7.90441 7.26204 7.97746C7.12105 8.05051 7.0069 8.16642 6.936 8.3085L6.5355 9.10875C5.68206 8.83467 4.90625 8.36112 4.27235 7.72736C3.63846 7.0936 3.1655 6.31788 2.89125 5.4645Z"
                        fill="#334155"
                      />
                    </svg>
                    {phoneNumber}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <img
                      src={updatedRedirectUrl}
                      alt="Email Signature Image"
                      style={{ border: "none" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      {/* Preview of the email signature */}
      <div className="w-2/3">
        {updatedLink && updatedRedirectUrl ? (
          <Link href={updatedLink} target="_blank" rel="noopener noreferrer">
            <table border={1} cellPadding={5} cellSpacing={0}>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    {" "}
                    <b>{fullName}</b>
                    <br />
                    {designation}
                    <br />
                    <img src="https://cdn.sanity.io/images/bgk0i4de/dev/abb19b7036ad3bdfe699063717831052bc8952d9-83x10.svg" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1.875 2.25C1.57663 2.25 1.29048 2.36853 1.0795 2.5795C0.868526 2.79048 0.75 3.07663 0.75 3.375V3.96975C0.7695 3.9765 0.78825 3.98475 0.807 3.99375L5.7555 6.3825C5.91 6.4575 6.09 6.4575 6.2445 6.3825L11.193 3.99375C11.2115 3.98472 11.2306 3.97671 11.25 3.96975V3.375C11.25 3.07663 11.1315 2.79048 10.9205 2.5795C10.7095 2.36853 10.4234 2.25 10.125 2.25H1.875Z"
                        fill="#334155"
                      />
                      <path
                        d="M11.25 5.21545L6.7335 7.39495C6.50474 7.50536 6.25401 7.56271 6 7.56271C5.74599 7.56271 5.49526 7.50536 5.2665 7.39495L0.75 5.21545V8.62495C0.75 8.92332 0.868526 9.20947 1.0795 9.42045C1.29048 9.63143 1.57663 9.74995 1.875 9.74995H10.125C10.4234 9.74995 10.7095 9.63143 10.9205 9.42045C11.1315 9.20947 11.25 8.92332 11.25 8.62495V5.21545Z"
                        fill="#334155"
                      />
                    </svg>
                    {emailId}
                  </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.89125 5.4645L3.6915 5.064C3.83358 4.9931 3.94949 4.87894 4.02254 4.73796C4.09559 4.59698 4.12201 4.43646 4.098 4.2795L3.768 2.136C3.74078 1.95897 3.6511 1.79754 3.51519 1.68088C3.37928 1.56423 3.20611 1.50007 3.027 1.5H2.25C2.05109 1.5 1.86032 1.57902 1.71967 1.71967C1.57902 1.86032 1.5 2.05109 1.5 2.25V3.75C1.5 4.28175 1.5615 4.8 1.6785 5.2965C1.96692 6.51806 2.58978 7.63518 3.4773 8.5227C4.36482 9.41022 5.48194 10.0331 6.7035 10.3215C7.21042 10.4403 7.72935 10.5002 8.25 10.5H9.75C9.94891 10.5 10.1397 10.421 10.2803 10.2803C10.421 10.1397 10.5 9.94891 10.5 9.75V8.973C10.4999 8.79389 10.4358 8.62072 10.3191 8.48481C10.2025 8.3489 10.041 8.25922 9.864 8.232L7.7205 7.902C7.56354 7.87799 7.40302 7.90441 7.26204 7.97746C7.12105 8.05051 7.0069 8.16642 6.936 8.3085L6.5355 9.10875C5.68206 8.83467 4.90625 8.36112 4.27235 7.72736C3.63846 7.0936 3.1655 6.31788 2.89125 5.4645Z"
                        fill="#334155"
                      />
                    </svg>
                    {phoneNumber}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <img
                      src={updatedRedirectUrl}
                      alt="Email Signature Image"
                      style={{ border: "none" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      <div className="flex pt-6 gap-3 flex-col relative">
        <button
          className="bg-green-600 p-2 rounded-md text-white"
          onClick={copyToClipboard}
        >
          Copy Signature
        </button>
        <div className="flex w-full absolute -bottom-8 text-center justify-center">
          {copySuccess}
        </div>
      </div>
    </div>
  );
}
