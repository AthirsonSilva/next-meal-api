/*
  Warnings:

  - You are about to drop the column `cullinary` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the `cullinary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `culinary` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `meals` DROP FOREIGN KEY `meals_cullinary_foreign`;

-- AlterTable
ALTER TABLE `meals` DROP COLUMN `cullinary`,
    ADD COLUMN `culinary` INTEGER UNSIGNED NOT NULL;

-- DropTable
DROP TABLE `cullinary`;

-- CreateTable
CREATE TABLE `culinary` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `culinary` VARCHAR(20) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `culinary_culinary_key`(`culinary`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `meals_culinary_foreign` ON `meals`(`culinary`);

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_culinary_foreign` FOREIGN KEY (`culinary`) REFERENCES `culinary`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
