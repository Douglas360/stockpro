/*
  Warnings:

  - You are about to drop the column `cpf_representante` on the `t_cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_representante` on the `t_fornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_representante` on the `t_transportadora` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_cliente] DROP COLUMN [cpf_representante];

-- AlterTable
ALTER TABLE [dbo].[t_fornecedor] DROP COLUMN [cpf_representante];

-- AlterTable
ALTER TABLE [dbo].[t_transportadora] DROP COLUMN [cpf_representante];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
