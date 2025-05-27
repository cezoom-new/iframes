"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // assuming you're using this Input component from shadcn/ui
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import SetupForSignature from "./SetupForSignature";

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

const mergeUrls = (baseUrl: string, extraUrl: string) => {
  const base = new URL(baseUrl);
  const extra = new URL(extraUrl);

  // Get the email parameter from the extra URL
  const email = extra.searchParams.get("email");

  if (email) {
    // Append the email parameter to the base URL
    base.searchParams.set("email", email);
  }

  return base.toString();
};

export default function EmailSignatureTemplate(props: {
  link?: string;
  redirectUrl?: string;
}) {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const hiddenDivRef = useRef<HTMLDivElement | null>(null);
  const [updatedLink, setUpdatedLink] = useState<string>("");
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState<string>("");
  const [hideData, setHideData] = useState<boolean>(true);
  const [hideEmail, setHideEmail] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const form = useForm({
    defaultValues: {
      fullName: searchParams.get("name") || "",
      emailId: searchParams.get("email") || "",
      phoneNumber: searchParams.get("phone") || "",
      role: searchParams.get("role") || "",
      websiteUrl: "",
      linkedinUrl: "",
      facebook: "",
      youtubeUrl: "",
      instagramUrl: "",
      hideData: true,
      hideEmail: true,
    },
  });
  const { control } = form;

  function ensureHttps(url: any) {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

  const emailId = searchParams.get("email");
  const fullName = searchParams.get("name");
  const phoneNumber = searchParams.get("phone") || "";
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
      console.log(currentUrl, props.link, props.redirectUrl);
      setUpdatedLink(props?.link ? mergeUrls(props.link, currentUrl) : "");

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
      [key]: value,
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
        ${
          hideData
            ? ` 
             ${
               urls.fullName
                 ? `
              <tr>
                <td colspan="2">
                  <b>${urls.fullName}</b>
                </td>
              </tr>
            `
                 : ""
             }
                  ${
                    urls.role
                      ? `
              <tr>
                <td colspan="2" style="color:#331455;">${urls.role}</td>
              </tr>
            `
                      : ""
                  }
          
                  <tr>
              <td colspan="2">
                <a href="https://carestack.com" target="_blank" rel="noopener noreferrer">
                  <img style="width:110px; vertical-align:middle;" src="https://cdn.sanity.io/images/bgk0i4de/dev/561ab8280087f35957078d6c8d51db5b8c479dbc-166x20.png" />
                </a>
              </td>
            </tr>
              <tr>
                <td width="320px" style="vertical-align:middle; height:24px; text-align:left;">
                  ${
                   hideEmail && urls.emailId
                      ? `
                    <span style="vertical-align:middle; color:#331455;">
                      <a href="mailto:${urls.emailId}">${urls.emailId}</a>
                    </span>
                  `
                      : ""
                  }

                  ${
                    hideEmail && urls.phoneNumber && urls.emailId
                      ? `
                    <span style="margin-right:4px; margin-left:4px;">•</span>
                  `
                      : ""
                  }

                  ${
                    urls.phoneNumber
                      ? `
                    <span style="vertical-align:middle; color:#331455;">
                      <a href="tel:${urls.phoneNumber}">${urls.phoneNumber}</a>
                    </span>
                  `
                      : ""
                  }
                </td>
              </tr>
                      
                    ${
                      urls.websiteUrl ||
                      urls.linkedinUrl ||
                      urls.facebook ||
                      urls.youtubeUrl ||
                      urls.instagramUrl
                        ? `
              <tr>
                <td colspan="2">
                  ${urls.websiteUrl ? `<span style="margin-right:4px;"><a href="${ensureHttps(urls.websiteUrl)}" target="_blank">Website</a></span>` : ""}
                  ${urls.linkedinUrl ? `<span style="margin-right:4px;"><a href="${ensureHttps(urls.linkedinUrl)}" target="_blank">Linkedin</a></span>` : ""}
                  ${urls.facebook ? `<span style="margin-right:4px;"><a href="${ensureHttps(urls.facebook)}" target="_blank">Facebook</a></span>` : ""}
                  ${urls.youtubeUrl ? `<span style="margin-right:4px;"><a href="${ensureHttps(urls.youtubeUrl)}" target="_blank">Youtube</a></span>` : ""}
                  ${urls.instagramUrl ? `<span style="margin-right:4px;"><a href="${ensureHttps(urls.instagramUrl)}" target="_blank">Instagram</a></span>` : ""}
                </td>
              </tr>
            `
                        : ""
                    }
          `
            : ""
        }

                    ${
                      updatedLink && updatedRedirectUrl
                        ? `
            <tr>
              <td colspan="2">
                <a href="${updatedLink}" target="_blank" rel="noopener noreferrer">
                  <img src="${updatedRedirectUrl}" alt="Email Signature Image" style="border: none; width:100%; max-width:420px; margin-top:8px;" />
                </a>
              </td>
            
            </tr>
          `
                        : ""
                    }
        </tbody>
      </table>
    `
        : ""
    }
  </div>
`;

  return (
    <div className="flex flex-col md:max-w-7xl w-full md:flex-row py-16 justify-center gap-6 lg:gap-32">
      <div className="w-1/2 bg-white py-16 px-16 rounded-lg shadow-md flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          One-Time Gmail Signature Setup
        </h2>
        <Form {...form}>
          <FormField
            control={control}
            name="hideData"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 p-4 mb-4 bg-[#f9f1fe] rounded-md text-[#7820bc]">
                <FormControl>
                  <Checkbox
                    checked={hideData}
                    onCheckedChange={(checked: any) => {
                      field.onChange(checked);
                      setHideData(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal !mt-0">
                  Use Detail in Signature
                </FormLabel>
              </FormItem>
            )}
          />
          {urls?.emailId && (
            <>
              <FormField
                control={control}
                name="emailId"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        placeholder="Enter your email"
                        disabled
                        value={urls.emailId || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="hideEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 pb-6">
                    <FormControl>
                      <Checkbox
                        checked={hideEmail}
                        onCheckedChange={(checked: any) => {
                          field.onChange(checked);
                          setHideEmail(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal !mt-0">
                      Show Email ID in signature
                    </FormLabel>
                  </FormItem>
                )}
              />
            </>
          )}
          {formFields?.map((field: any, i: number) => (
            <FormField
              key={`${field.key}-${i}`}
              control={control}
              name={field.key}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...formField}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        formField.onChange(e);
                        handleInputChange(
                          field.key,
                          e.target.value,
                          field.label
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </Form>
      </div>
      <div className="flex flex-col w-1/2">
        <div className="flex mb-2 bg-white h-fit p-6 rounded-lg shadow-md">
          <div className="reset-tw">
            <div
              ref={hiddenDivRef}
              dangerouslySetInnerHTML={{ __html: signatureHtml }}
            ></div>
          </div>
        </div>
        <div className="flex pt-8 gap-3 flex-col relative">
          <Button
            className="w-fit"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              copyToClipboard();
            }}
          >
            {" "}
            Copy Signature
          </Button>
          <div className="flex w-full absolute -bottom-6">{copySuccess}</div>
        </div>
        <SetupForSignature />
      </div>
    </div>
  );
}
