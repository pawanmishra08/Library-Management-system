-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "membership_expiry_date" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_name_key" ON "members"("name");
