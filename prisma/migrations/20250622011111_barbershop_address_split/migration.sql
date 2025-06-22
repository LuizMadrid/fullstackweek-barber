/*
  Warnings:

  - You are about to drop the column `address` on the `Barbershop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "address",
ADD COLUMN     "number" TEXT NOT NULL DEFAULT 'S/N',
ADD COLUMN     "street" TEXT NOT NULL DEFAULT 'Rua não informada';
