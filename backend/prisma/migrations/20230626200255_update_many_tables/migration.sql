/*
  Warnings:

  - You are about to drop the column `logradouro` on the `t_endereco` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[t_cliente] DROP CONSTRAINT [t_cliente_cnpj_key];

-- DropIndex
ALTER TABLE [dbo].[t_cliente] DROP CONSTRAINT [t_cliente_cpf_key];

-- DropIndex
ALTER TABLE [dbo].[t_cliente] DROP CONSTRAINT [t_cliente_email_key];

-- DropIndex
ALTER TABLE [dbo].[t_fornecedor] DROP CONSTRAINT [t_fornecedor_cnpj_key];

-- DropIndex
ALTER TABLE [dbo].[t_fornecedor] DROP CONSTRAINT [t_fornecedor_cpf_key];

-- DropIndex
ALTER TABLE [dbo].[t_transportadora] DROP CONSTRAINT [t_transportadora_cnpj_key];

-- DropIndex
ALTER TABLE [dbo].[t_transportadora] DROP CONSTRAINT [t_transportadora_cpf_key];

-- DropIndex
ALTER TABLE [dbo].[t_transportadora] DROP CONSTRAINT [t_transportadora_email_key];

-- AlterTable
ALTER TABLE [dbo].[t_endereco] DROP COLUMN [logradouro];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
