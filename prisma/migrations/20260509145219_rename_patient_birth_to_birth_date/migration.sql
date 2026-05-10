/*
  Warnings:

  - You are about to drop the column `birth` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Patient` DROP COLUMN `birth`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL;
