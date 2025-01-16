/*
  Warnings:

  - You are about to drop the column `token` on the `OTPCode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `OTPCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `OTPCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OTPCode_token_key";

-- AlterTable
ALTER TABLE "OTPCode" DROP COLUMN "token",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OTPCode_code_key" ON "OTPCode"("code");
