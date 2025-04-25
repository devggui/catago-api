/*
  Warnings:

  - Added the required column `whatsapp` to the `catalogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catalogs" ADD COLUMN     "whatsapp" TEXT NOT NULL;
