-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blocks" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "theme" JSONB NOT NULL DEFAULT '{}';
