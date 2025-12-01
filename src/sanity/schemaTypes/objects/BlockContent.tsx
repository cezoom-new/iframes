import { defineArrayMember, defineType } from 'sanity';
import React from 'react';

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: "Strike", value: "strike-through" },
          {
            title: 'Large Text',
            value: 'large-text'
          },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => <span style={{ fontWeight: 'bold' }}>H</span>,
            component: (props: any) => <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>,
          },
          {
            title: 'Highlight Bg',
            value: 'highlight-bg',
            icon: () => <span style={{ fontWeight: 'bold', backgroundColor: '#4A3CE1', color: '#ffffff', padding: '2px 4px', borderRadius: '2px' }}>HB</span>,
            component: (props: any) => <span style={{ backgroundColor: '#4A3CE1', color: '#ffffff' }}>{props.children}</span>,
          },
        ],
        annotations: [
          { type: 'textColor' },
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                name: 'backgroundColor',
                title: 'Background color',
                type: 'simplerColor',
              },
            ],
          },
        ],
      },
    }),

    // Image Block
    defineArrayMember({
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'width',
          type: 'number',
          title: 'Image Width',
        },
        {
          name: 'height',
          type: 'number',
          title: 'Image Height',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          // options: { isHighlighted: true }, // Highlights the field in the image editor
        },
      ],
    }),

    // Table Block (flattened schema)
    defineArrayMember({
      title: 'Table',
      name: 'table', // Added name property
      type: 'object',
      fields: [
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object', // Each row will be an object containing cells
              name: 'row', // Name for the row object
              fields: [
                {
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [
                    {
                      type: 'string', // Each cell is a string
                      title: 'Cell Content',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
