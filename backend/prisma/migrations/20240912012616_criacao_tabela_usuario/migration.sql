-- CreateTable
CREATE TABLE "tbusuario" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "permissao" TEXT NOT NULL,
    "usuario" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "situacao" INTEGER NOT NULL,
    "dtacadastro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbusuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbusuario" ADD CONSTRAINT "tbusuario_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
