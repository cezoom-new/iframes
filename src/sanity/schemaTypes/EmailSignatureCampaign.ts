import { defineField, defineType, validation } from "sanity";
import { SchemaIcon } from "@sanity/icons";
import { getExtension } from "@sanity/asset-utils";

export const EmailSignatureCampaign = defineType({
  name: "emailSignatureCampaign",
  title: "Email Signature Campaign",
  type: "document",
  icon: SchemaIcon,

  fields: [
    {
      name: "campaignName",
      title: "Campaign Name",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "campaignName",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "url",
      title: "Redirect URL",
      type: "url",
      validation: (rule) => rule.required().error("Redirect URL is required"),
    },
    {
      name: "signatureImage",
      title: "Image",
      type: "image",
      validation: (rule) =>
        rule
          .required()
          .assetRequired()
          .custom((value: any) => {
            if (!value || !value.asset || !value.asset._ref) {
              
              return "Image is required";
            }
            const filetype = getExtension(value.asset._ref);
            if (filetype !== "jpg" && filetype !== "png") {
              return "Image must be a JPG or PNG";
            }

            return true;
          })
          .required(),
    },
  ],
});
