BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_cliente] ADD [cpf_representante] NVARCHAR(1000),
[dt_nascimento] DATETIME2,
[inscricao_estadual] NVARCHAR(1000),
[inscricao_municipal] NVARCHAR(1000),
[inscricao_suframa] NVARCHAR(1000),
[razao_social] NVARCHAR(1000),
[rg_representante] NVARCHAR(1000),
[telefone] NVARCHAR(1000),
[tipo_contribuinte] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[t_fornecedor] ADD [cpf_representante] NVARCHAR(1000),
[dt_nascimento] DATETIME2,
[inscricao_estadual] NVARCHAR(1000),
[inscricao_municipal] NVARCHAR(1000),
[inscricao_suframa] NVARCHAR(1000),
[razao_social] NVARCHAR(1000),
[rg_representante] NVARCHAR(1000),
[telefone] NVARCHAR(1000),
[tipo_contribuinte] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[t_transportadora] ADD [cpf_representante] NVARCHAR(1000),
[dt_nascimento] DATETIME2,
[inscricao_estadual] NVARCHAR(1000),
[inscricao_municipal] NVARCHAR(1000),
[inscricao_suframa] NVARCHAR(1000),
[razao_social] NVARCHAR(1000),
[rg_representante] NVARCHAR(1000),
[telefone] NVARCHAR(1000),
[tipo_contribuinte] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
