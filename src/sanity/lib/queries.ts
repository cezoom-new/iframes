import { groq } from "next-sanity";

const getViewPorts = () => {
  return groq`*[_type == "viewport"]`;
};

const getViewPortByRegion = () => {
  return groq`*[_type == "viewport" && dimensionValue.current == $region] | order(_createdAt desc)[0]`;
};

const getViewPortByProductRegion = () => {
  return groq`*[_type == "viewport" && dimensionValue.current == $productRegion] | order(_createdAt desc)[0]`;
};

const getCampaignIdsByAdjacency = () => {
  return groq`*[_type == "campaign" && campaignType == "adjacencyOriented" && adjacencyName == $adjacency && _id in $campaignIds && customerType == $customerType ]
  {
    ...,
  "includeAudienceLists": includeAudienceList[0]->audienceNameList,
  "excludeAudienceLists":  excludeAudienceList[0]->audienceNameList
  }`;
};

const getAllCampaignsByLayout = () => {
  return groq`*[_type == "campaign" && selectedLayout == $layout]`;
};

const getCookiesData = () => {
  return groq`*[_type == "cookiePreference" ][0]`;
};

const getCampaignByID = () => {
  return groq`*[_type == "campaign" &&  _id == $campaignID]{
    ...,
  "colorSchema":colorSchema->,
  "campaignImage": structure.campaignImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        "colorTemplate1":colorTemplate[]->,
        "templateLogos":
        structure {
          components[ _type == "topTemplateLogo"] {
            _key, 
            "notifyIconUrl":popupText.notifyIcon->asset.url,
            templateLogos[] {
              asset->{
                _id,
                url,
                metadata {
                  dimensions {
                    width,
                    height,
                    aspectRatio
                  }
                }
              }
            }
          }
        },
        "backgroundImage": backgroundImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
    campaignCarousalImage[]{
    speakerName,
      speakerDesignation,
   'image':speakerImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        'includeAudienceList' : includeAudienceList[] -> {audienceName}
  }
  }[0]`;
};

const getBannerByID = () => {
  return groq`*[_type == "banner" && _id == $bannerID] | order(_createdAt desc)[0]`;
};
const getCampaignByIDs = () => {
  return groq`*[_type == "campaign" &&  _id in $campaignIDs]{
    ...,
  "colorSchema":colorSchema->,
  "campaignImage": structure.campaignImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
       "colorTemplate1": colorTemplate[]->{
          ...,
          paragraphColor,
          h1Color,
          highlightColor,
          selectedBgColor,
          subtitleText,
          popupTitleBgColor,
          popupTextColor
        },
        "templateLogos":
        structure {
          components[ _type == "topTemplateLogo"] {
            _key, 
             "notifyIconUrl":popupText.notifyIcon->asset.url,
            templateLogos[] {
              asset->{
                _id,
                url,
                metadata {
                  dimensions {
                    width,
                    height,
                    aspectRatio
                  }
                }
              }
            }
          }
        },
        "backgroundImage": backgroundImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
    campaignCarousalImage[]{
    speakerName,
      speakerDesignation,
   'image':speakerImage.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
  }
  }`;
};

const getCampaignLayoutByID = () => {
  return groq`*[_type == "campaign" && _id == $campaignID]{ selectedLayout } | order(_createdAt desc)[0]`;
};

const getEmailSignatureBySlug = () => {
  return groq`*[_type == "emailSignature" && slug.current == $slug]{
    team,
      "emailSignatureCampaignList":emailSignatureCampaignList[]->{
        slug,
     
        'image':signatureImage.asset->{
              _id,
              url,
              metadata {
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            },
      
      }[0]
      }[0]`;
};
const getAllEmailSignatures = () => {
  return groq`*[_type == "emailSignature"]`;
};

export {
  getViewPorts,
  getViewPortByRegion,
  getViewPortByProductRegion,
  getCampaignIdsByAdjacency,
  getCampaignByID,
  getBannerByID,
  getCampaignLayoutByID,
  getAllCampaignsByLayout,
  getCookiesData,
  getCampaignByIDs,
  getAllEmailSignatures,
  getEmailSignatureBySlug
};
