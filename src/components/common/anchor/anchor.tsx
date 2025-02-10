// import { useTracking } from 'cs-tracker';
// import { useBlokComponent } from 'helpers/blokComponentContext';
// import { useBlok } from 'helpers/blokContext';
// import { getCssSelectorShort } from 'helpers/createCSSSelector';
// import generateButtonId from 'helpers/generateButtonId';
// import { getParams, getQueryParamFromLink } from 'helpers/getQueryParams';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from "react";
// import { getCookie } from 'utils/tracker/cookie';
// import { useTrackUser } from 'utils/tracker/intitialize';


// interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
//   href: string;
//   passHref?: Boolean;
//   prefetch?: boolean;
//   locale?: string
//   elementId?: string
//   replace?: boolean
// }

// const Anchor: React.FunctionComponent<CustomLinkProps> =
//   ({ href, elementId, passHref = true, replace = false, prefetch = true, children, ...rest }) => {

//     const router = useRouter();

//     const { Track, trackEvent } = useTracking({}, {})
//     const [newLink, setNewLink] = useState("#");
//     const trackCtx = useTrackUser();
//     const [btnId, setBtnId] = useState<any>("");
//     const { storyId } = useBlok() || {}
//     const { blok, componentType } = useBlokComponent() || {}
//     const abSegment:any = getCookie("__cs_vs");     

//     //remove repetitive query params
//     const cleanParams = function (url: any) {
//       if (newLink.includes("?")) {
//         const paramsString = newLink.split('?')[1];
//         const paramsArray = paramsString.split('&');
//         const clearedArray = Array.from(new Set(paramsArray));
//         const clearedQueryString = '?' + clearedArray.join('&');
//       return newLink.split('?')[0] + clearedQueryString;
//       }
//       return url;
//     }


//     useEffect(() => {

//       const { query } = router

//       const queryParams: Record<string, string> = Object.entries(query).reduce((acc: any, [key, value]) => {
//         if (value !== undefined && key !== "slug") {
//           acc[key] = value.toString();
//         }
//         return acc;
//       }, {});

//       const noParams = Object.keys(queryParams).length === 0;

//       const urlSearchParams = new URLSearchParams(queryParams);

//       // Get the existing URL parameters from href
//       const existingParams = href.includes('?') ? href.split('?')[1] : '';

//       // Merge existing parameters with updated URL params
//       let updatedParams = `${existingParams ? (noParams ? existingParams : existingParams + '&') : ""}${urlSearchParams.toString()}`;
//       // Append updated URL params to href
//       const countryVersion: any = getCookie("__cs_ver");

//       // if (href.includes('https://') && (countryVersion != 2)) {
//       //   const host = window?.location?.host;
//       //   const url = new URL(href ?? "");
//       //   let a = new RegExp('/' + host + '/');
//       //   if (!a.test(url.host) && !router.query.session && !router.query.user) {
//       //     let trackingParams = `session=${trackCtx?.sessionId}&user=${trackCtx?.userId}`;
//       //     updatedParams += updatedParams.length > 0 ? "&" + trackingParams : "" + trackingParams
//       //   }
//       // }

//       if (router.asPath.startsWith("/lp")) {
//         setNewLink(`${href}`);
//       }
//       else if (router.asPath.startsWith("/uk")) {
//         setNewLink(`${href}`);
//       }
//       else {

//         setNewLink(`${href.split('?')[0]}${updatedParams.length > 0 ? "?" + updatedParams : ""}`);
//       }
//     }, [href, router, trackCtx]);


//     useEffect(() => {
//       if (blok && storyId) {
//         const { component } = blok;
//         const safeComponent = component || '';
//         const safeID = storyId || "error";
//         let newBtn = '';

//         if (href) {
//           newBtn = href;
//         } else if (typeof children === 'string') {
//           newBtn = children;
//         } else if (React.isValidElement(children)) {
//           newBtn = children.props.children || '';
//         }

//         const buttonId = generateButtonId(safeID, safeComponent, componentType, newBtn);
//         setBtnId(buttonId);
//       } else {
//         setBtnId("");
//       }
//     }, [blok, children, storyId, componentType, href]);

//     const dataId = elementId || btnId || '';

//     return (
//       <Link data-elementid={dataId} href={newLink} locale={router.locale} replace={replace}
//         onClick={(e) => {
//           const element = getCssSelectorShort(e.target as Element);
//           let e_name = "";
//           const utm_term = getQueryParamFromLink(newLink, 'utm_term');
//           if (utm_term) {
//             e_name = utm_term;
//           } else {
//             if (!newLink.includes('https://')) {
//               e_name = (rest.className?.split('_')[0] !== undefined ? `${rest.className?.split('_')[0]}` :
//                 "internal-link")
//             } else {
//               e_name = "external-link"
//             }
//           }
//           const {
//             utm_source = null,
//             utm_content = null,
//             utm_campaign = null,
//             utm_medium = null,
//             ...params
//           } = getParams();

//           trackEvent({
//             e_type: 'click',
//             e_name,
//             e_time: new Date(),
//             element,
//             element_id: dataId,
//             user_segment:abSegment,
//             destination_url: newLink,
//             current_path: window.location.href,
//             utm_campaign,
//             utm_content,
//             utm_source,
//             utm_term,
//             utm_medium,
//             url_params: params,
//             base_path: window.location.origin + window.location.pathname,
//             domain: window.location.origin,
//             referrer_url: window.document.referrer
//           });
//         }}  {...rest} passHref /*{...(prefetch === false ? { prefetch } : {})}*/ prefetch={false}>
//         {children}
//       </Link>

//     )
//   };


// export default Anchor;