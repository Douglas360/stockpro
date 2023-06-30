BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_controle_estoque] (
    [id_estoque] INT NOT NULL IDENTITY(1,1),
    [id_produto] INT NOT NULL,
    [quantidade] INT,
    [estoque_min] INT,
    [estoque_max] INT,
    [data_ultima_entrada] DATETIME2,
    [data_ultima_saida] DATETIME2,
    CONSTRAINT [t_controle_estoque_pkey] PRIMARY KEY CLUSTERED ([id_estoque]),
    CONSTRAINT [t_controle_estoque_id_produto_key] UNIQUE NONCLUSTERED ([id_produto])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_controle_estoque] ADD CONSTRAINT [t_controle_estoque_id_produto_fkey] FOREIGN KEY ([id_produto]) REFERENCES [dbo].[t_produto]([id_produto]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
