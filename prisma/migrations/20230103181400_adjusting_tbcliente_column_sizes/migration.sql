/*
  Warnings:

  - You are about to alter the column `nomeCliente` on the `tbcliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(60)`.
  - You are about to alter the column `senhaCliente` on the `tbcliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `tbcliente` MODIFY `nomeCliente` VARCHAR(60) NOT NULL,
    MODIFY `senhaCliente` VARCHAR(60) NOT NULL,
    MODIFY `telefoneCliente` VARCHAR(30) NOT NULL;
