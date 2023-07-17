/*
  Warnings:

  - A unique constraint covering the columns `[numero_venda]` on the table `t_venda` will be added. If there are existing duplicate values, this will fail.
  - Made the column `numero_venda` on table `t_venda` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[t_historico_situacao_venda] DROP CONSTRAINT [t_historico_situacao_venda_id_venda_key];

-- AlterTable
ALTER TABLE [dbo].[t_venda] ALTER COLUMN [numero_venda] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_numero_venda_key] UNIQUE NONCLUSTERED ([numero_venda]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
