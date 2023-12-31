BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_empresa] ADD [bairro] NVARCHAR(1000),
[cep] NVARCHAR(1000),
[cidade] NVARCHAR(1000),
[complemento] NVARCHAR(1000),
[estado] NVARCHAR(1000),
[numero] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
