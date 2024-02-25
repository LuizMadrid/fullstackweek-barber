/*
  Warnings:

  - Made the column `userId` on table `Barbershop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Barbershop" DROP CONSTRAINT "Barbershop_userId_fkey";

-- AlterTable
ALTER TABLE "Barbershop" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Barbershop" ADD CONSTRAINT "Barbershop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
