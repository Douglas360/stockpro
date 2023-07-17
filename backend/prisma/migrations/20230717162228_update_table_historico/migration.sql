/*
  Warnings:

  - A unique constraint covering the columns `[id_venda]` on the table `t_historico_situacao_venda` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[t_historico_situacao_venda] ADD CONSTRAINT [t_historico_situacao_venda_id_venda_key] UNIQUE NONCLUSTERED ([id_venda]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
