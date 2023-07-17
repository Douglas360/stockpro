/*
  Warnings:

  - Added the required column `id_usuario` to the `t_historico_situacao_venda` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_historico_situacao_venda] ADD [id_usuario] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_venda] ADD CONSTRAINT [t_historico_situacao_venda_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
