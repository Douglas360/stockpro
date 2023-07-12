/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `t_nota_fiscal` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[t_nota_fiscal] ADD CONSTRAINT [t_nota_fiscal_ref_key] UNIQUE NONCLUSTERED ([ref]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
