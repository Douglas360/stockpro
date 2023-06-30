BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_produto] ADD [id_fornecedor] INT;

-- AddForeignKey
ALTER TABLE [dbo].[t_produto] ADD CONSTRAINT [t_produto_id_fornecedor_fkey] FOREIGN KEY ([id_fornecedor]) REFERENCES [dbo].[t_fornecedor]([id_fornecedor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
