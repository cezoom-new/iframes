import { defineField, defineType, set, unset, useFormValue } from "sanity";
import { Stack, Text, Card, Select } from "@sanity/ui";
import list from "../../components/common/Color.json";

const DynamicColorDropdown = (props: any) => {
  const { onChange, description, title, name, id, value, ...restProps } = props;
  const selectedBgColor = useFormValue(["selectedBgColor"]);

  const selectedItem = list?.themes?.find(
    (item: { value: unknown }) => item.value === selectedBgColor
  );
  const colorSectionItems = list?.colors;

  const options: string | Array<any> =
  selectedItem && id === "h1Color"
    ? colorSectionItems || []
    : selectedItem && id === "paragraphColor"
      ? colorSectionItems || []
      : selectedItem && id === "highlightColor"
        ? colorSectionItems || []
        : selectedItem && id === "title"
          ? colorSectionItems || []
          : selectedItem && id === "subtitleText"
            ? colorSectionItems || []
            : [];


  const safeOptions = Array.isArray(options) ? options : [];
  return (
    <>
      <Card border padding={3}>
        <Stack space={3} marginBottom={3}>
          <Text size={1} weight="bold">
            {title?.toUpperCase()}
          </Text>
          {description && (
            <Text size={1} style={{ color: "green" }}>
              {description}
            </Text>
          )}
        </Stack>
        <Select
          value={props.value}
          onChange={(e: any) => onChange(set(e.target.value))}
        >
          {safeOptions.map((e: any, index: number) => (
            <option key={index} value={e} style={{ background: e }}>
              {e} 
            </option>
          ))}
          Characters: {value?.length || 0}
        </Select>
      </Card>
    </>
  );
};

export const BackgroundColor = defineType({
  name: "backgroundLinearGradient",
  title: "Background Color",
  type: "document",
  fields: [
    defineField({
      name: "colorTitle",
      title: "Color Title",
      type: "string",
    }),
    defineField({
      name: "selectedBgColor",
      title: "Select Background Color Gradient",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: list?.themes?.map((color) => ({
          title: color.title,
          value: color.value,
        })),
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      readOnly: true, 
      hidden:true
    }),
    defineField({
      name: "h1Color",
      title: "Heading Text Color (h1)",
      type: "string",
      components: {
        input: DynamicColorDropdown,
      },
    }),
    defineField({
      name: "paragraphColor",
      title: "Paragraph Color",
      type: "string",
      components: {
        input: DynamicColorDropdown,
      },
    }),
    defineField({
      name: "subtitleText",
      title: "SubTitle Color",
      type: "string",
      components: {
        input: DynamicColorDropdown,
      },
    }),
    defineField({
      name: "highlightColor",
      title: "Highlight Color",
      type: "string",
      components: {
        input: DynamicColorDropdown,
      },
    }),
  ],
  preview: {
    select: {
      title: "colorTitle",
      bgColor: "selectedBgColor",
    },
    prepare({ title, bgColor }: any) {
      const selectedItem = list?.themes?.find(
        (item: { value: any }) => item.value === bgColor
      );
  
      return {
        title: title || "No Title",
        media: () => (
          <div
            style={{
              width: "24px",
              height: "24px",
              background: selectedItem?.value || "#ccc",
              borderRadius: "4px",
            }}
          />
        ),
      };
    },
  },
});
