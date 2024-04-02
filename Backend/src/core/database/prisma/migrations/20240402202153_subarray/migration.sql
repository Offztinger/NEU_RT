-- CreateTable
CREATE TABLE "subarray" (
    "number_subarray" INTEGER NOT NULL,
    "id_subarray" TEXT NOT NULL,

    CONSTRAINT "subarray_pkey" PRIMARY KEY ("number_subarray")
);

-- CreateIndex
CREATE UNIQUE INDEX "subarray_number_subarray_key" ON "subarray"("number_subarray");
