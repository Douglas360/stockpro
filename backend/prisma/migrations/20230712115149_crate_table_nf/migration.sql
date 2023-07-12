BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_nota_fiscal] (
    [id_nfe] INT NOT NULL IDENTITY(1,1),
    [id_empresa] INT NOT NULL,
    [ref] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [status_sefaz] NVARCHAR(1000),
    [chave_nfe] NVARCHAR(1000),
    [numero_nfe] NVARCHAR(1000),
    [caminho_xml] NVARCHAR(1000),
    [caminho_pdf] NVARCHAR(1000),
    [data_emissao] DATETIME2,
    CONSTRAINT [t_nota_fiscal_pkey] PRIMARY KEY CLUSTERED ([id_nfe])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_nota_fiscal] ADD CONSTRAINT [t_nota_fiscal_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
