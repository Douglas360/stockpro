/*
  Warnings:

  - You are about to drop the column `endereco` on the `t_empresa` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_empresa] DROP COLUMN [endereco];
ALTER TABLE [dbo].[t_empresa] ADD [logradouro] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
