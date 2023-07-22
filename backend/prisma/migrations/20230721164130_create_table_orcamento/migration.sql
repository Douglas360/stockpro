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
CREATE TABLE [dbo].[t_orcamento] (
    [id_orcamento] INT NOT NULL IDENTITY(1,1),
    [numero_orcamento] INT NOT NULL,
    [data_orcamento] DATETIME2 NOT NULL,
    [id_empresa] INT NOT NULL,
    [id_cliente] INT,
    [id_situacao_venda] INT NOT NULL,
    [id_canal_orcamento] INT,
    [id_user] INT,
    [id_forma_pagamento] INT,
    [id_transportadora] INT,
    [valor_total] FLOAT(53) NOT NULL,
    [valor_produto] FLOAT(53),
    [valor_desconto] FLOAT(53),
    [valor_frete] FLOAT(53),
    [observacao] NVARCHAR(1000),
    [observacao_interna] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_orcamento_createdAt_df] DEFAULT SWITCHOFFSET(GETDATE(), '-03:00'),
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [t_orcamento_pkey] PRIMARY KEY CLUSTERED ([id_orcamento]),
    CONSTRAINT [t_orcamento_numero_orcamento_key] UNIQUE NONCLUSTERED ([numero_orcamento])
);

-- CreateTable
CREATE TABLE [dbo].[t_item_orcamento] (
    [id_item_orcamento] INT NOT NULL IDENTITY(1,1),
    [id_orcamento] INT NOT NULL,
    [id_produto] INT NOT NULL,
    [numero_item] INT,
    [quantidade] INT NOT NULL,
    [valor_unitario] FLOAT(53) NOT NULL,
    [valor_total] FLOAT(53) NOT NULL,
    CONSTRAINT [t_item_orcamento_pkey] PRIMARY KEY CLUSTERED ([id_item_orcamento])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_id_cliente_fkey] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[t_cliente]([id_cliente]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_id_transportadora_fkey] FOREIGN KEY ([id_transportadora]) REFERENCES [dbo].[t_transportadora]([id_transportadora]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_orcamento] ADD CONSTRAINT [t_orcamento_id_situacao_venda_fkey] FOREIGN KEY ([id_situacao_venda]) REFERENCES [dbo].[t_situacao_venda]([id_situacao_venda]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_item_orcamento] ADD CONSTRAINT [t_item_orcamento_id_orcamento_fkey] FOREIGN KEY ([id_orcamento]) REFERENCES [dbo].[t_orcamento]([id_orcamento]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_item_orcamento] ADD CONSTRAINT [t_item_orcamento_id_produto_fkey] FOREIGN KEY ([id_produto]) REFERENCES [dbo].[t_produto]([id_produto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
