import { CollectionConfig } from "payload/types";
import { parseSlug } from "../lib/parseSlug";

const Blogs: CollectionConfig = {
  slug: "blogs",
  auth: true,
  fields: [
    {
      name: "title",
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

export default Blogs;
