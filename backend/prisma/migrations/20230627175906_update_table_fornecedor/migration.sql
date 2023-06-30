BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[t_fornecedor] DROP CONSTRAINT [t_fornecedor_email_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
