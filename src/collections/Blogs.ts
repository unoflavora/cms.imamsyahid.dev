import { CollectionConfig } from "payload/types";
import { parseSlug } from "../lib/parseSlug";

const Blogs: CollectionConfig = {
  slug: "blogs",
  versions: {
    drafts: true
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "headerImage",
      type: "upload",
      relationTo: "media",
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
    afterChange: [
      async (args) => {
        try {
          var res = await fetch(
            process.env.WEB_URI + "/api/revalidate?tag=blogs",
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

export default Blogs;
