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

  const [urls, setUrls] = useState<any>({
    websiteUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    instagramUrl: "",
  });

  const formFields = [
    {
      label: "Name",
      placeholder: "Enter Name",
    },
    {
      label: "Website",
      key: "websiteUrl",
      placeholder: "Enter website URL",
    },
    {
      label: "LinkedIn",
      key: "linkedinUrl",
      placeholder: "Enter LinkedIn URL",
    },
    {
      label: "Twitter",
      key: "twitterUrl",
      placeholder: "Enter Twitter URL",
    },
    {
      label: "YouTube",
      key: "youtubeUrl",
      placeholder: "Enter YouTube URL",
    },
    {
      label: "Instagram",
      key: "instagramUrl",
      placeholder: "Enter Instagram URL",
    },
  ];

  const transformUrl = (url: string, key: string) => {
    const cleanUrl = url.replace(/^https?:\/\//, "");
  
    setUrls((prevUrls:any) => ({
      ...prevUrls,
      [key]: `https://${cleanUrl}`,
    }));
  };
 

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

  const handleInputChange = (key:any, value:any) => {
    setUrls((prevUrls:any) => ({
      ...prevUrls,
      [key]: transformUrl(value,key)
    }));
  };


  const copyToClipboard = async () => {
    if (!hiddenDivRef.current) return;
  
    const htmlToCopy = hiddenDivRef.current.innerHTML.trim(); // Trim to avoid duplicate spacing
  
    try {
      const clipboardItem = new ClipboardItem({
        "text/html": new Blob([htmlToCopy], { type: "text/html" }),
      });
  
      await navigator.clipboard.write([clipboardItem]);
  
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess("Failed to copy");
    }
  };
  
  const instagramBase64 =
    "https://cdn.sanity.io/images/bgk0i4de/dev/a07728c329a140c9149c40f6840c137354d4fbc5-48x48.png";
  const youtubeBase64 =
    "https://cdn.sanity.io/images/bgk0i4de/dev/b39c3b31e591f0f2e99bf4fa74d0005aa7317fc7-48x48.png";
  const twitterBase64 =
    "https://cdn.sanity.io/images/bgk0i4de/dev/3f4d11881d7e0a853004d8eb22386b95fc1d4941-12x12.png";
  const linkedinIconBase64 =
    "https://cdn.sanity.io/images/bgk0i4de/dev/14f26847b7d0ea012c56f7af156debda9aaf313d-13x12.png";
  const websiteIconBase64 ="https://cdn.sanity.io/images/bgk0i4de/dev/612de8a32ca89ad42bbe30cf3219f76b53c6272c-12x12.png";
  const signatureHtml: string = `
  <div>
    ${
      updatedLink && updatedRedirectUrl
        ? `
      <table cellpadding="5" cellspacing="0">
        <tbody>
          <tr>
            <td>
              <b>${fullName}</b>
              <td style="display: flex; ">
              ${urls.websiteUrl ? `<a style="width:20px" href="${urls.websiteUrl}" target="_blank"><img  style="width:16px; height:16px;" src="${websiteIconBase64}" alt="Website" /></a>` : ""}
              ${urls.linkedinUrl ? `<a style="width:20px" href="${urls.linkedinUrl}" target="_blank"><img style="width:16px; height:16px;" src="${linkedinIconBase64}" alt="LinkedIn" /></a>` : ""}
              ${urls.twitterUrl ? `<a style="width:20px" href="${urls.twitterUrl}" target="_blank"><img style="width:16px; height:16px;" src="${twitterBase64}" alt="Twitter" /></a>` : ""}
              ${urls.youtubeUrl ? `<a style="width:20px" href="${urls.youtubeUrl}" target="_blank"><img  style="width:16px; height:16px;" src="${youtubeBase64}" alt="YouTube" /></a>` : ""}
               ${urls.instagramUrl ? `<a style="width:20px" href="${urls.instagramUrl}" target="_blank"><img  style="width:16px; height:16px;" src="${instagramBase64}" alt="YouTube" /></a>` : ""}
            </td>
            </td>
              <tr>
                  <td>${designation}</td>
                </tr>
                     <td>
                 <img src="https://cdn.sanity.io/images/bgk0i4de/dev/e01dc3e25789ddfbb2bea504b1b516beafd2f043-83x10.png"/>
                  </td>

          </tr>
          <tr style="display:flex;">
            <td style="display:flex; gap: 6px; align-items:center;">
              <img style="width:17px; height:17px" src="https://cdn.sanity.io/images/bgk0i4de/dev/09582d3c4b67791813421aecf3cd25ae10039e08-12x12.png" />
              ${emailId}
            </td>
            <td style="display:flex; gap: 6px; align-items:center;">
              <img style="width:17px; height:17px"  src="https://cdn.sanity.io/images/bgk0i4de/dev/0123b006244e3a1f0cce79fe1237dc4912f133b2-12x12.png" />
              ${phoneNumber}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <a href="${updatedLink}" target="_blank" rel="noopener noreferrer">
                <img src="${updatedRedirectUrl}" alt="Email Signature Image" style="border: none; width:200px;" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    `
        : ""
    }
  </div>
`;

  return (
    <div className="flex p-6 justify-center h-screen">
      <div className="w-[400px]">
      {formFields.map((field:any, i) => (
        <label key={`${field.key} + ${i}`}>
          {field.label}
          <input
            type="text"
            value={urls[field.key]}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            style={{
              border: "1px solid #ccc",
              padding: "5px",
              width: "100%",
              marginBottom: "10px",
            }}
          />
        </label>
      ))
      }
   
  

    </div><div className="w-1/2 flex flex-col">
        <div
          ref={hiddenDivRef}
          dangerouslySetInnerHTML={{ __html: signatureHtml }}
        ></div>
        <div className="flex pt-6 gap-3 flex-col relative">
          <button
            className="bg-green-600 p-2 rounded-md text-white"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              copyToClipboard();
            } }
          >
            Copy Signature
          </button>
          <div className="flex w-full absolute -bottom-8 text-center justify-center">
            {copySuccess}
          </div>
        </div>
      </div>
    </div>
  );
}
