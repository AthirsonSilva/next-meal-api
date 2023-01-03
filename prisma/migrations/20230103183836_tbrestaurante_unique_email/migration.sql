/*
  Warnings:

  - A unique constraint covering the columns `[emailRestaurante]` on the table `tbrestaurante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbrestaurante_emailRestaurante_key` ON `tbrestaurante`(`emailRestaurante`);
