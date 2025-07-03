-- DropIndex
DROP INDEX "bbs_post_created_at_idx";

-- CreateIndex
CREATE INDEX "bbs_post_id_created_at_idx" ON "bbs_post"("id", "created_at");
