/*
  Warnings:

  - You are about to drop the column `token` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PasswordReset` table. All the data in the column will be lost.
  - Added the required column `email` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_userId_fkey";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "token",
DROP COLUMN "used",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "otp" TEXT NOT NULL;
