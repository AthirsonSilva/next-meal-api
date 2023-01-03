/*
  Warnings:

  - A unique constraint covering the columns `[statusReserva]` on the table `tbstatusreserva` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbstatusreserva_statusReserva_key` ON `tbstatusreserva`(`statusReserva`);
