-- CreateTable
CREATE TABLE "tbcidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoid" INTEGER NOT NULL,
    "codigoibge" INTEGER NOT NULL,

    CONSTRAINT "tbcidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbcidade_nome_estadoid_key" ON "tbcidade"("nome", "estadoid");

-- AddForeignKey
ALTER TABLE "tbcidade" ADD CONSTRAINT "tbcidade_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "tbestado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
