-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bbs_post" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "user_id" UUID NOT NULL,

    CONSTRAINT "bbs_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bbs_comments" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "parent_id" UUID,

    CONSTRAINT "bbs_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE INDEX "bbs_post_created_at_idx" ON "bbs_post"("created_at");

-- CreateIndex
CREATE INDEX "bbs_comments_post_id_parent_id_created_at_idx" ON "bbs_comments"("post_id", "parent_id", "created_at");

-- AddForeignKey
ALTER TABLE "bbs_post" ADD CONSTRAINT "bbs_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bbs_comments" ADD CONSTRAINT "bbs_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bbs_comments" ADD CONSTRAINT "bbs_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "bbs_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bbs_comments" ADD CONSTRAINT "bbs_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "bbs_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
