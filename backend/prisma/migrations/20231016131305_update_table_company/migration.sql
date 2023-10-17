BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_cliente] DROP CONSTRAINT [t_cliente_createdAt_df];
ALTER TABLE [dbo].[t_cliente] ADD CONSTRAINT [t_cliente_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00') FOR [createdAt];

-- AlterTable
ALTER TABLE [dbo].[t_empresa] ADD [token_nfe] NVARCHAR(1000);

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

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
