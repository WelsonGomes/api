-- AlterTable
ALTER TABLE "tbcliente" DROP COLUMN "contratoid";

-- CreateTable
CREATE TABLE "tbcontrato" (
    "id" SERIAL NOT NULL,
    "contrato" INTEGER NOT NULL,
    "clienteid" INTEGER NOT NULL,
    "dtinicio" TIMESTAMP(3) NOT NULL,
    "qtdmeses" INTEGER NOT NULL,
    "dttermino" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(17,2) NOT NULL,
    "valormensal" DECIMAL(17,2) NOT NULL,
    "responsavel" VARCHAR(100) NOT NULL,
    "dtcadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cedente" TEXT NOT NULL,
    "cessionaria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "dtassinatura" TIMESTAMP(3) NOT NULL,
    "dtatualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbcontrato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbcontrato_contrato_key" ON "tbcontrato"("contrato");

-- AddForeignKey
ALTER TABLE "tbcontrato" ADD CONSTRAINT "tbcontrato_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "tbcliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
