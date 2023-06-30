BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [login] NVARCHAR(1000) NOT NULL,
    [senha] NVARCHAR(1000) NOT NULL,
    [avatar] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_usuario_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    [id_empresa] INT NOT NULL,
    CONSTRAINT [t_usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [t_usuario_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [t_usuario_login_key] UNIQUE NONCLUSTERED ([login])
);

-- CreateTable
CREATE TABLE [dbo].[t_empresa] (
    [id_empresa] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [endereco] NVARCHAR(1000) NOT NULL,
    [cnpj] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [telefone] NVARCHAR(1000),
    [ativo] BIT NOT NULL CONSTRAINT [t_empresa_ativo_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [t_empresa_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [t_empresa_pkey] PRIMARY KEY CLUSTERED ([id_empresa]),
    CONSTRAINT [t_empresa_nome_key] UNIQUE NONCLUSTERED ([nome]),
    CONSTRAINT [t_empresa_cnpj_key] UNIQUE NONCLUSTERED ([cnpj]),
    CONSTRAINT [t_empresa_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario] ADD CONSTRAINT [t_usuario_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
