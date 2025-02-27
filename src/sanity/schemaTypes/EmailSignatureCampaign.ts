import { defineField, defineType } from "sanity";
import { SchemaIcon } from "@sanity/icons";

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
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "campaignName",
      },
    },

    {
      name: "url",
      title: "Redirect URL",
      type: "url",
    },
    {
      name: "signatureImage",
      title: "Image",
      type: "image",
    },
  ],
});
