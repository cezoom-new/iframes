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
  const fullName = searchParams.get("name");
  const phoneNumber = searchParams.get("phone");
  const designation = searchParams.get("role");

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
    <div className="bg-slate-300 p-6">
      <table className="border border-gray-800 mb-4">
        <tbody>
          <tr>
            <td className="p-2">Name</td>
            <td className="p-2">{fullName}</td>
          </tr>
          <tr>
            <td className="p-2">Designation</td>
            <td className="p-2">{designation}</td>
          </tr>
          <tr>
            <td className="p-2">Phone</td>
            <td className="p-2">{phoneNumber}</td>
          </tr>
          <tr>
            <td className="p-2">Email</td>
            <td className="p-2">{emailId}</td>
          </tr>
          <tr>
            <td className="p-2">Logo</td>
            <td className="p-2">
              <img src="https://cdn.sanity.io/images/bgk0i4de/dev/e0646e05f8a50f0eee9e377c67e8287828b65a7a-199x24.svg" />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Hidden container to hold the HTML we want to copy */}
      <div ref={hiddenDivRef} style={{ display: "none" }}>
        <a
          href={
            props.link +
            `?email=${emailId}&name=${fullName}&phone=${phoneNumber}&role=${designation}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              props.redirectUrl +
              `?email=${emailId}&name=${fullName}&phone=${phoneNumber}&role=${designation}`
            }
            alt="Email Signature Image"
            style={{ border: "none" }}
          />
        </a>
      </div>
      <div>
        <button className="bg-green-600 p-2 rounded-md" onClick={copyToClipboard}>
          Copy Signature
        </button>
        <span className="pl-4">{copySuccess}</span>
      </div>
      {/* Preview of the email signature */}
      <div className="w-1/2 h-1/2">
        <a
          href={
            props.link +
            `?email=${emailId}&name=${fullName}&phone=${phoneNumber}&role=${designation}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              props.redirectUrl +
              `?email=${emailId}&name=${fullName}&phone=${phoneNumber}&role=${designation}`
            }
            alt="Email Signature Image"
            style={{ border: "none" }}
          />
        </a>
      </div>
    </div>
  );
}
