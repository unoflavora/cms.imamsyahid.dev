import { CollectionConfig } from "payload/types";
import { parseSlug } from "../lib/parseSlug";

const Projects: CollectionConfig = {
  slug: "projects",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "projectUrl",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "headerImage", // required
      type: "upload", // required
      relationTo: "media", // required
      required: true,
    },
    {
      name: "slider", // required
      type: "array", // required
      label: "Image Slider",
      minRows: 2,
      maxRows: 10,
      interfaceName: "CardSlider", // optional
      labels: {
        singular: "Slide",
        plural: "Slides",
      },
      fields: [
        // required
        {
          name: "title",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: false,
      admin: {
        hidden: true,
      },
    },
  ],
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      (args) => {
        const { data } = args;
        return { ...data, slug: parseSlug(data["title"]) };
      },
    ],
  },
};

export default Projects;
