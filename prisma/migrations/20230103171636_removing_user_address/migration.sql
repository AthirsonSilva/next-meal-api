/*
  Warnings:

  - You are about to drop the column `bairroCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `cepCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `cidadeCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `estadoCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `fotoCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `numCasa` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `ruaCliente` on the `tbcliente` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `tbcliente` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `tbcliente_cepcliente_unique` ON `tbcliente`;

-- AlterTable
ALTER TABLE `tbcliente` DROP COLUMN `bairroCliente`,
    DROP COLUMN `cepCliente`,
    DROP COLUMN `cidadeCliente`,
    DROP COLUMN `estadoCliente`,
    DROP COLUMN `fotoCliente`,
    DROP COLUMN `numCasa`,
    DROP COLUMN `ruaCliente`,
    DROP COLUMN `token`;
