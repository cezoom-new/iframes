import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const viewport = defineType({
  name: "viewport",
  title: "Viewport",
  type: "document",
  icon: UserIcon,
  groups: [
    {
      name: "basic",
      title: "Basic",
      default: true,
    },
    {
      name: "additionalDetail",
      title: "Additional Detail",
    },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "id",
      type: "slug",
      group: "basic",
    }),
    defineField({
      name: "dimension",
      type: "string",
      group: "additionalDetail",
    }),
    defineField({
      name: "dimensionValue",
      type: "slug",
      group: "additionalDetail",
    }),
    defineField({
      title: "Campaign Combining Mode",
      name: "combiningMode",
      type: "string",
      group: "additionalDetail",
      options: {
        list: [
          {
            title: "Concat",
            value: "concat",
          },
          {
            title: "Override",
            value: "override",
          },
        ],
      },
    }),
    defineField({
      name: "selectedAdjacencyCampaigns",
      type: "array",
      title: "Selected Adjacency Oriented Campaigns",
      group: "basic",
      of: [{ type: "reference", to: [{ type: "campaign" }] }],
    }),
    defineField({
      name: "additionalCampaigns",
      type: "array",
      title: "Additional Campaigns",
      group: "basic",
      of: [{ type: "reference", to: [{ type: "campaign" }] }],
    }),

    defineField({
      name: "showBanner",
      title: "Toggle Banner",
      type: "boolean",
      group: "basic",
    }),
    defineField({
      name: "selectedBanner",
      type: "array",
      title: "Selected Banner",
      group: "basic",
      validation: (Rule) => Rule.max(1),
      of: [
        {
          type: "reference",
          to: [{ type: "banner" }],
        },
      ],
    }),
    defineField({
      name: "isCookieShow",
      title: "Cookie Notification show",
      type: "boolean",
      group: "basic",
    }),

  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
