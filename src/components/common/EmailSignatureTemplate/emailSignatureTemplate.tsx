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
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [twitterUrl, setTwitterUrl] = useState<string>("");
  const [instagramUrl, setInstagramUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const transformUrl = (url: string, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    setUrl((prevUrl) => {
      const cleanUrl = url.replace(/^https?:\/\//, '');
      return `https://${cleanUrl}`;
    });
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

  const copyToClipboard = async () => {
    debugger;
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
  const instagramBase64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlNvY2lhbCBJY29ucyIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExMDNfMjY2NikiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNNiAxLjA4MDQ3QzcuNjAzMTMgMS4wODA0NyA3Ljc5Mjk3IDEuMDg3NSA4LjQyMzQ0IDEuMTE1NjJDOS4wMDkzOCAxLjE0MTQxIDkuMzI1NzggMS4yMzk4NCA5LjUzNjcyIDEuMzIxODdDOS44MTU2MyAxLjQyOTY5IDEwLjAxNzIgMS41NjA5NCAxMC4yMjU4IDEuNzY5NTNDMTAuNDM2NyAxLjk4MDQ3IDEwLjU2NTYgMi4xNzk2OSAxMC42NzM0IDIuNDU4NTlDMTAuNzU1NSAyLjY2OTUzIDEwLjg1MzkgMi45ODgyOCAxMC44Nzk3IDMuNTcxODdDMTAuOTA3OCA0LjIwNDY5IDEwLjkxNDggNC4zOTQ1MyAxMC45MTQ4IDUuOTk1MzFDMTAuOTE0OCA3LjU5ODQ0IDEwLjkwNzggNy43ODgyOCAxMC44Nzk3IDguNDE4NzVDMTAuODUzOSA5LjAwNDY5IDEwLjc1NTUgOS4zMjEwOSAxMC42NzM0IDkuNTMyMDNDMTAuNTY1NiA5LjgxMDk0IDEwLjQzNDQgMTAuMDEyNSAxMC4yMjU4IDEwLjIyMTFDMTAuMDE0OCAxMC40MzIgOS44MTU2MyAxMC41NjA5IDkuNTM2NzIgMTAuNjY4N0M5LjMyNTc4IDEwLjc1MDggOS4wMDcwMyAxMC44NDkyIDguNDIzNDQgMTAuODc1QzcuNzkwNjMgMTAuOTAzMSA3LjYwMDc4IDEwLjkxMDIgNiAxMC45MTAyQzQuMzk2ODggMTAuOTEwMiA0LjIwNzAzIDEwLjkwMzEgMy41NzY1NiAxMC44NzVDMi45OTA2MyAxMC44NDkyIDIuNjc0MjIgMTAuNzUwOCAyLjQ2MzI4IDEwLjY2ODdDMi4xODQzOCAxMC41NjA5IDEuOTgyODEgMTAuNDI5NyAxLjc3NDIyIDEwLjIyMTFDMS41NjMyOCAxMC4wMTAyIDEuNDM0MzggOS44MTA5NCAxLjMyNjU2IDkuNTMyMDNDMS4yNDQ1MyA5LjMyMTA5IDEuMTQ2MDkgOS4wMDIzNCAxLjEyMDMxIDguNDE4NzVDMS4wOTIxOSA3Ljc4NTk0IDEuMDg1MTYgNy41OTYwOSAxLjA4NTE2IDUuOTk1MzFDMS4wODUxNiA0LjM5MjE5IDEuMDkyMTkgNC4yMDIzNCAxLjEyMDMxIDMuNTcxODdDMS4xNDYwOSAyLjk4NTk0IDEuMjQ0NTMgMi42Njk1MyAxLjMyNjU2IDIuNDU4NTlDMS40MzQzOCAyLjE3OTY5IDEuNTY1NjMgMS45NzgxMiAxLjc3NDIyIDEuNzY5NTNDMS45ODUxNiAxLjU1ODU5IDIuMTg0MzggMS40Mjk2OSAyLjQ2MzI4IDEuMzIxODdDMi42NzQyMiAxLjIzOTg0IDIuOTkyOTcgMS4xNDE0MSAzLjU3NjU2IDEuMTE1NjJDNC4yMDcwMyAxLjA4NzUgNC4zOTY4OCAxLjA4MDQ3IDYgMS4wODA0N1pNNiAwQzQuMzcxMDkgMCA0LjE2NzE5IDAuMDA3MDMxMjUgMy41MjczNCAwLjAzNTE1NjJDMi44ODk4NCAwLjA2MzI4MTIgMi40NTE1NiAwLjE2NjQwNiAyLjA3MTg4IDAuMzE0MDYyQzEuNjc1NzggMC40Njg3NSAxLjM0MDYzIDAuNjcyNjU2IDEuMDA3ODEgMS4wMDc4MUMwLjY3MjY1NiAxLjM0MDYyIDAuNDY4NzUgMS42NzU3OCAwLjMxNDA2MyAyLjA2OTUzQzAuMTY2NDA2IDIuNDUxNTYgMC4wNjMyODEzIDIuODg3NSAwLjAzNTE1NjMgMy41MjVDMC4wMDcwMzEyNSA0LjE2NzE5IDAgNC4zNzEwOSAwIDZDMCA3LjYyODkxIDAuMDA3MDMxMjUgNy44MzI4MSAwLjAzNTE1NjMgOC40NzI2NkMwLjA2MzI4MTMgOS4xMTAxNiAwLjE2NjQwNiA5LjU0ODQ0IDAuMzE0MDYzIDkuOTI4MTJDMC40Njg3NSAxMC4zMjQyIDAuNjcyNjU2IDEwLjY1OTQgMS4wMDc4MSAxMC45OTIyQzEuMzQwNjMgMTEuMzI1IDEuNjc1NzggMTEuNTMxMiAyLjA2OTUzIDExLjY4MzZDMi40NTE1NiAxMS44MzEyIDIuODg3NSAxMS45MzQ0IDMuNTI1IDExLjk2MjVDNC4xNjQ4NCAxMS45OTA2IDQuMzY4NzUgMTEuOTk3NyA1Ljk5NzY2IDExLjk5NzdDNy42MjY1NiAxMS45OTc3IDcuODMwNDcgMTEuOTkwNiA4LjQ3MDMxIDExLjk2MjVDOS4xMDc4MSAxMS45MzQ0IDkuNTQ2MDkgMTEuODMxMiA5LjkyNTc4IDExLjY4MzZDMTAuMzE5NSAxMS41MzEyIDEwLjY1NDcgMTEuMzI1IDEwLjk4NzUgMTAuOTkyMkMxMS4zMjAzIDEwLjY1OTQgMTEuNTI2NiAxMC4zMjQyIDExLjY3ODkgOS45MzA0N0MxMS44MjY2IDkuNTQ4NDQgMTEuOTI5NyA5LjExMjUgMTEuOTU3OCA4LjQ3NUMxMS45ODU5IDcuODM1MTYgMTEuOTkzIDcuNjMxMjUgMTEuOTkzIDYuMDAyMzRDMTEuOTkzIDQuMzczNDQgMTEuOTg1OSA0LjE2OTUzIDExLjk1NzggMy41Mjk2OUMxMS45Mjk3IDIuODkyMTkgMTEuODI2NiAyLjQ1MzkxIDExLjY3ODkgMi4wNzQyMkMxMS41MzEyIDEuNjc1NzggMTEuMzI3MyAxLjM0MDYyIDEwLjk5MjIgMS4wMDc4MUMxMC42NTk0IDAuNjc1IDEwLjMyNDIgMC40Njg3NSA5LjkzMDQ3IDAuMzE2NDA2QzkuNTQ4NDQgMC4xNjg3NSA5LjExMjUgMC4wNjU2MjUgOC40NzUgMC4wMzc1QzcuODMyODEgMC4wMDcwMzEyNSA3LjYyODkxIDAgNiAwWiIgZmlsbD0iIzAwMDEwMCIvPgo8cGF0aCBpZD0iVmVjdG9yXzIiIGQ9Ik02IDIuOTE3OTdDNC4yOTg0NCAyLjkxNzk3IDIuOTE3OTcgNC4yOTg0NCAyLjkxNzk3IDZDMi45MTc5NyA3LjcwMTU2IDQuMjk4NDQgOS4wODIwMyA2IDkuMDgyMDNDNy43MDE1NiA5LjA4MjAzIDkuMDgyMDMgNy43MDE1NiA5LjA4MjAzIDZDOS4wODIwMyA0LjI5ODQ0IDcuNzAxNTYgMi45MTc5NyA2IDIuOTE3OTdaTTYgNy45OTkyMkM0Ljg5NjA5IDcuOTk5MjIgNC4wMDA3OCA3LjEwMzkxIDQuMDAwNzggNkM0LjAwMDc4IDQuODk2MDkgNC44OTYwOSA0LjAwMDc4IDYgNC4wMDA3OEM3LjEwMzkxIDQuMDAwNzggNy45OTkyMiA0Ljg5NjA5IDcuOTk5MjIgNkM3Ljk5OTIyIDcuMTAzOTEgNy4xMDM5MSA3Ljk5OTIyIDYgNy45OTkyMloiIGZpbGw9IiMwMDAxMDAiLz4KPHBhdGggaWQ9IlZlY3Rvcl8zIiBkPSJNOS45MjM0NCAyLjc5NjA3QzkuOTIzNDQgMy4xOTQ1MSA5LjYgMy41MTU2IDkuMjAzOTEgMy41MTU2QzguODA1NDcgMy41MTU2IDguNDg0MzggMy4xOTIxNyA4LjQ4NDM4IDIuNzk2MDdDOC40ODQzOCAyLjM5NzYzIDguODA3ODEgMi4wNzY1NCA5LjIwMzkxIDIuMDc2NTRDOS42IDIuMDc2NTQgOS45MjM0NCAyLjM5OTk4IDkuOTIzNDQgMi43OTYwN1oiIGZpbGw9IiMwMDAxMDAiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTAzXzI2NjYiPgo8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  const youtubeBase64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlNvY2lhbCBJY29ucyIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExMDNfMjY4MSkiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNMTEuNzYxMSAzLjA5MjdDMTEuNjkzMiAyLjgzNzQxIDExLjU1OTUgMi42MDQ0MiAxMS4zNzMzIDIuNDE3MDNDMTEuMTg3MSAyLjIyOTY1IDEwLjk1NSAyLjA5NDQ2IDEwLjcwMDEgMi4wMjQ5OEM5Ljc2MTk2IDEuNzcyNzEgNi4wMTE5NiAxLjc3MjcxIDYuMDExOTYgMS43NzI3MUM2LjAxMTk2IDEuNzcyNzEgMi4yNjE5NiAxLjc3MjcxIDEuMzIzNzggMi4wMjQ5OEMxLjA2ODkzIDIuMDk0NDYgMC44MzY3OTIgMi4yMjk2NSAwLjY1MDYwNyAyLjQxNzAzQzAuNDY0NDIxIDIuNjA0NDIgMC4zMzA3MTYgMi44Mzc0MSAwLjI2Mjg3MiAzLjA5MjdDMC4wMTE5NjI5IDQuMDM0OTggMC4wMTE5NjI5IDUuOTk5OTggMC4wMTE5NjI5IDUuOTk5OThDMC4wMTE5NjI5IDUuOTk5OTggMC4wMTE5NjI5IDcuOTY0OTggMC4yNjI4NzIgOC45MDcyNUMwLjMzMDcxNiA5LjE2MjU0IDAuNDY0NDIxIDkuMzk1NTQgMC42NTA2MDcgOS41ODI5MkMwLjgzNjc5MiA5Ljc3MDMgMS4wNjg5MyA5LjkwNTUgMS4zMjM3OCA5Ljk3NDk4QzIuMjYxOTYgMTAuMjI3MiA2LjAxMTk2IDEwLjIyNzIgNi4wMTE5NiAxMC4yMjcyQzYuMDExOTYgMTAuMjI3MiA5Ljc2MTk2IDEwLjIyNzIgMTAuNzAwMSA5Ljk3NDk4QzEwLjk1NSA5LjkwNTUgMTEuMTg3MSA5Ljc3MDMgMTEuMzczMyA5LjU4MjkyQzExLjU1OTUgOS4zOTU1NCAxMS42OTMyIDkuMTYyNTQgMTEuNzYxMSA4LjkwNzI1QzEyLjAxMiA3Ljk2NDk4IDEyLjAxMiA1Ljk5OTk4IDEyLjAxMiA1Ljk5OTk4QzEyLjAxMiA1Ljk5OTk4IDEyLjAxMiA0LjAzNDk4IDExLjc2MTEgMy4wOTI3WiIgZmlsbD0iI0ZGMDMwMiIvPgo8cGF0aCBpZD0iVmVjdG9yXzIiIGQ9Ik00Ljc4NDY3IDcuNzg0MzNWNC4yMTU3TDcuOTIxMDMgNi4wMDAwMkw0Ljc4NDY3IDcuNzg0MzNaIiBmaWxsPSIjRkVGRUZFIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTEwM18yNjgxIj4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
  const twitterBase64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlNvY2lhbCBJY29ucyIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExMDNfMjY0OSkiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOS4xNjMxNCAwLjk1MTkwNEgxMC44NDk5TDcuMTY0ODYgNS4xNjM2NUwxMS41IDEwLjg5NDlIOC4xMDU2Mkw1LjQ0NzAyIDcuNDE4OTJMMi40MDQ5NyAxMC44OTQ5SDAuNzE3MjE2TDQuNjU4NzIgNi4zODk5NUwwLjUgMC45NTE5MDRIMy45ODA1NUw2LjM4MzcgNC4xMjkwN0w5LjE2MzE0IDAuOTUxOTA0Wk04LjU3MTE1IDkuODg1MjlIOS41MDU3OUwzLjQ3MjcgMS45MDg0N0gyLjQ2OTczTDguNTcxMTUgOS44ODUyOVoiIGZpbGw9ImJsYWNrIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTEwM18yNjQ5Ij4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
  const linkedinIconBase64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlNvY2lhbCBJY29ucyIgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExMDNfMjY0OCkiPgo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNMTEuMTE0MiAwSDAuODg1ODMzQzAuNjUwODk2IDAgMC40MjU1ODEgMC4wOTMzMjg3IDAuMjU5NDU1IDAuMjU5NDU1QzAuMDkzMzI4NyAwLjQyNTU4MSAwIDAuNjUwODk2IDAgMC44ODU4MzNWMTEuMTE0MkMwIDExLjM0OTEgMC4wOTMzMjg3IDExLjU3NDQgMC4yNTk0NTUgMTEuNzQwNUMwLjQyNTU4MSAxMS45MDY3IDAuNjUwODk2IDEyIDAuODg1ODMzIDEySDExLjExNDJDMTEuMzQ5MSAxMiAxMS41NzQ0IDExLjkwNjcgMTEuNzQwNSAxMS43NDA1QzExLjkwNjcgMTEuNTc0NCAxMiAxMS4zNDkxIDEyIDExLjExNDJWMC44ODU4MzNDMTIgMC42NTA4OTYgMTEuOTA2NyAwLjQyNTU4MSAxMS43NDA1IDAuMjU5NDU1QzExLjU3NDQgMC4wOTMzMjg3IDExLjM0OTEgMCAxMS4xMTQyIDBaTTMuNTc2NjcgMTAuMjIyNUgxLjc3MjVWNC40OTE2N0gzLjU3NjY3VjEwLjIyMjVaTTIuNjczMzMgMy42OTc1QzIuNDY4NjggMy42OTYzNSAyLjI2ODk2IDMuNjM0NiAyLjA5OTM3IDMuNTIwMDRDMS45Mjk3OCAzLjQwNTQ5IDEuNzk3OTIgMy4yNDMyNiAxLjcyMDQ0IDMuMDUzODRDMS42NDI5NiAyLjg2NDQyIDEuNjIzMzIgMi42NTYzIDEuNjY0MDIgMi40NTU3M0MxLjcwNDcxIDIuMjU1MTYgMS44MDM5IDIuMDcxMTQgMS45NDkwOCAxLjkyNjg5QzIuMDk0MjUgMS43ODI2NCAyLjI3ODkxIDEuNjg0NjMgMi40Nzk3MyAxLjY0NTIzQzIuNjgwNTYgMS42MDU4MyAyLjg4ODU2IDEuNjI2OCAzLjA3NzQ4IDEuNzA1NDlDMy4yNjY0IDEuNzg0MTkgMy40Mjc3NyAxLjkxNzA4IDMuNTQxMjMgMi4wODc0MUMzLjY1NDcgMi4yNTc3MyAzLjcxNTE2IDIuNDU3ODUgMy43MTUgMi42NjI1QzMuNzE2OTMgMi43OTk1MiAzLjY5MTI2IDIuOTM1NTIgMy42Mzk1MSAzLjA2MjRDMy41ODc3NiAzLjE4OTI4IDMuNTEwOTkgMy4zMDQ0NSAzLjQxMzc5IDMuNDAxMDNDMy4zMTY1OCAzLjQ5NzYyIDMuMjAwOTIgMy41NzM2NCAzLjA3MzcxIDMuNjI0NThDMi45NDY1IDMuNjc1NTEgMi44MTAzMyAzLjcwMDMxIDIuNjczMzMgMy42OTc1Wk0xMC4yMjY3IDEwLjIyNzVIOC40MjMzM1Y3LjA5NjY3QzguNDIzMzMgNi4xNzMzMyA4LjAzMDgzIDUuODg4MzMgNy41MjQxNyA1Ljg4ODMzQzYuOTg5MTcgNS44ODgzMyA2LjQ2NDE3IDYuMjkxNjcgNi40NjQxNyA3LjEyVjEwLjIyNzVINC42NlY0LjQ5NTgzSDYuMzk1VjUuMjlINi40MTgzM0M2LjU5MjUgNC45Mzc1IDcuMjAyNSA0LjMzNSA4LjEzMzMzIDQuMzM1QzkuMTQgNC4zMzUgMTAuMjI3NSA0LjkzMjUgMTAuMjI3NSA2LjY4MjVMMTAuMjI2NyAxMC4yMjc1WiIgZmlsbD0iIzBBNjZDMiIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzExMDNfMjY0OCI+CjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";
  const websiteIconBase64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZyYW1lIiBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTEwM18yNjQ1KSI+CjxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik02IDExLjI1QzcuMTYzNzUgMTEuMjQ5OSA4LjI5NDUyIDEwLjg2MzQgOS4yMTQ3NyAxMC4xNTFDMTAuMTM1IDkuNDM4NjUgMTAuNzkyNiA4LjQ0MDg0IDExLjA4NDMgNy4zMTQyNU02IDExLjI1QzQuODM2MjUgMTEuMjQ5OSAzLjcwNTQ4IDEwLjg2MzQgMi43ODUyNCAxMC4xNTFDMS44NjQ5OSA5LjQzODY1IDEuMjA3MzggOC40NDA4NCAwLjkxNTY2OSA3LjMxNDI1TTYgMTEuMjVDNy40NDk1OSAxMS4yNSA4LjYyNSA4Ljg5OTE3IDguNjI1IDZDOC42MjUgMy4xMDA4MyA3LjQ0OTU5IDAuNzUgNiAwLjc1TTYgMTEuMjVDNC41NTA0MiAxMS4yNSAzLjM3NSA4Ljg5OTE3IDMuMzc1IDZDMy4zNzUgMy4xMDA4MyA0LjU1MDQyIDAuNzUgNiAwLjc1TTExLjA4NDMgNy4zMTQyNUMxMS4xOTIzIDYuODk0MjUgMTEuMjUgNi40NTM4MyAxMS4yNSA2QzExLjI1MTQgNS4wOTcwNyAxMS4wMTg5IDQuMjA5MTYgMTAuNTc1MSAzLjQyMjgzTTExLjA4NDMgNy4zMTQyNUM5LjUyODY4IDguMTc2NjQgNy43Nzg3IDguNjI3NzkgNiA4LjYyNUM0LjE1NTUgOC42MjUgMi40MjI0MiA4LjE0OTU4IDAuOTE1NjY5IDcuMzE0MjVNMC45MTU2NjkgNy4zMTQyNUMwLjgwNTI3MSA2Ljg4NDkgMC43NDk2MDggNi40NDMzMiAwLjc1MDAwMiA2QzAuNzUwMDAyIDUuMDYzNzUgMC45OTUwMDIgNC4xODQwOCAxLjQyNDkyIDMuNDIyODNNNiAwLjc1QzYuOTMxMTQgMC43NDk2MTIgNy44NDU2MiAwLjk5Njk1OSA4LjY0OTYxIDEuNDY2NjZDOS40NTM2IDEuOTM2MzcgMTAuMTE4MiAyLjYxMTUxIDEwLjU3NTEgMy40MjI4M002IDAuNzVDNS4wNjg4NiAwLjc0OTYxMiA0LjE1NDM4IDAuOTk2OTU5IDMuMzUwMzkgMS40NjY2NkMyLjU0NjQgMS45MzYzNyAxLjg4MTg1IDIuNjExNTEgMS40MjQ5MiAzLjQyMjgzTTEwLjU3NTEgMy40MjI4M0M5LjMwNDk4IDQuNTIyOTYgNy42ODAzMSA1LjEyNzQyIDYgNS4xMjVDNC4yNTExNyA1LjEyNSAyLjY1MTY3IDQuNDgzMzMgMS40MjQ5MiAzLjQyMjgzIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjAuODc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTAzXzI2NDUiPgo8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
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
              ${websiteUrl ? `<a style="width:20px" href="${websiteUrl}" target="_blank"><img src="${websiteIconBase64}" alt="Website" /></a>` : ""}
              ${linkedinUrl ? `<a style="width:20px" href="${linkedinUrl}" target="_blank"><img src="${linkedinIconBase64}" alt="LinkedIn" /></a>` : ""}
              ${twitterUrl ? `<a style="width:20px" href="${twitterUrl}" target="_blank"><img src="${twitterBase64}" alt="Twitter" /></a>` : ""}
              ${youtubeUrl ? `<a style="width:20px" href="${youtubeUrl}" target="_blank"><img src="${youtubeBase64}" alt="YouTube" /></a>` : ""}
               ${instagramUrl ? `<a style="width:20px" href="${instagramUrl}" target="_blank"><img src="${instagramBase64}" alt="YouTube" /></a>` : ""}
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
              <img style="width:17px; height:17px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADhSURBVHgBtZEtCMJQFIXPk1dEk2WCTVf9SQbNotUuWAUtFqOgTUGT1SCIJrEqwyCIYcmf6uLAISxtGOfuRJChwwU/eK+8c+595152s1QLPgjAJ5yubnsMw7h7CgUhglq9DH46XrDfnfELhWIWjDJIKxnTyQqapn8UptIiKtUSUhkRXFFUgAGTeRtklNYyqOu7MCHGsFxsEQ4HwTaHrdVqjiBEI85jLp+EclEdw0tIx7Qz9oeNZ2hCu+oY9GaY2kaqTNU69jBM1zC4+79klK4yvsHjiZiTnoRehOyOFJr9fdMPXmFV71EVPxQAAAAASUVORK5CYII=" />
              ${emailId}
            </td>
            <td style="display:flex; gap: 6px; align-items:center;">
              <img style="width:17px; height:17px"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADBSURBVHgBlVDLDYJAEH2DhDMlUMIeLGC1Ag/GeNMWrACoRM9GEyowe/SAyXYgJVAAMO4SiKKGzxzeZjbzPnnAxCELQm4DB8WewPqhrkkfwbVQHxOFDMrM2ktwvux8DExLyJvXF3LlDxIM6NqBeaFVkg8SUnVR1oXBoyOBGQeQczSRgvbvXzz6XObLTVQx78BlXMFTMyqfjZw2irGtvNNSejtHYMREbvg+rnWFqVz8OHTc5FpWJhWaqj0Up7tKMkydF3CwP1hcEpE1AAAAAElFTkSuQmCC" />
              ${phoneNumber}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <a href="${updatedLink}" target="_blank" rel="noopener noreferrer">
                <img src="${updatedRedirectUrl}" alt="Email Signature Image" style="border: none;" />
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
        <form
          style={{
            width: "250px",
          }}
        >
          <label>
            Website
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) =>  transformUrl(e.target.value,setWebsiteUrl)}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
              }}
            />
          </label>

          <label>
            LinkedIn
            <input
              type="text"
              value={linkedinUrl}
              onChange={(e) => transformUrl(e.target.value,setLinkedinUrl)}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
              }}
            />
          </label>

          <label>
            Twitter
            <input
              type="text"
              value={twitterUrl}
              onChange={(e) =>  transformUrl(e.target.value,setTwitterUrl)}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
              }}
            />
          </label>

          <label>
            YouTube 
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => transformUrl(e.target.value,setYoutubeUrl)}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
              }}
            />
          </label>

          <label>
            Instagram
            <input
              type="text"
              value={instagramUrl}
              onChange={(e) => transformUrl(e.target.value,setInstagramUrl)}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
              }}
            />
          </label>
        </form>
      </div>
      <div className="w-1/2 flex flex-col">
        {/* Hidden container to hold the HTML we want to copy */}
        <div
          ref={hiddenDivRef}
          dangerouslySetInnerHTML={{ __html: signatureHtml }}
        ></div>
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
    </div>
  );
}
