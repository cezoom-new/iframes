import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const Banner = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "template",
      title: "Template",
    },
    {
      name: "content",
      title: "Content",
    },
  ],
  fields: [
    defineField({
      name: "isFullScreen",
      title: "Show full screen",
      type: "boolean",
      group: "content",
    }),
    defineField({
      name: "bannerHeading",
      title: "Banner Heading",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "eventStartingDate",
      title: "Starting Date",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "eventEndingDate",
      title: "Ending Date",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "eventDescription",
      title: "Description",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "eventLocation",
      title: "Location",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "eventLocationBadges",
      title: "Event Location Badges",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "badgeTitle",
              title: "Badge Title",
              type: "string",
            }),
            defineField({
              name: "badgeColor",
              title: "Badge Color (CSS color)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaBtnTextForEvent",
      title: "CTA Button Text",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "ctaBtnTextLink",
      title: "CTA Button Url",
      type: "string",
      group: "content",
    }),

    //gradient we provide schema with limited color access
    defineField({
      name: "backgroundColorGradient",
      title: "Background Color (CSS color)",
      type: "string",
      group: "template",
    }),
  ],
  preview: {
    select: {
      title: "bannerHeading",
    },
  },
});
