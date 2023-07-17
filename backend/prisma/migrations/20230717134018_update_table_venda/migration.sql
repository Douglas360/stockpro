BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_id_situacao_venda_fkey] FOREIGN KEY ([id_situacao_venda]) REFERENCES [dbo].[t_situacao_venda]([id_situacao_venda]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
