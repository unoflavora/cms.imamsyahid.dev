import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_blogs_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__blogs_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_projects_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__projects_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "_blogs_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_category" varchar,
	"version_description" varchar,
	"version_content" jsonb,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__blogs_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_blogs_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"blogs_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "_projects_v_version_slider" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_projects_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_category" varchar,
	"version_project_url" varchar,
	"version_client" varchar,
	"version_contribution" varchar,
	"version_duration" varchar,
	"version_year" varchar,
	"version_description" varchar,
	"version_content" jsonb,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__projects_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_projects_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"projects_id" integer,
	"media_id" integer
);

DROP INDEX IF EXISTS "sizes_tablet_filename_idx";
ALTER TABLE "blogs" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "content" DROP NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "project_url" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "client" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "contribution" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "duration" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "year" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "content" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "blogs" ADD COLUMN "_status" "enum_blogs_status";
ALTER TABLE "projects" ADD COLUMN "_status" "enum_projects_status";
CREATE INDEX IF NOT EXISTS "version_title_idx" ON "_blogs_v" ("version_title");
CREATE INDEX IF NOT EXISTS "version_slug_idx" ON "_blogs_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "_blogs_v" ("created_at");
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "_blogs_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_blogs_v" ("latest");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_blogs_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "_blogs_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_blogs_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "_projects_v_version_slider" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "_projects_v_version_slider" ("_parent_id");
CREATE INDEX IF NOT EXISTS "version_title_idx" ON "_projects_v" ("version_title");
CREATE INDEX IF NOT EXISTS "version_project_url_idx" ON "_projects_v" ("version_project_url");
CREATE INDEX IF NOT EXISTS "version_slug_idx" ON "_projects_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "_projects_v" ("created_at");
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "_projects_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_projects_v" ("latest");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_projects_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "_projects_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_projects_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "sizes_thumbnail_filename_idx" ON "media" ("sizes_thumbnail_filename");
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_filename";
ALTER TABLE "projects_slider" DROP COLUMN IF EXISTS "title";
ALTER TABLE "projects_slider" DROP COLUMN IF EXISTS "caption";
DO $$ BEGIN
 ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_parent_id__blogs_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_blogs_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_blogs_id_blogs_id_fk" FOREIGN KEY ("blogs_id") REFERENCES "blogs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_blogs_v_rels" ADD CONSTRAINT "_blogs_v_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_projects_v_version_slider" ADD CONSTRAINT "_projects_v_version_slider__parent_id__projects_v_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_projects_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_id__projects_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_projects_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_id_projects_id_fk" FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "_blogs_v";
DROP TABLE "_blogs_v_rels";
DROP TABLE "_projects_v_version_slider";
DROP TABLE "_projects_v";
DROP TABLE "_projects_v_rels";
DROP INDEX IF EXISTS "sizes_thumbnail_filename_idx";
ALTER TABLE "blogs" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "category" SET NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "content" SET NOT NULL;
ALTER TABLE "blogs" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "category" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "project_url" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "client" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "contribution" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "duration" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "year" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "content" SET NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_filename" varchar;
ALTER TABLE "projects_slider" ADD COLUMN "title" varchar;
ALTER TABLE "projects_slider" ADD COLUMN "caption" varchar;
CREATE INDEX IF NOT EXISTS "sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
ALTER TABLE "blogs" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "_status";`);

};
