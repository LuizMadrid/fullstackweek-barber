/*
  Warnings:

  - A unique constraint covering the columns `[phone1]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone2]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "phone1" TEXT NOT NULL DEFAULT '11999999999',
ADD COLUMN     "phone2" TEXT NOT NULL DEFAULT '11999999999';

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_phone1_key" ON "Barbershop"("phone1");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_phone2_key" ON "Barbershop"("phone2");
