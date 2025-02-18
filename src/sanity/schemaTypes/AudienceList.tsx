import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import customerData from "../../../database.json";

export const AudienceList = defineType({
  name: "audienceList",
  title: "Audience List",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "audienceTitle",
      title: "Audience Title",
      type: "string",
    }),
    defineField({
      name: "audienceNameList",
      title: "Add Audience Name",
      type: "array",
      of: [
        {
            name: "audienceName",
            title: "Add Audience Name",
            type: "string",
            validation: Rule => Rule.optional(),
            options: {
                list: Object.keys(customerData).map((key) => ({
                  title: key,
                  value: key.toLowerCase().replace(/\s+/g, '') 
                })),
              },
        },
      ],
    }),
  ],
});

