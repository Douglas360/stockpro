BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_movimentacao_estoque] (
    [id_movimentacao] INT NOT NULL IDENTITY(1,1),
    [id_produto] INT NOT NULL,
    [tipo_movimentacao] NVARCHAR(1000) NOT NULL,
    [quantidade] INT NOT NULL,
    [data_movimentacao] DATETIME2 NOT NULL CONSTRAINT [t_movimentacao_estoque_data_movimentacao_df] DEFAULT CURRENT_TIMESTAMP,
    [id_usuario] INT NOT NULL,
    [id_venda] INT,
    CONSTRAINT [t_movimentacao_estoque_pkey] PRIMARY KEY CLUSTERED ([id_movimentacao])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_movimentacao_estoque] ADD CONSTRAINT [t_movimentacao_estoque_id_produto_fkey] FOREIGN KEY ([id_produto]) REFERENCES [dbo].[t_produto]([id_produto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_movimentacao_estoque] ADD CONSTRAINT [t_movimentacao_estoque_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_movimentacao_estoque] ADD CONSTRAINT [t_movimentacao_estoque_id_venda_fkey] FOREIGN KEY ([id_venda]) REFERENCES [dbo].[t_venda]([id_venda]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
