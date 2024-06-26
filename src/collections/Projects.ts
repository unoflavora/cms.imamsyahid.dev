import { CollectionConfig } from "payload/types";
import { parseSlug } from "../lib/parseSlug";

const Projects: CollectionConfig = {
  slug: "projects",
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
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
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "contribution",
      type: "text",
      required: true,
    },
    {
      name: "duration",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
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
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
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
    afterChange: [
      async (args) => {
        try {
          var res = await fetch(
            process.env.WEB_URI + "/api/revalidate?tag=projects",
            { method: "GET" }
          );
          var data = await res.json();
          console.log(data);
        } catch (e) {
          console.log(e);
        }
        return args.doc;
      },
    ],
  },
};

export default Projects;
