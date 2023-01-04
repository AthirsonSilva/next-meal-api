/*
  Warnings:

  - A unique constraint covering the columns `[cullinary]` on the table `cullinary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kitchen]` on the table `kitchens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cullinary_cullinary_key` ON `cullinary`(`cullinary`);

-- CreateIndex
CREATE UNIQUE INDEX `kitchens_kitchen_key` ON `kitchens`(`kitchen`);

-- CreateIndex
CREATE UNIQUE INDEX `restaurants_name_key` ON `restaurants`(`name`);
