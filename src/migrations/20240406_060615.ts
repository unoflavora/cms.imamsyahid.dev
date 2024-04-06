import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "blogs" ADD COLUMN "order" numeric;
ALTER TABLE "_blogs_v" ADD COLUMN "version_order" numeric;
ALTER TABLE "projects" ADD COLUMN "order" numeric;
ALTER TABLE "_projects_v" ADD COLUMN "version_order" numeric;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "blogs" DROP COLUMN IF EXISTS "order";
ALTER TABLE "_blogs_v" DROP COLUMN IF EXISTS "version_order";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "order";
ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_order";`);

};
