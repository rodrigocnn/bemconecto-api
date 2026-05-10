/*
  Warnings:

  - Added the required column `patientId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `patientId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Session_patientId_idx` ON `Session`(`patientId`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Session` RENAME INDEX `Session_professionalId_fkey` TO `Session_professionalId_idx`;
