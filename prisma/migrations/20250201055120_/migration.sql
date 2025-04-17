-- CreateTable
CREATE TABLE "borrowers" (
    "id" SERIAL NOT NULL,
    "issuse_date" INTEGER NOT NULL DEFAULT 0,
    "due_date" INTEGER NOT NULL DEFAULT 0,
    "return_date" INTEGER NOT NULL DEFAULT 0,
    "book_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,

    CONSTRAINT "borrowers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "borrowers" ADD CONSTRAINT "borrowers_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowers" ADD CONSTRAINT "borrowers_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
