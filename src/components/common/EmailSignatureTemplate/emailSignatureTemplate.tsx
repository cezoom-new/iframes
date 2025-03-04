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
                 
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODMiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA4MyAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkxvZ28iPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNMzEuMzQ1NyAwLjE3MTg3NUgzOC44MTA1TDM4LjU5NjkgMS4zOTcyM0MzOC41Mjg4IDEuOTM3MTMgMzguMDczNCAyLjM1OTY3IDM3LjUxNyAyLjM2MjAySDMwLjkyNzhDMzAuNDM5NiAyLjM3NjEgMzAuMDM1OCAyLjcwNzA5IDI5LjkwOTEgMy4xNTc3OUwzMC4wNDc2IDIuMzYyMDJMMzAuMjY1OSAxLjEyOTYyQzMwLjMzMTYgMC41ODk3MTUgMzAuNzg3IDAuMTcxODc1IDMxLjM0NTcgMC4xNzE4NzVaIiBmaWxsPSIjNDJCQTc4Ii8+CjxwYXRoIGlkPSJWZWN0b3JfMiIgZD0iTTkuMTc2MDYgMS41NzI3Nkw3LjQ0MzY2IDMuMjM5NDNDNy4wNjMzOCAyLjU5NjIzIDYuNDQ2MDEgMi4yODE2OCA1LjU2NTczIDIuMjgxNjhDMy42NjE5NyAyLjI4MTY4IDIuNTMyODYgMy41NTM5OCAyLjUzMjg2IDUuNjU0OTJDMi41MzI4NiA2Ljk1NTM5IDMuMzMzMzMgNy43MzAwNCA0LjUyODE3IDcuNzMwMDRDNS4zODAyOCA3LjczMDA0IDYuMTI5MTEgNy40MTU0OCA2Ljc2MDU2IDYuNzg0MDNMOC4wOTg1OSA4Ljc2NTI1QzcuMTI2NzYgOS41OTE1NCA1Ljg5NDM3IDkuOTk5OTkgNC4zODI2MyA5Ljk5OTk5QzMuMDMwNTIgOS45OTk5OSAxLjk2NzE0IDkuNjE5NzEgMS4xODA3NSA4Ljg1OTE1QzAuMzk0MzY2IDguMDg0NSAwIDcuMDYxMDIgMCA1Ljc4NjM4QzAgNC4yMjUzNCAwLjU1MTY0MyAyLjg3MzIzIDEuNjY2NjcgMS43MzAwNEMyLjc4MTY5IDAuNTg2ODQ0IDQuMTIyMDcgMC4wMTE3MjcgNS43MDg5MiAwLjAxMTcyN0M3LjM0MDM4IDAuMDA5Mzc5NTYgOC4yODQwNCAwLjUwOTM4IDkuMTc2MDYgMS41NzI3NloiIGZpbGw9IiM0MkJBNzgiLz4KPHBhdGggaWQ9IlZlY3Rvcl8zIiBkPSJNMjUuMzU1MyAwLjE3MTc4MUMyNi4yNDczIDAuMTcxNzgxIDI2Ljk5NjIgMC40MzQ2OTIgMjcuNTk5NSAwLjk1ODE2NkMyOC4yMTY4IDEuNDgzOTkgMjguNTE3MyAyLjE2NzA5IDI4LjUxNzMgMy4wMDUxMkMyOC41MTczIDQuNDYyODYgMjcuNjY1MiA1LjY0MzYxIDI2LjM2NDcgNi4yMjEwOEwyNy44MzQyIDkuODE3MzJIMjUuMTU1OEwyMy44ODM1IDYuNjE1NDRIMjIuNzQyNkwyMi4xNzkzIDkuODE3MzJIMTkuNjg0TDIxLjM3NjQgMC4xNjk0MzRIMjUuMzU1M1YwLjE3MTc4MVpNMjMuNTAzMiAyLjMxMDI4TDIzLjEwODggNC40NzY5NUgyNC42MDQxQzI1LjM1MyA0LjQ3Njk1IDI1Ljk3MDMgMy45NjUyMSAyNS45NzAzIDMuMTc2NDhDMjUuOTcwMyAyLjYzODkyIDI1LjU5MDEgMi4zMTAyOCAyNC45OTg1IDIuMzEwMjhIMjMuNTAzMloiIGZpbGw9IiM0MkJBNzgiLz4KPHBhdGggaWQ9IlZlY3Rvcl80IiBkPSJNNDcuMDE4NiAxLjEyOTExTDQ1LjQ2OTMgMy4wMDcwNEM0NC45NTc1IDIuNTIxMTMgNDQuMjYwNCAyLjI3MjMgNDMuNDA4MyAyLjI3MjNDNDIuNjU5NCAyLjI3MjMgNDIuMTIxOSAyLjUwOTM5IDQyLjEyMTkgMy4wMjExM0M0Mi4xMjE5IDMuMzg3MzIgNDIuNDM2NCAzLjU5ODU5IDQzLjUyNTYgMy44MDc1MUM0NS42MTI1IDQuMjEzNjEgNDYuMzg3MSA1LjEwNzk4IDQ2LjM4NzEgNi41MTE3NEM0Ni4zODcxIDguOTc4ODcgNDQuMjg2MiA5Ljk5MDYxIDQyLjE3MzUgOS45OTA2MUM0MC41NTg1IDkuOTkwNjEgMzkuMjk3OSA5LjUxODc4IDM4LjM5NDIgOC41NzI3N0wzOS45NDM1IDYuNjY5MDFDNDAuMTgwNiA2Ljk5NzY1IDQwLjUyMDkgNy4yNDY0OCA0MC45ODEgNy40NDM2NkM0MS40NDExIDcuNjI2NzYgNDEuOTEyOSA3LjcxODMxIDQyLjM3MyA3LjcxODMxQzQzLjMzMDggNy43MTgzMSA0My44MTY3IDcuNDU1NCA0My44MTY3IDYuOTQzNjZDNDMuODE2NyA2LjU2MzM4IDQzLjQ4ODEgNi4zNTQ0NiA0Mi4zNzMgNi4xMjkxMUM0MC41MjMzIDUuNzQ4ODMgMzkuNjAzMSA0Ljg1NjgxIDM5LjYwMzEgMy40Mzg5N0MzOS42MDMxIDIuNDU1NCAzOS45NzE2IDEuNjI2NzYgNDAuNzA2NCAwLjk4MzU2OEM0MS40NTI5IDAuMzI4NjM5IDQyLjM4NDggMCA0My41MjU2IDBDNDUuMDA5MiAwIDQ2LjE2NDEgMC4zODAyODIgNDcuMDE4NiAxLjEyOTExWiIgZmlsbD0iIzA1NDA2QiIvPgo8cGF0aCBpZD0iVmVjdG9yXzUiIGQ9Ik01Ni4zNzA5IDAuMTcwODk4TDU1Ljk5MDYgMi4zNjMzOUg1My4wNDkzTDUxLjczNzEgOS44MTg3OUg0OS4yNDE4TDUwLjU1NCAyLjM2MzM5SDQ3LjYxMjdMNDcuOTkzIDAuMTcwODk4SDU2LjM3MDlaIiBmaWxsPSIjMDU0MDZCIi8+CjxwYXRoIGlkPSJWZWN0b3JfNiIgZD0iTTczLjEwODQgMS41NjEwM0w3MS4zNzYgMy4yMjc3QzcwLjk5NTggMi41ODQ1MSA3MC4zNzg0IDIuMjY5OTUgNjkuNDk4MSAyLjI2OTk1QzY3LjU5NDMgMi4yNjk5NSA2Ni40NjUyIDMuNTQyMjUgNjYuNDY1MiA1LjY0MzE5QzY2LjQ2NTIgNi45NDM2NiA2Ny4yNjU3IDcuNzE4MzEgNjguNDYwNSA3LjcxODMxQzY5LjMxMjcgNy43MTgzMSA3MC4wNjE1IDcuNDAzNzYgNzAuNjkyOSA2Ljc3MjNMNzIuMDMxIDguNzUzNTJDNzEuMDU5MSA5LjU3OTgxIDY5LjgyNjcgOS45ODgyNiA2OC4zMTUgOS45ODgyNkM2Ni45NjI5IDkuOTg4MjYgNjUuODk5NSA5LjYwNzk4IDY1LjExMzEgOC44NDc0MkM2NC4zMjY3IDguMDcyNzcgNjMuOTMyNCA3LjA0OTMgNjMuOTMyNCA1Ljc3NDY1QzYzLjkzMjQgNC4yMTM2MiA2NC40ODQgMi44NjE1IDY1LjU5OSAxLjcxODMxQzY2LjcxNDEgMC41Nzc0NjUgNjguMDU0NCAwIDY5LjY0MzYgMEM3MS4yNzA0IDAgNzIuMjE2NCAwLjQ5NzY1MyA3My4xMDg0IDEuNTYxMDNaIiBmaWxsPSIjMDU0MDZCIi8+CjxwYXRoIGlkPSJWZWN0b3JfNyIgZD0iTTc4LjA5MzYgNC43MDg0Nkw4Mi43MzQ0IDAuMTcwODk4SDc5Ljc4ODRMNzYuMTkyMiAzLjY5NDM3TDc2LjgxMTkgMC4xNzA4OThINzQuMzM3N0w3Mi42MzgyIDkuODE2NDRINzUuMTE0N0w3NS42NDA1IDYuODM5OTFMNzYuMTY2NCA2LjMyMTEzTDc4LjM0MjQgOS44MTY0NEg4MS4yNzY3TDc4LjA5MzYgNC43MDg0NloiIGZpbGw9IiMwNTQwNkIiLz4KPHBhdGggaWQ9IlZlY3Rvcl84IiBkPSJNMzAuNjkwNSAzLjg5OTA1SDM4LjE1NTNMMzcuOTQxNyA1LjEyNDRDMzcuODczNiA1LjY2NDMxIDM3LjQxODIgNi4wODY4NCAzNi44NjE5IDYuMDg5MTlIMzAuMjcyN0MyOS43ODQ0IDYuMTAzMjcgMjkuMzgwNyA2LjQzNDI2IDI5LjI1MzkgNi44ODQ5NkwyOS4zOTI0IDYuMDg5MTlMMjkuNjEwNyA0Ljg1Njc5QzI5LjY3NjQgNC4zMTY4OSAzMC4xMzE4IDMuODk5MDUgMzAuNjkwNSAzLjg5OTA1WiIgZmlsbD0iIzQyQkE3OCIvPgo8cGF0aCBpZD0iVmVjdG9yXzkiIGQ9Ik0yOC43MzU0IDkuODE3MDlMMjguOTUzNyA4LjU4NDdDMjkuMDIxNyA4LjA0NDc5IDI5LjQ3NzEgNy42MjY5NSAzMC4wMzU4IDcuNjI2OTVIMzcuNTAwNkwzNy4yODcgOC44NTIzQzM3LjIxODkgOS4zOTIyMSAzNi43NjM1IDkuODE0NzUgMzYuMjA3MiA5LjgxNzA5SDI4LjczNTRaIiBmaWxsPSIjNDJCQTc4Ii8+CjxwYXRoIGlkPSJWZWN0b3JfMTAiIGQ9Ik0xOC45NTAxIDkuODIxMjZMMTYuMjg1OCAzLjUwOTA1TDE0Ljg3NzQgMC4xNzEwMjFMMTMuODcyNyAxLjY4MDQxTDguNDU0ODMgOS44MTY1NlY5LjgxODkxSDEwLjk1MDFWOS44MTY1NkgxMS40MDU1TDE0LjM5MTUgNS4zMzUzNEwxNi4yODM1IDkuODE4OTFMMTguOTUwMSA5LjgyMTI2WiIgZmlsbD0iIzQyQkE3OCIvPgo8cGF0aCBpZD0iVmVjdG9yXzExIiBkPSJNNjMuODY4IDkuNjUwMjRMNjEuMjAxMyAzLjMzODAzTDU5Ljc5NTIgMEw1OC43ODgyIDEuNTA5MzlMNTMuMzcwNCA5LjY0NTU0VjkuNjQ3ODlINTUuODY1N1Y5LjY0NTU0SDU2LjMyMzRMNTkuMzA3IDUuMTY0MzJMNjEuMTk5IDkuNjQ3ODlMNjMuODY4IDkuNjUwMjRaIiBmaWxsPSIjMDU0MDZCIi8+CjwvZz4KPC9zdmc+Cg==" />
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
      {formFields.map((field:any) => (
        <label key={field.key}>
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
