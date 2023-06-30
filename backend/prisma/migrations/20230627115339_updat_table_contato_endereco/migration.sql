BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_contato] ALTER COLUMN [tipo_contato] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_contato] ALTER COLUMN [nome] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [cep] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [rua] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [numero] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [bairro] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [cidade] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ALTER COLUMN [estado] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[t_endereco] ADD [tipo_endereco] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
