BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_produto] ADD [codigo_beneficio] NVARCHAR(1000),
[codigo_cest] NVARCHAR(1000),
[codigo_ncm] NVARCHAR(1000),
[numero_fci] NVARCHAR(1000),
[origem] NVARCHAR(1000),
[peso_bruto] FLOAT(53),
[peso_liquido] FLOAT(53),
[vl_fixo_cofins] FLOAT(53),
[vl_fixo_cofins_st] FLOAT(53),
[vl_fixo_pis] FLOAT(53),
[vl_fixo_pis_st] FLOAT(53),
[vl_tribut] FLOAT(53);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
