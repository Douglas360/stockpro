BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_lucro_sugerido] (
    [id_lucro_sugerido] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [valor] FLOAT(53),
    CONSTRAINT [t_lucro_sugerido_pkey] PRIMARY KEY CLUSTERED ([id_lucro_sugerido])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
