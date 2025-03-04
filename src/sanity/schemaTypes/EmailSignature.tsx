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
      validation:(rule)=>rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      
      options: {
        source: "teamName",
        validation:(rule:any)=>rule.required()
      },
    },
    {
      name: "emailSignatureCampaignList",
      title: "Campaign",
      type: "array",
      validation: (Rule) => Rule.max(1),
      of: [
        {
          name: "emailSignatureCampaigns",
          title: "Add Campaign",
          type: "reference",
          to: [{ type: "emailSignatureCampaign" }],

        },
      ],
    },
  ],
});
