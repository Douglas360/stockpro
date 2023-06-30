BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_cliente] (
    [id_cliente] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [tipo_cliente] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000),
    [cnpj] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [observacao] NVARCHAR(1000),
    [avatar] NVARCHAR(1000),
    [ativo] BIT CONSTRAINT [t_cliente_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_cliente_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    [id_empresa] INT NOT NULL,
    CONSTRAINT [t_cliente_pkey] PRIMARY KEY CLUSTERED ([id_cliente]),
    CONSTRAINT [t_cliente_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [t_cliente_cnpj_key] UNIQUE NONCLUSTERED ([cnpj]),
    CONSTRAINT [t_cliente_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[t_fornecedor] (
    [id_fornecedor] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [tipo_fornecedor] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000),
    [cnpj] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [observacao] NVARCHAR(1000),
    [avatar] NVARCHAR(1000),
    [ativo] BIT CONSTRAINT [t_fornecedor_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_fornecedor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    [id_empresa] INT NOT NULL,
    CONSTRAINT [t_fornecedor_pkey] PRIMARY KEY CLUSTERED ([id_fornecedor]),
    CONSTRAINT [t_fornecedor_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [t_fornecedor_cnpj_key] UNIQUE NONCLUSTERED ([cnpj]),
    CONSTRAINT [t_fornecedor_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[t_transportadora] (
    [id_transportadora] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [tipo_transportadora] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000),
    [cnpj] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [observacao] NVARCHAR(1000),
    [avatar] NVARCHAR(1000),
    [ativo] BIT CONSTRAINT [t_transportadora_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_transportadora_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    [id_empresa] INT NOT NULL,
    CONSTRAINT [t_transportadora_pkey] PRIMARY KEY CLUSTERED ([id_transportadora]),
    CONSTRAINT [t_transportadora_cpf_key] UNIQUE NONCLUSTERED ([cpf]),
    CONSTRAINT [t_transportadora_cnpj_key] UNIQUE NONCLUSTERED ([cnpj]),
    CONSTRAINT [t_transportadora_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[t_endereco] (
    [id_endereco] INT NOT NULL IDENTITY(1,1),
    [cep] NVARCHAR(1000) NOT NULL,
    [rua] NVARCHAR(1000) NOT NULL,
    [logradouro] NVARCHAR(1000) NOT NULL,
    [numero] NVARCHAR(1000) NOT NULL,
    [bairro] NVARCHAR(1000) NOT NULL,
    [cidade] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [id_cliente] INT,
    [id_fornecedor] INT,
    [id_transportadora] INT,
    CONSTRAINT [t_endereco_pkey] PRIMARY KEY CLUSTERED ([id_endereco])
);

-- CreateTable
CREATE TABLE [dbo].[t_contato] (
    [id_contato] INT NOT NULL IDENTITY(1,1),
    [tipo_contato] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [observacao] NVARCHAR(1000),
    [id_cliente] INT,
    [id_fornecedor] INT,
    [id_transportadora] INT,
    CONSTRAINT [t_contato_pkey] PRIMARY KEY CLUSTERED ([id_contato])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_cliente] ADD CONSTRAINT [t_cliente_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_fornecedor] ADD CONSTRAINT [t_fornecedor_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_transportadora] ADD CONSTRAINT [t_transportadora_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_endereco] ADD CONSTRAINT [t_endereco_id_cliente_fkey] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[t_cliente]([id_cliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_endereco] ADD CONSTRAINT [t_endereco_id_fornecedor_fkey] FOREIGN KEY ([id_fornecedor]) REFERENCES [dbo].[t_fornecedor]([id_fornecedor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_endereco] ADD CONSTRAINT [t_endereco_id_transportadora_fkey] FOREIGN KEY ([id_transportadora]) REFERENCES [dbo].[t_transportadora]([id_transportadora]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_contato] ADD CONSTRAINT [t_contato_id_cliente_fkey] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[t_cliente]([id_cliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_contato] ADD CONSTRAINT [t_contato_id_fornecedor_fkey] FOREIGN KEY ([id_fornecedor]) REFERENCES [dbo].[t_fornecedor]([id_fornecedor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_contato] ADD CONSTRAINT [t_contato_id_transportadora_fkey] FOREIGN KEY ([id_transportadora]) REFERENCES [dbo].[t_transportadora]([id_transportadora]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
