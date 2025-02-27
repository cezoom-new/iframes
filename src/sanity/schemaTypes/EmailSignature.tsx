import { defineField, defineType } from "sanity";
import { SchemaIcon } from "@sanity/icons";

export const EmailSignature = defineType({
  name: "emailSignature",
  title: "Email Signature",
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
      name: "emailSignatureCampaignList",
      title: "Campaign",
      type: "array",
      of: [
        {
          name: "emailSignatureCampaigns",
          title: "Add Campaign",
          type: "reference",
          to: [{ type: "emailSignatureCampaign" }],
          validation: (Rule) => Rule.max(1),
          // options: {
          //   disableNew: true,
          // },
        },
      ],
    },
  ],
});
