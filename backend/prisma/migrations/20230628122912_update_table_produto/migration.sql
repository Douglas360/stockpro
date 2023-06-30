/*
  Warnings:

  - You are about to drop the column `altura` on the `t_produto` table. All the data in the column will be lost.
  - You are about to drop the column `comprimento` on the `t_produto` table. All the data in the column will be lost.
  - You are about to drop the column `largura` on the `t_produto` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `t_produto` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_produto] DROP COLUMN [altura],
[comprimento],
[largura],
[peso];
ALTER TABLE [dbo].[t_produto] ADD [altura_cm] FLOAT(53),
[comprimento_cm] FLOAT(53),
[largura_cm] FLOAT(53),
[peso_kg] FLOAT(53);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
