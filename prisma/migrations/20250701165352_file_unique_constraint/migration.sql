/*
  Warnings:

  - A unique constraint covering the columns `[dir_url,name]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "File_dir_url_name_key" ON "File"("dir_url", "name");
