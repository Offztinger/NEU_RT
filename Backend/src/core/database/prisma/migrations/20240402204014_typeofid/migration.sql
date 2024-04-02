/*
  Warnings:

  - Changed the type of `id_subarray` on the `subarray` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "subarray" DROP COLUMN "id_subarray",
ADD COLUMN     "id_subarray" INTEGER NOT NULL;
