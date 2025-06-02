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

      setCopySuccess("Signature copied!");
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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      <div className="flex flex-col md:max-w-7xl w-full md:flex-row py-16 justify-center gap-6 lg:gap-32 mb-16">
        <div className="w-1/2 py-16 px-16 flex flex-col border-r">
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
          <div className="flex flex-col bg-white h-fit rounded-md border border-gray-200">
            <div className="flex items-center bg-gray-200 rounded-t-md px-4 py-2">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-sm ml-4 font-semibold text-gray-700">
                {" "}
                Signature Preview
              </span>
              <div />
            </div>
            <div className="flex flex-col p-6">
              <div className=" p-4">
                <div className="reset-tw">
                  <div
                    ref={hiddenDivRef}
                    dangerouslySetInnerHTML={{ __html: signatureHtml }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <SetupForSignature />
        </div>
      </div>
      <div className="fixed bottom-0 bg-white w-full h-16 text-center align-center flex items-center justify-center" style={{boxShadow: "0 -4px 18px -1px rgba(0, 0, 0, 0.05)"}}>
        {" "}
        <Button
          className="rounded-full bg-blue-600 hover:bg-blue-800 px-12"
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard();
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.75 17.25V20.625C15.75 21.246 15.246 21.75 14.625 21.75H4.875C4.57663 21.75 4.29048 21.6315 4.0795 21.4205C3.86853 21.2095 3.75 20.9234 3.75 20.625V7.875C3.75 7.254 4.254 6.75 4.875 6.75H6.75C7.25257 6.74966 7.7543 6.79114 8.25 6.874M15.75 17.25H19.125C19.746 17.25 20.25 16.746 20.25 16.125V11.25C20.25 6.79 17.007 3.089 12.75 2.374C12.2543 2.29114 11.7526 2.24966 11.25 2.25H9.375C8.754 2.25 8.25 2.754 8.25 3.375V6.874M15.75 17.25H9.375C9.07663 17.25 8.79048 17.1315 8.5795 16.9205C8.36853 16.7095 8.25 16.4234 8.25 16.125V6.874M20.25 13.5V11.625C20.25 10.7299 19.8944 9.87145 19.2615 9.23852C18.6286 8.60558 17.7701 8.25 16.875 8.25H15.375C15.0766 8.25 14.7905 8.13148 14.5795 7.9205C14.3685 7.70952 14.25 7.42337 14.25 7.125V5.625C14.25 5.18179 14.1627 4.74292 13.9931 4.33345C13.8235 3.92397 13.5749 3.55191 13.2615 3.23852C12.9481 2.92512 12.576 2.67652 12.1666 2.50691C11.7571 2.3373 11.3182 2.25 10.875 2.25H9.75"
              stroke="#EFF6FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span> Copy Signature</span>
        </Button>
         <div className="flex py-6 gap-3 flex-col relative justify-center">
            <div className="flex w-auto absolute left-4 bottom-2 min-w-64 text-sm">{copySuccess}</div>
          </div>
      </div>
    </div>
  );
}
