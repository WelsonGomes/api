-- CreateTable
CREATE TABLE "tbestado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbestado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbestado_nome_key" ON "tbestado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tbestado_uf_key" ON "tbestado"("uf");
