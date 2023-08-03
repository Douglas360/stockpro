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
CREATE TABLE [dbo].[t_forma_pagamento] (
    [id_forma_pagamento] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [ativo] BIT CONSTRAINT [t_forma_pagamento_ativo_df] DEFAULT 1,
    CONSTRAINT [t_forma_pagamento_pkey] PRIMARY KEY CLUSTERED ([id_forma_pagamento])
);

-- CreateTable
CREATE TABLE [dbo].[t_pagamento] (
    [id_pagamento] INT NOT NULL IDENTITY(1,1),
    [id_venda] INT NOT NULL,
    [parcelado] BIT NOT NULL,
    [id_forma_pagamento] INT NOT NULL,
    [vencimento] DATETIME2 NOT NULL,
    [valor] FLOAT(53) NOT NULL,
    [realizado] BIT NOT NULL CONSTRAINT [t_pagamento_realizado_df] DEFAULT 0,
    [data_realizado] DATETIME2,
    [observacao] NVARCHAR(1000),
    CONSTRAINT [t_pagamento_pkey] PRIMARY KEY CLUSTERED ([id_pagamento])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_pagamento] ADD CONSTRAINT [t_pagamento_id_venda_fkey] FOREIGN KEY ([id_venda]) REFERENCES [dbo].[t_venda]([id_venda]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_pagamento] ADD CONSTRAINT [t_pagamento_id_forma_pagamento_fkey] FOREIGN KEY ([id_forma_pagamento]) REFERENCES [dbo].[t_forma_pagamento]([id_forma_pagamento]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
