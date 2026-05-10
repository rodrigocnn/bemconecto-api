/*
  Warnings:

  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `birth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `crp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `User` table. All the data in the column will be lost.
  - The values [PSYCHOLOGIST] on the enum `User_userType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[professionalId,email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[professionalId,cpf]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professionalId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Patient` DROP FOREIGN KEY `Patient_userId_fkey`;

-- DropIndex
DROP INDEX `Appointment_userId_idx` ON `Appointment`;

-- DropIndex
DROP INDEX `Patient_userId_cpf_key` ON `Patient`;

-- DropIndex
DROP INDEX `Patient_userId_email_key` ON `Patient`;

-- DropIndex
DROP INDEX `User_cpf_key` ON `User`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `userId`,
    ADD COLUMN `createdById` VARCHAR(191) NULL,
    ADD COLUMN `professionalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` DROP COLUMN `userId`,
    ADD COLUMN `professionalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `birth`,
    DROP COLUMN `cpf`,
    DROP COLUMN `crp`,
    DROP COLUMN `rg`,
    ADD COLUMN `professionalId` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `userType` ENUM('PROFESSIONAL', 'ASSISTANT', 'ADMIN') NOT NULL;

-- CreateTable
CREATE TABLE `Professional` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `crp` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Professional_email_key`(`email`),
    UNIQUE INDEX `Professional_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Appointment_professionalId_idx` ON `Appointment`(`professionalId`);

-- CreateIndex
CREATE INDEX `Appointment_createdById_idx` ON `Appointment`(`createdById`);

-- CreateIndex
CREATE INDEX `Patient_professionalId_idx` ON `Patient`(`professionalId`);

-- CreateIndex
CREATE UNIQUE INDEX `Patient_professionalId_email_key` ON `Patient`(`professionalId`, `email`);

-- CreateIndex
CREATE UNIQUE INDEX `Patient_professionalId_cpf_key` ON `Patient`(`professionalId`, `cpf`);

-- CreateIndex
CREATE INDEX `User_professionalId_idx` ON `User`(`professionalId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
