-- CreateTable
CREATE TABLE "tbtipofisico" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbtipofisico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbnivelatividade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbnivelatividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbobjetivo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbobjetivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbcontato" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "telefone" VARCHAR(10) NOT NULL,
    "celular" VARCHAR(11) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbcontato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbendereco" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT,
    "cidadeid" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "estadoid" INTEGER NOT NULL,
    "complemento" TEXT NOT NULL,

    CONSTRAINT "tbendereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbpessoa" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sobrenome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "datanascimento" TIMESTAMP(3) NOT NULL,
    "sexo" INTEGER NOT NULL,
    "tipofisicoid" INTEGER NOT NULL,
    "nivelatividadeid" INTEGER NOT NULL,
    "objetivoid" INTEGER NOT NULL,
    "situacao" INTEGER NOT NULL,

    CONSTRAINT "tbpessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbcontato_email_key" ON "tbcontato"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbpessoa_cpf_key" ON "tbpessoa"("cpf");

-- AddForeignKey
ALTER TABLE "tbcontato" ADD CONSTRAINT "tbcontato_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "tbcidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "tbestado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_tipofisicoid_fkey" FOREIGN KEY ("tipofisicoid") REFERENCES "tbtipofisico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_nivelatividadeid_fkey" FOREIGN KEY ("nivelatividadeid") REFERENCES "tbnivelatividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_objetivoid_fkey" FOREIGN KEY ("objetivoid") REFERENCES "tbobjetivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
