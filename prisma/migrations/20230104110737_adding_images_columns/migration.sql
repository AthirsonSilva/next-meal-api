/*
  Warnings:

  - You are about to drop the `desk_reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `failed_jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `migrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password_resets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personal_access_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photo` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `cullinary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `kitchens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `desk_reservation` DROP FOREIGN KEY `desk_reservation_desk_foreign`;

-- DropForeignKey
ALTER TABLE `desk_reservation` DROP FOREIGN KEY `desk_reservation_reservation_foreign`;

-- AlterTable
ALTER TABLE `clients` ADD COLUMN `photo` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `cullinary` ADD COLUMN `photo` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `kitchens` ADD COLUMN `photo` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `meals` ADD COLUMN `photo` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `desk_reservation`;

-- DropTable
DROP TABLE `failed_jobs`;

-- DropTable
DROP TABLE `migrations`;

-- DropTable
DROP TABLE `password_resets`;

-- DropTable
DROP TABLE `personal_access_tokens`;

-- DropTable
DROP TABLE `users`;
