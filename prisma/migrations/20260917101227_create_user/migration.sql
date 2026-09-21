/*
  Warnings:

  - Added the required column `grade` to the `Kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kelas` ADD COLUMN `grade` VARCHAR(191) NOT NULL;
