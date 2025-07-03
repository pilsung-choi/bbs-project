/*
  Warnings:

  - A unique constraint covering the columns `[id,created_at]` on the table `bbs_post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bbs_post_id_created_at_key" ON "bbs_post"("id", "created_at");
