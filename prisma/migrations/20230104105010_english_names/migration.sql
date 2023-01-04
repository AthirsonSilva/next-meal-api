/*
  Warnings:

  - You are about to drop the `tbavaliacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbcliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbmesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbmesareserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbprato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbreserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbrestaurante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbstatusreserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbtipoprato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbtiporestaurante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbmesa` DROP FOREIGN KEY `tbmesa_idrestaurante_foreign`;

-- DropForeignKey
ALTER TABLE `tbmesareserva` DROP FOREIGN KEY `tbmesareserva_idmesa_foreign`;

-- DropForeignKey
ALTER TABLE `tbmesareserva` DROP FOREIGN KEY `tbmesareserva_idreserva_foreign`;

-- DropForeignKey
ALTER TABLE `tbprato` DROP FOREIGN KEY `tbprato_idrestaurante_foreign`;

-- DropForeignKey
ALTER TABLE `tbprato` DROP FOREIGN KEY `tbprato_idtipoprato_foreign`;

-- DropForeignKey
ALTER TABLE `tbreserva` DROP FOREIGN KEY `tbreserva_idcliente_foreign`;

-- DropForeignKey
ALTER TABLE `tbreserva` DROP FOREIGN KEY `tbreserva_idrestaurante_foreign`;

-- DropForeignKey
ALTER TABLE `tbreserva` DROP FOREIGN KEY `tbreserva_idstatusreserva_foreign`;

-- DropForeignKey
ALTER TABLE `tbrestaurante` DROP FOREIGN KEY `tbrestaurante_idtiporestaurante_foreign`;

-- DropTable
DROP TABLE `tbavaliacao`;

-- DropTable
DROP TABLE `tbcliente`;

-- DropTable
DROP TABLE `tbmesa`;

-- DropTable
DROP TABLE `tbmesareserva`;

-- DropTable
DROP TABLE `tbprato`;

-- DropTable
DROP TABLE `tbreserva`;

-- DropTable
DROP TABLE `tbrestaurante`;

-- DropTable
DROP TABLE `tbstatusreserva`;

-- DropTable
DROP TABLE `tbtipoprato`;

-- DropTable
DROP TABLE `tbtiporestaurante`;

-- CreateTable
CREATE TABLE `ratings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `restaurant` INTEGER NOT NULL,
    `client` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `clients_cpf_unique`(`cpf`),
    UNIQUE INDEX `clients_email_unique`(`email`),
    UNIQUE INDEX `clients_telefone_unique`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `seats_quantity` INTEGER NOT NULL,
    `occupation_status` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `restaurant` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `desks_restaurant_foreign`(`restaurant`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desk_reservation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `desk` INTEGER UNSIGNED NOT NULL,
    `reservation` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `desk_reservation_desk_foreign`(`desk`),
    INDEX `desk_reservation_reservation_foreign`(`reservation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meals` (
    `idPrato` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `price` DECIMAL(6, 2) NOT NULL,
    `ingredients` VARCHAR(100) NOT NULL,
    `cullinary` INTEGER UNSIGNED NOT NULL,
    `restaurant` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `meals_cullinary_foreign`(`cullinary`),
    INDEX `meals_restaurant_foreign`(`restaurant`),
    PRIMARY KEY (`idPrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `hour` TIME(0) NOT NULL,
    `people_quantity` INTEGER NOT NULL,
    `client` INTEGER UNSIGNED NOT NULL,
    `restaurant` INTEGER UNSIGNED NOT NULL,
    `status` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `reservations_client_foreign`(`client`),
    INDEX `reservations_restaurant_foreign`(`restaurant`),
    INDEX `reservations_status_foreign`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `cnpj` CHAR(14) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `opening_time` TIME(0) NOT NULL,
    `closing_time` TIME(0) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `is_full` BOOLEAN NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `kitchen` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `restaurants_email_key`(`email`),
    INDEX `restaurants_kitchen_foreign`(`kitchen`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(40) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `neighborhood` VARCHAR(100) NOT NULL,
    `restaurant` INTEGER UNSIGNED NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(40) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `addresses_restaurant_foreign`(`restaurant`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statuses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `statuses_status_key`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cullinary` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cullinary` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kitchens` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kitchen` VARCHAR(40) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `desks` ADD CONSTRAINT `desks_restaurant_foreign` FOREIGN KEY (`restaurant`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `desk_reservation` ADD CONSTRAINT `desk_reservation_desk_foreign` FOREIGN KEY (`desk`) REFERENCES `desks`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `desk_reservation` ADD CONSTRAINT `desk_reservation_reservation_foreign` FOREIGN KEY (`reservation`) REFERENCES `reservations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_restaurant_foreign` FOREIGN KEY (`restaurant`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_cullinary_foreign` FOREIGN KEY (`cullinary`) REFERENCES `cullinary`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_client_foreign` FOREIGN KEY (`client`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_restaurant_foreign` FOREIGN KEY (`restaurant`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_status_foreign` FOREIGN KEY (`status`) REFERENCES `statuses`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `restaurants_kitchen_foreign` FOREIGN KEY (`kitchen`) REFERENCES `kitchens`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_restaurant_foreign` FOREIGN KEY (`restaurant`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
