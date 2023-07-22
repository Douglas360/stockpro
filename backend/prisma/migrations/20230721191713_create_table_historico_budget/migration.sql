BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_cliente] DROP CONSTRAINT [t_cliente_createdAt_df];
ALTER TABLE [dbo].[t_cliente] ADD CONSTRAINT [t_cliente_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_fornecedor] DROP CONSTRAINT [t_fornecedor_createdAt_df];
ALTER TABLE [dbo].[t_fornecedor] ADD CONSTRAINT [t_fornecedor_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_movimentacao_estoque] DROP CONSTRAINT [t_movimentacao_estoque_data_movimentacao_df];
ALTER TABLE [dbo].[t_movimentacao_estoque] ADD CONSTRAINT [t_movimentacao_estoque_data_movimentacao_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [data_movimentacao];

-- AlterTable
ALTER TABLE [dbo].[t_orcamento] DROP CONSTRAINT [t_orcamento_createdAt_df];
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_produto] DROP CONSTRAINT [t_produto_createdAt_df];
ALTER TABLE [dbo].[t_produto] ADD CONSTRAINT [t_produto_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_transportadora] DROP CONSTRAINT [t_transportadora_createdAt_df];
ALTER TABLE [dbo].[t_transportadora] ADD CONSTRAINT [t_transportadora_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_usuario] DROP CONSTRAINT [t_usuario_createdAt_df];
ALTER TABLE [dbo].[t_usuario] ADD CONSTRAINT [t_usuario_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_venda] DROP CONSTRAINT [t_venda_createdAt_df];
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- CreateTable
CREATE TABLE [dbo].[t_historico_situacao_orcamento] (
    [id_historico_situacao_orcamento] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [id_orcamento] INT NOT NULL,
    [id_situacao_venda] INT NOT NULL,
    [id_usuario] INT NOT NULL,
    [data] DATETIME2 NOT NULL CONSTRAINT [t_historico_situacao_orcamento_data_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [t_historico_situacao_orcamento_pkey] PRIMARY KEY CLUSTERED ([id_historico_situacao_orcamento])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_orcamento] ADD CONSTRAINT [t_historico_situacao_orcamento_id_orcamento_fkey] FOREIGN KEY ([id_orcamento]) REFERENCES [dbo].[t_orcamento]([id_orcamento]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_orcamento] ADD CONSTRAINT [t_historico_situacao_orcamento_id_situacao_venda_fkey] FOREIGN KEY ([id_situacao_venda]) REFERENCES [dbo].[t_situacao_venda]([id_situacao_venda]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_orcamento] ADD CONSTRAINT [t_historico_situacao_orcamento_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
