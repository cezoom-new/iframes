"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

const mergeUrls = (baseUrl:string, extraUrl:string) => {
  const base = new URL(baseUrl);
  const extra = new URL(extraUrl);

  // Get the email parameter from the extra URL
  const email = extra.searchParams.get("email");

  if (email) {
      // Append the email parameter to the base URL
      base.searchParams.set("email", email);
  }

  return base.toString();
}


export default function EmailSignatureTemplate(props: {
  link?: string;
  redirectUrl?: string;
}) {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const [updatedLink, setUpdatedLink] = useState<string>("");
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState<string>("");

  const searchParams = useSearchParams();

  function ensureHttps(url:any) {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

  const emailId = searchParams.get("email");
  const fullName = searchParams.get("name");
  const phoneNumber = searchParams.get("phone");
  const role = searchParams.get("role");

  const [urls, setUrls] = useState<any>({
    fullName: fullName,
    emailId: emailId,
    phoneNumber: phoneNumber,
    role: role,
    websiteUrl: "",
    linkedinUrl: "",
    facebook: "",
    youtubeUrl: "",
    instagramUrl: "",
  });


  const formFields = [
    {
      label: "Full Name",
      key: "fullName",
      placeholder: fullName,
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
      placeholder: phoneNumber,
    },
    {
      label: "Role",
      key: "role",
      placeholder: role,
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
      label: "Facebook",
      key: "facebook",
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
    setUrls((prevUrls: any) => ({
      ...prevUrls,
      [key]: url,
    }));
  };



  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      console.log(currentUrl,props.link, props.redirectUrl)
      setUpdatedLink(
        props?.link ? mergeUrls(props.link,currentUrl) : ""
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

  const handleInputChange = (key: any, value: any, label: string) => {
    // const searchParams = [emailId, fullName, phoneNumber, designation];

    const nonUrlField = key.includes(searchParams);
 
      setUrls((prevUrls: any) => ({
        ...prevUrls,
        [key]: value
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

  const signatureHtml: string = `
  <div>
    ${
      updatedLink && updatedRedirectUrl
        ? `
      <table cellpadding="0px" style="border-spacing:0px" cellspacing="0px" width="420px">
        <tbody>
          <tr>
            <td colspan="2">
              <b>${urls.fullName}</b>
             </td>
          </tr>
          <tr>
              <td colspan="2" style="color:#331455;">${urls.role}</td>
          </tr>

          <tr>
              
              <td colspan="2"> 
                <a href="https://carestack.com" target="_blank" rel="noopener noreferrer">
               <img style="width:110px; vertical-align:middle;" src="https://cdn.sanity.io/images/bgk0i4de/dev/561ab8280087f35957078d6c8d51db5b8c479dbc-166x20.png"/>
               </a>
               </td>
          </tr>
          <tr>
            <td width="320px " style="vertical-align:middle; height:24px; text-align:left;">
              <!-- <span>
              <img style="width:17px; height:17px;" src="https://cdn.sanity.io/images/bgk0i4de/dev/736282c23bf20758259b602816fa2f9584a7809d-36x36.png" />
              </span> -->

              <span style="vertical-align:middle; color:#331455; ">
              <a href="mailto:${urls.emailId}">${urls.emailId}</a>
              </span>
             <!-- <span>
              <img style="width:17px; height:17px; vertical-align: middle;"  src="https://cdn.sanity.io/images/bgk0i4de/dev/a3f88c02dde1d35371fbb2fc5c22162e3c98ef40-36x36.png" />
              </span> -->
                 <span style="margin-right:4px; margin-left:4px;">•</span>
              <span style="vertical-align:middle; color:#331455;">
              <a href="tel:${urls.phoneNumber}">${urls.phoneNumber}</a>
              </span>
            </td>
            
          </tr>
          <tr>
               <td colspan="2">
              ${urls.websiteUrl ? `
              <span style="margin-right:4px;"><a href="${ensureHttps(urls.websiteUrl)}" target="_blank">Website</a></span>` : ""}
              ${urls.linkedinUrl ? `<span style="margin-right:4px;"> <a  href="${ensureHttps(urls.linkedinUrl)}" target="_blank">Linkedin</a></span>` : ""}
              ${urls.facebook ? `<span style="margin-right:4px;"> <a href="${ensureHttps(urls.facebook)}" target="_blank">Facebook</a></span>` : ""}
               ${urls.youtubeUrl ? `<span style="margin-right:4px;"> <a href="${ensureHttps(urls.youtubeUrl)}" target="_blank">Youtube</a></span>` : ""}
            </td>
            </tr>
          <tr>
            <td colspan="2">
              <a href="${updatedLink}" target="_blank" rel="noopener noreferrer">
                <img src="${updatedRedirectUrl}" alt="Email Signature Image" style="border: none; width:420px; margin-top:8px;" />
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
    <div className="flex p-6 justify-center h-screen gap-6">
      <div className="w-[400px]">
        {formFields.map((field: any, i) => (
          <label key={`${field.key} + ${i}`}>
            {field.label}
            <input
              type="text"
              value={urls[`${field.key}`]}
              onChange={(e) =>
                handleInputChange(field.key, e.target.value, field.label)
              }
              placeholder={field.placeholder}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                width: "100%",
                marginBottom: "10px",
              }}
            />
          </label>
        ))}
      </div>
      <div className="w-1/2 flex flex-col reset-tw">
        <div
          ref={hiddenDivRef}
          dangerouslySetInnerHTML={{ __html: signatureHtml }}
        ></div>
        <div className="flex pt-6 gap-3 flex-col relative">
          <button
          style={{backgroundColor: "#43A047", borderRadius: "12px", color: "#ffffff", padding: "8px",  border: "none"}}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              copyToClipboard();
            }}
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
