/*
  Warnings:

  - Added the required column `tipopessoaid` to the `tbpessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbpessoa" DROP CONSTRAINT "tbpessoa_nivelatividadeid_fkey";

-- DropForeignKey
ALTER TABLE "tbpessoa" DROP CONSTRAINT "tbpessoa_objetivoid_fkey";

-- DropForeignKey
ALTER TABLE "tbpessoa" DROP CONSTRAINT "tbpessoa_tipofisicoid_fkey";

-- AlterTable
ALTER TABLE "tbpessoa" ADD COLUMN     "tipopessoaid" INTEGER NOT NULL,
ALTER COLUMN "tipofisicoid" DROP NOT NULL,
ALTER COLUMN "nivelatividadeid" DROP NOT NULL,
ALTER COLUMN "objetivoid" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tbtipopessoa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbtipopessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbtipopessoa_descricao_key" ON "tbtipopessoa"("descricao");

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_tipofisicoid_fkey" FOREIGN KEY ("tipofisicoid") REFERENCES "tbtipofisico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_nivelatividadeid_fkey" FOREIGN KEY ("nivelatividadeid") REFERENCES "tbnivelatividade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_objetivoid_fkey" FOREIGN KEY ("objetivoid") REFERENCES "tbobjetivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_tipopessoaid_fkey" FOREIGN KEY ("tipopessoaid") REFERENCES "tbtipopessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
