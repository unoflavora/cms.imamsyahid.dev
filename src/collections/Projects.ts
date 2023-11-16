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
      name: "headerImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "slider",
      type: "array",
      label: "Image Slider",
      minRows: 2,
      maxRows: 10,
      interfaceName: "CardSlider",
      labels: {
        singular: "Slide",
        plural: "Slides",
      },
      fields: [
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
    afterOperation: [
      async (args) => {
        var res = await fetch(
          "https://www.imamsyahid.dev/api/revalidate?tag=projects",
          { method: "GET" }
        );
        var data = await res.json();
        console.log(data);
        return args.result;
      },
    ],
  },
};

export default Projects;
