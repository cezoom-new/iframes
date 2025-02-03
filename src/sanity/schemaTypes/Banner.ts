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
      default: true,
    },
    {
      name: "content",
      title: "Content",
    },
  ],
  fieldsets: [
    {
      name: "pillElement",
      title: "Pill Element",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      name: "isFullScreen",
      title: "Show full screen",
      type: "boolean",
      group: "template",
    }),
    defineField({
      name: "bannerName",
      title: "Banner Name",
      type: "text",
      group: "template",
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
    
    // defineField({
    //   name: "bannerHeading",
    //   title: "Banner Heading",
    //   type: "blockContent",
    //   group: "content",
    // }),
    // defineField({
    //   name: "eventDescription",
    //   title: "Description",
    //   type: "blockContent",
    //   group: "content",
    // }),
    // defineField({
    //   name: "eventLocation",
    //   title: "Location",
    //   type: "string",
    //   group: "content",
    // }),
    // defineField({
    //   name: "eventLocationBadges",
    //   title: "Event Location Badges",
    //   type: "array",
    //   group: "content",
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         defineField({
    //           name: "badgeTitle",
    //           title: "Badge Title",
    //           type: "string",
    //         }),
    //         defineField({
    //           name: "badgeColor",
    //           title: "Badge Color (CSS color)",
    //           type: "string",
    //         }),
    //       ],
    //     },
    //   ],
    // }),

    //gradient we provide schema with limited color access
    defineField({
      name: "backgroundColorGradient",
      title: "Background Color (CSS color)",
      type: "string",
      group: "template",
    }),

    defineField({
      name: "banner",
      title: "Banner Structure",
      group: "content",
      type: "array",
      of: [
        {
          type: "object",
          name: "bannerHeading",
          fields: [
            {
              name: "bannerHeading",
              title: "Banner Heading",
              type: "blockContent",
            },
          ],
          preview: {
            select: {},
            prepare() {
              return {
                title: "bannerHeading",
              };
            },
          },
        },
        {
          type: "object",
          name: "eventDescription",
          fields: [
            {
              name: "eventDescription",
              title: "Description",
              type: "blockContent",
            },
          ],
          preview: {
            select: {},
            prepare() {
              return {
                title: "eventDescription",
              };
            },
          },
        },
        {
        type: "object",
        name: "pillElement",
        title: "Top Pills Component",
        fields: [
          {
            name: "eventLocation",
              title: "Location",
              type: "string",
          },
          {
            type: "object",
            name: "eventLocationBadges",
            fields: [
              {
                name: "eventLocationBadges",
                title: "Event Location Badges",
                type: "array",
                of: [
                  {
                    type: "object",
                    fields: [
                      {
                        name: "badgeTitle",
                        title: "Badge Title",
                        type: "string",
                      },
                      {
                        name: "badgeColor",
                        title: "Badge Color (CSS color)",
                        type: "string",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        preview: {
          prepare() {
            return {
              title: `Top Pills Component`,
            };
          },
        },
      },
      {
        type: "object",
        name: "buttonComponents",
        title: "Button Component",
        fields: [
          {
            name: "ctaBtnTextForEvent",
          title: "CTA Button Text",
          type: "string",
          },
          {
            name: "ctaBtnTextLink",
            title: "CTA Button Url",
            type: "string",
          },
          {
            name: "ctaBtnColor",
            title: "CTA Button Color",
            type: 'string',
            options: {
              list: [
                { title: 'Red', value: '#FF5733' },
                { title: 'Green', value: '#26A363' },
                { title: 'Blue', value: '#007bff' },
                { title: 'Yellow', value: '#FFEB3B' },
                { title: 'Purple', value: '#6f42c1' },
                { title: 'White', value: '#fff' },
                { title: 'Black', value: '#000000' }
              ], 
              layout: 'dropdown',
            },
          },
          {
            name: "ctaBtnTextColor",
            title: "CTA Button Text Color",
            type: "string",
            options: {
              list: [
                {
                  title: "White text",
                  value: "whiteMode",
                },
                {
                  title: "Black text",
                  value: "blackMode",
                },
              ],
              layout: 'radio',
            },
          },
        ],
        preview: {
          select: {},
          prepare() {
            return {
              title:"Button Component",
            };
          },
        },
      },
      ],
    }),
  ],
  preview: {
    select: {
      title: "bannerName",
    },
  },
});
