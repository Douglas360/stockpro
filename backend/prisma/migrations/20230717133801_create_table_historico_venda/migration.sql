/*
  Warnings:

  - You are about to drop the column `valor_produtos` on the `t_venda` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_venda] DROP COLUMN [valor_produtos];
ALTER TABLE [dbo].[t_venda] ADD [valor_produto] FLOAT(53);

-- CreateTable
CREATE TABLE [dbo].[t_situacao_venda] (
    [id_situacao_venda] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [cor] NVARCHAR(1000),
    [ativo] BIT CONSTRAINT [t_situacao_venda_ativo_df] DEFAULT 1,
    CONSTRAINT [t_situacao_venda_pkey] PRIMARY KEY CLUSTERED ([id_situacao_venda])
);

-- CreateTable
CREATE TABLE [dbo].[t_historico_situacao_venda] (
    [id_historico_situacao_venda] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000),
    [id_venda] INT NOT NULL,
    [id_situacao_venda] INT NOT NULL,
    [data] DATETIME2 NOT NULL CONSTRAINT [t_historico_situacao_venda_data_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [t_historico_situacao_venda_pkey] PRIMARY KEY CLUSTERED ([id_historico_situacao_venda])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_venda] ADD CONSTRAINT [t_historico_situacao_venda_id_venda_fkey] FOREIGN KEY ([id_venda]) REFERENCES [dbo].[t_venda]([id_venda]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_historico_situacao_venda] ADD CONSTRAINT [t_historico_situacao_venda_id_situacao_venda_fkey] FOREIGN KEY ([id_situacao_venda]) REFERENCES [dbo].[t_situacao_venda]([id_situacao_venda]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
