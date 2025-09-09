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
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ShareIcon from "@/app/icons/shareIcon";
import EyeIcon from "@/app/icons/eye";
import InfoIcon from "@/app/icons/infoIcon";
import DeleteIcon from "@/app/icons/deleteIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { title } from "process";
import CopyIcon from "@/app/icons/copyIcon";
import CompanyList from "./companyList";
import Companies from "@/app/companies.json";
import { parseBoolean } from "@/utils/page";

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
  // const [hideDisclaimer, setHideDisclaimer] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const [hideDisclaimer, setHideDisclaimer] = useState<boolean>(
    parseBoolean(searchParams.get("disclaimer"), false)
  );
  const form = useForm({
    defaultValues: {
      fullName: searchParams.get("name") || "",
      emailId: searchParams.get("email") || "",
      phoneNumber: searchParams.get("phone") || "",
      role: searchParams.get("role") || "",
      org: searchParams.get("org") || "",
      note: "Please consider the environment before printing this e-mail.",
      title: "​Disclaimer",
      description:
        "This message May contain confidential information and  is intended only for the individual(s) Or entities  named above. Any review, retransmission, dissemination, distribution, copying or other use of  this information by persons or entities other than the intended recipient is prohibited. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from any and all computers it May be stored on. No liability is accepted for any errors or omissions  in the contents of this message which arise as a result of e-mail transmission. If verification is required, please request a hard-copy version. No liability is accepted for any damage caused by any virus transmitted by this e-mail. The recipient should check this e-mail and any attachments for the presence of viruses.",
      hideData: true,
      hideEmail: true,
      hideDisclaimer: parseBoolean(searchParams.get("disclaimer"), false),
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
  const org = searchParams.get("org");
  const disclaimer = searchParams.get("disclaimer");

  const [urls, setUrls] = useState<any>({
    fullName: fullName,
    emailId: emailId,
    phoneNumber: phoneNumber,
    role: role,
    org: org,
    note: form.getValues("note"),
    title: form.getValues("title"),
    description: form.getValues("description"),
    disclaimer: disclaimer,
  });

  const [formFields, setFormFields] = useState([
    {
      label: "Full Name",
      key: "fullName",
      placeholder: fullName || "",
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
      placeholder: phoneNumber || "",
    },
    {
      label: "Role",
      key: "role",
      placeholder: role || "",
    },
  ]);
  const [disclaimerFormFields, setDisclaimerFormFields] = useState([
    {
      label: "Note",
      key: "note",
      placeholder: "Type your note here",
    },
    {
      label: "Disclaimer Title",
      key: "title",
      placeholder: "Type your title here",
    },
    {
      label: "Description",
      key: "description",
      placeholder: "Type your message here",
    },
  ]);

  const transformUrl = (url: string, key: string) => {
    setUrls((prevUrls: any) => ({
      ...prevUrls,
      [key]: url,
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      const email = currentUrl.searchParams.get("email"); // get only email

      if (props?.link) {
        const url = new URL(props.link);
        if (email) {
          url.searchParams.set("email", email); // add only email param
        }
        setUpdatedLink(url.toString());
      } else {
        setUpdatedLink("");
      }

      if (props?.redirectUrl) {
        const redirectUrl = new URL(props.redirectUrl);
        if (email) {
          if (email) {
            redirectUrl.searchParams.set("email", email);
            redirectUrl.searchParams.set("email", email);
          }
          setUpdatedRedirectUrl(redirectUrl.toString());
        } else {
          setUpdatedRedirectUrl(redirectUrl.toString());
        }
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

      setTimeout(() => {
        setCopySuccess("");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess("Failed to copy");
    }
  };
  const [companyValue, setCompValue] = React.useState(
    searchParams.get("org") || ""
  );
  const selectedCompany = Companies.find((c) => c.value === companyValue);

  const [additionalFields, setAdditionalFields] = useState<
    { name: string; value: string }[]
  >([]);

  const handleAddField = () => {
    setAdditionalFields((prev) => [...prev, { name: "", value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    setAdditionalFields((prev) => prev.filter((_, i) => i !== index));

    // Also remove from urls state if the name was filled in
    setUrls((prev: any) => {
      const updated = { ...prev };
      delete updated[additionalFields[index].name];
      return updated;
    });
  };

  const handleChangeField = (
    index: number,
    key: "name" | "value",
    value: string
  ) => {
    setAdditionalFields((prev) => {
      const updated = [...prev];
      const prevName = updated[index].name; // store old key name
      updated[index] = { ...updated[index], [key]: value };

      // Update urls immediately
      setUrls((prevUrls: any) => {
        const newUrls = { ...prevUrls };

        // If name is changing, remove the old key
        if (key === "name" && prevName && prevName !== value) {
          delete newUrls[prevName];
        }

        // Only add new key if it has a name
        if (updated[index].name.trim()) {
          newUrls[updated[index].name] = updated[index].value;
        }

        return newUrls;
      });

      return updated;
    });
  };
  // const setCompanyValue = (key: any, value: any, label: string) => {
  //   // debugger
  //   setCompValue(value)
  //   const nonUrlField = key.includes(searchParams);
  //   setUrls((prevUrls: any) => ({
  //     ...prevUrls,
  //     [key]: value,
  //   }));
  // };
  const setCompanyValue = (key: string, value: string, label: string) => {
    // update local state
    setCompValue(value);

    // update urls object
    setUrls((prevUrls: any) => ({
      ...prevUrls,
      [key]: value,
    }));

    // update query string
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // avoid history clutter
    // router.replace(`?${params.toString()}`, { scroll: false });
  };

  const signatureHtml: string = `
<div>
  <div>
    ${
      updatedLink
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
                <td colspan="2" >
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
                <td colspan="2" style="color:#000000; padding-top:2px; padding-bottom:2px;">${urls.role}</td>
              </tr>
            `
                      : ""
                  }
          
                  <tr>
              <td colspan="2" style="padding-top:2px; padding-bottom:2px;">
                <a href=${selectedCompany?.link} target="_blank" rel="noopener noreferrer">
                ${
                  selectedCompany?.value
                    ? ` <img class="light-img" style="width:auto; vertical-align:middle; height: ${selectedCompany?.height}" src="/logos/${selectedCompany?.value}.png" />
                    <img class="dark-img" style="width:auto; vertical-align:middle; height: ${selectedCompany?.height}" src="/logos/dark/${selectedCompany?.value}.png" />`
                    : ` <img class="light-img" style="width:auto; vertical-align:middle; height: 16px" src="/logos/carestack.png" />
                    <img class="dark-img" style="width:auto; vertical-align:middle; height: 16px" src="/logos/dark/carestack.png" />`
                }
                 
                </a>
              </td>
            </tr>
              <tr>
                <td width="320px" style="vertical-align:middle; height:24px; text-align:left; padding-top:2px; padding-bottom:2px;">
                  ${
                    hideEmail && urls.emailId
                      ? `
                    <span style="vertical-align:middle; color:#000000;">
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
                    <span style="vertical-align:middle; color:#000000;">
                      <a href="tel:${urls.phoneNumber}">${urls.phoneNumber}</a>
                    </span>
                  `
                      : ""
                  }
                </td>
              </tr>
                      
         ${(() => {
           const links = additionalFields
             .filter((f) => f.name.trim() && f.value.trim())
             .map(
               (f) =>
                 `<span style="margin-right:6px;">
          <a href="${ensureHttps(f.value)}" target="_blank">${f.name}</a>
        </span>`
             );

           return links.length
             ? `
        <tr>
          <td colspan="2" style="color:#000000; padding-top:2px; padding-bottom:2px;">
            ${links.join("")}
          </td>
        </tr>
      `
             : "";
         })()}

          `
            : ""
        }

                    ${
                      updatedLink
                        ? `
            <tr>
              <td colspan="2" style="padding-top:2px; padding-bottom:2px;">
                <a href="${updatedLink}" target="_blank" rel="noopener noreferrer">
                  <img src="${updatedRedirectUrl}" alt="Email Signature Image" style="border: none;  max-width:100%; margin-top:8px;" />
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
    ${
      hideDisclaimer
        ? urls?.note || urls?.title || urls?.description
          ? `<table cellpadding="0" style="border-spacing:0px; font-size:12px; padding-top: 24px;" cellspacing="0" >
         <tbody>
            ${
              urls.note
                ? `
              <tr>
                <td style="color:#4B5563;">${urls.note}</td>
              </tr>
            `
                : ""
            }
                  ${
                    urls.title
                      ? `
              <tr>
                <td style="color:#4B5563; font-weight: 700; padding:12px 0 4px;">${urls.title}</td>
              </tr>
            `
                      : ""
                  }
                  ${
                    urls.description
                      ? `
              <tr>
                <td style="color:#6B7280;">${urls.description}</td>
              </tr>
            `
                      : ""
                  }
         </tbody>
         </table>
         `
          : ""
        : ""
    }
  </div>
    <style>
  /* Default (light mode) */
  .dark-img { display: none !important; }
  .light-img { display: block !important; }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    .dark-img { display: block !important; }
    .light-img { display: none !important; }
  }
</style>
</div>
`;
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-50 special-theme ">
      <div className="max-w-7xl w-full h-full mb-24">
        <div className="px-4 md:px-5 py-0 md:py-6">
          <div className="flex flex-col md:flex-row flex-start w-full gap-3 md:gap-8 py-6 border-b">
            <div className="flex flex-col flex-1">
              <h2 className="text-2xl font-bold ">Email Signature Setup</h2>
              <p className="text-slate-600 text-sm">
                Configuring Your Gmail Signature in a Single Step.
              </p>
            </div>
            {selectedCompany?.url ? (
              <Image
                className="md:w-auto"
                src={selectedCompany?.url}
                alt="carestack logo"
                width={200}
                height={50} // keep default for optimization
                style={{ height: selectedCompany?.height || "50px" }}
              />
            ) : (
              <Image
                className="md:h-4 md:w-auto"
                src="/logos/carestack.png"
                alt="carestack logo"
                width={200}
                height={50}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 lg:gap-24 p-6">
          <div className="md:w-1/2 w-full flex flex-col ">
            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form className="space-y-4">
                    <FormField
                      control={control}
                      name="hideData"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-lg">
                            Personal Details
                          </FormLabel>

                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Switch
                                id="terms"
                                checked={hideData}
                                onCheckedChange={(checked: any) => {
                                  field.onChange(checked);
                                  setHideData(checked);
                                }}
                              />
                              <FormLabel htmlFor="terms">
                                Show Details
                              </FormLabel>
                            </div>
                          </FormControl>
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
                                  onChange={(e) => {
                                    formField.onChange(e);
                                    handleInputChange(
                                      "emailId",
                                      e.target.value,
                                      "emailId"
                                    );
                                  }}
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
                          name="hideData"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    checked={hideEmail}
                                    onCheckedChange={(checked: any) => {
                                      field.onChange(checked);
                                      setHideEmail(checked);
                                    }}
                                  />
                                  <FormLabel>
                                    Show Email ID in signature
                                  </FormLabel>
                                </div>
                              </FormControl>

                              <Separator className="my-4" />
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
                    <FormField
                      key="org"
                      control={control}
                      name="org"
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>Organisation</FormLabel>
                          <FormControl>
                            <CompanyList
                              Companies={Companies}
                              value={companyValue}
                              setValue={setCompanyValue}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      {additionalFields.length > 0 && (
                        <span className="text-lg font-medium">
                          Social Links
                        </span>
                      )}
                      {additionalFields.map((field: any, index) => (
                        <div key={index} className="flex gap-4 items-end  mt-3">
                          <FormField
                            key={`1-${index}`}
                            control={control}
                            name={field?.name}
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormLabel>Link #{index + 1}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...formField}
                                    placeholder="Enter field name"
                                    value={field.name}
                                    onChange={(e) =>
                                      handleChangeField(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            key={`2-${index}`}
                            control={control}
                            name={field?.value}
                            render={({ field: formField }) => (
                              <FormItem>
                                {/* <FormLabel>{""}</FormLabel> */}
                                <FormControl>
                                  <Input
                                    {...formField}
                                    placeholder="Enter value"
                                    value={field.value}
                                    onChange={(e) =>
                                      handleChangeField(
                                        index,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            className="mb-2 border border-red-200 bg-white hover:bg-red-100"
                            variant="outline"
                            onClick={() => handleRemoveField(index)}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      ))}

                      {/* {additionalFields.length === 0 && ( */}
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={(e: any) => {
                          e.preventDefault();
                          handleAddField();
                        }}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                          >
                            <path
                              d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
                              stroke="#2563EB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.5 6V12"
                              stroke="#2563EB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.5 9H12.5"
                              stroke="#2563EB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className=""> Add social links </span>
                      </Button>
                      {/* )} */}
                    </div>
                    <Separator className="my-4" />
                    <FormField
                      control={control}
                      name="hideDisclaimer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="text-lg">Disclaimer</FormLabel>

                          <FormControl>
                            <div className="flex items-center gap-3">
                              <Switch
                                id="disclaimer"
                                checked={hideDisclaimer}
                                onCheckedChange={(checked: any) => {
                                  field.onChange(checked);
                                  setHideDisclaimer(checked);
                                }}
                              />
                              <FormLabel htmlFor="disclaimer">
                                Show Disclaimer
                              </FormLabel>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {disclaimerFormFields?.map((field: any, i: number) => (
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
                  </form>
                </Form>
              </CardContent>
            </Card>
            <SetupForSignature id="instruction" />
          </div>
          <div className="flex flex-col md:w-1/2 w-full bg-slate-50">
            <div id="preview" className="flex flex-col">
              <Card>
                <CardHeader className=" bg-slate-100 p-3">
                  <CardTitle className="flex">
                    <span className="flex space-x-2 items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </span>
                    <span className="ml-4">Signature Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="flex items-center bg-slate-100 rounded-t-md p-3"> */}
                  {/* </div> */}
                  <div className="flex flex-col pt-6">
                    <div className="reset-tw">
                      <div
                        ref={hiddenDivRef}
                        dangerouslySetInnerHTML={{ __html: signatureHtml }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 bg-white w-full p-6  "
        style={{ boxShadow: "0 -4px 18px -1px rgba(0, 0, 0, 0.05)" }}
      >
        {" "}
        <div className="max-w-7xl w-full m-auto flex flex-col md:flex-row gap-4 ">
          <div className="flex items-center justify-between w-full md:px-6">
            {/* Center group */}
            <div className="flex gap-3 flex-1">
              <Button
                variant="default"
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="md:w-fit w-full"
              >
                <CopyIcon />
                <span> Copy Signature</span>
              </Button>

              <Link
                href="https://mail.google.com/mail/u/0/#settings/general:~:text=signature"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button variant="outline">
                  <ShareIcon />
                  Open Gmail Settings
                </Button>
              </Link>
              <div className="flex py-2 md:py-6 gap-3 flex-col relative w-full md:w-fit">
                <div className="flex md:w-auto absolute left-0 bottom-4 w-full md:min-w-64 text-sm justify-center">
                  {copySuccess}
                </div>
              </div>
            </div>

            {/* Right button */}
            <Link href="#instruction" className="hidden md:block">
              <Button variant="outline">
                <InfoIcon />
                <span>Read Instruction</span>
              </Button>
            </Link>
          </div>
          <div className="flex md:hidden gap-3 w-full">
            <Link
              href="https://mail.google.com/mail/u/0/#settings/general:~:text=signature"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                <ShareIcon />
                Open Gmail Settings
              </Button>
            </Link>
            <Link href="#preview">
              <Button variant="outline">
                <EyeIcon />
              </Button>
            </Link>
            <Link href="#instruction">
              <Button
                className="border border-slate-200 p-3 bg-white"
                variant="secondary"
                size="icon"
              >
                <InfoIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
