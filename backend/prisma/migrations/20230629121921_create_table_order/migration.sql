BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_venda] (
    [id_venda] INT NOT NULL IDENTITY(1,1),
    [numero_venda] INT,
    [data_venda] DATETIME2 NOT NULL,
    [id_empresa] INT NOT NULL,
    [id_cliente] INT NOT NULL,
    [id_situacao_venda] INT NOT NULL,
    [id_canal_venda] INT NOT NULL,
    [id_user] INT NOT NULL,
    [id_forma_pagamento] INT NOT NULL,
    [id_transportadora] INT,
    [valor_total] FLOAT(53) NOT NULL,
    [valor_desconto] FLOAT(53),
    [valor_frete] FLOAT(53),
    [observacao] NVARCHAR(1000),
    [observacao_interna] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_venda_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [t_venda_pkey] PRIMARY KEY CLUSTERED ([id_venda])
);

-- CreateTable
CREATE TABLE [dbo].[t_item_venda] (
    [id_item_venda] INT NOT NULL IDENTITY(1,1),
    [id_venda] INT NOT NULL,
    [id_produto] INT NOT NULL,
    [quantidade] INT NOT NULL,
    [valor_unitario] FLOAT(53) NOT NULL,
    [valor_total] FLOAT(53) NOT NULL,
    CONSTRAINT [t_item_venda_pkey] PRIMARY KEY CLUSTERED ([id_item_venda])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_id_cliente_fkey] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[t_cliente]([id_cliente]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_venda] ADD CONSTRAINT [t_venda_id_transportadora_fkey] FOREIGN KEY ([id_transportadora]) REFERENCES [dbo].[t_transportadora]([id_transportadora]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_item_venda] ADD CONSTRAINT [t_item_venda_id_venda_fkey] FOREIGN KEY ([id_venda]) REFERENCES [dbo].[t_venda]([id_venda]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_item_venda] ADD CONSTRAINT [t_item_venda_id_produto_fkey] FOREIGN KEY ([id_produto]) REFERENCES [dbo].[t_produto]([id_produto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
