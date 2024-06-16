/*
  Warnings:

  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "emblems" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmblemsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmblemsToUser_AB_unique" ON "_EmblemsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EmblemsToUser_B_index" ON "_EmblemsToUser"("B");

-- AddForeignKey
ALTER TABLE "_EmblemsToUser" ADD CONSTRAINT "_EmblemsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "emblems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmblemsToUser" ADD CONSTRAINT "_EmblemsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
