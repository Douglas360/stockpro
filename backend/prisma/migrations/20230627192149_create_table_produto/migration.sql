BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_produto] (
    [id_produto] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [codigo_interno] NVARCHAR(1000),
    [codigo_barra] NVARCHAR(1000),
    [movimenta_estoque] BIT,
    [habilitar_nfce] BIT,
    [validade] BIT,
    [descricao] NVARCHAR(1000),
    [peso] FLOAT(53),
    [altura] FLOAT(53),
    [largura] FLOAT(53),
    [comprimento] FLOAT(53),
    [ativo] BIT CONSTRAINT [t_produto_ativo_df] DEFAULT 1,
    [valor_custo] FLOAT(53),
    [despesas_acessorias] FLOAT(53),
    [despesas_outras] FLOAT(53),
    [custo_final] FLOAT(53),
    [valor_venda] FLOAT(53),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_produto_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    [id_empresa] INT NOT NULL,
    CONSTRAINT [t_produto_pkey] PRIMARY KEY CLUSTERED ([id_produto])
);

-- CreateTable
CREATE TABLE [dbo].[t_campos_extra] (
    [id_campo_extra] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [conteudo] NVARCHAR(1000),
    [id_produto] INT NOT NULL,
    CONSTRAINT [t_campos_extra_pkey] PRIMARY KEY CLUSTERED ([id_campo_extra])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_produto] ADD CONSTRAINT [t_produto_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_campos_extra] ADD CONSTRAINT [t_campos_extra_id_produto_fkey] FOREIGN KEY ([id_produto]) REFERENCES [dbo].[t_produto]([id_produto]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
