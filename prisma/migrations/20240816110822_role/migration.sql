/*
  Warnings:

  - You are about to drop the column `rolId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_rolId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "rolId",
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 3;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
