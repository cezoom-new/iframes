import { defineField, defineType } from "sanity";
import { SchemaIcon } from "@sanity/icons";

export const EmailSignature = defineType({
  name: "emailsiganture",
  title: "Email Siganture",
  type: "document",
  icon: SchemaIcon,
  fields: [
    {
      name: "teamName",
      title: "Team Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "teamName",
      },
    },
    {
      name: "campaignList",
      title: "Campaign",
      type: "array",
      of: [
        {
          name: "campaign",
          title: "Add Campaign",
          type: "reference",
          to: [{ type: "campaign" }],
          options: {
            disableNew: true, // Disable creating new campaigns from this schema
          },
        },
      ],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "signatureImage",
      title: "Image",
      type: "blockContent",
    },
  ],
});
