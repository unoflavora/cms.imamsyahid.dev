import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "projects" ADD COLUMN "client" varchar NOT NULL;
ALTER TABLE "projects" ADD COLUMN "contribution" varchar NOT NULL;
ALTER TABLE "projects" ADD COLUMN "duration" varchar NOT NULL;
ALTER TABLE "projects" ADD COLUMN "year" varchar NOT NULL;
ALTER TABLE "projects" ADD COLUMN "description" varchar NOT NULL;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "projects" DROP COLUMN IF EXISTS "client";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "contribution";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "duration";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "year";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "description";`);

};
