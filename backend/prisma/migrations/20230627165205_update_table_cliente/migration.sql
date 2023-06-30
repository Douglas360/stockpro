BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[t_endereco] DROP CONSTRAINT [t_endereco_id_cliente_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[t_endereco] DROP CONSTRAINT [t_endereco_id_transportadora_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[t_endereco] ADD CONSTRAINT [t_endereco_id_cliente_fkey] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[t_cliente]([id_cliente]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_endereco] ADD CONSTRAINT [t_endereco_id_transportadora_fkey] FOREIGN KEY ([id_transportadora]) REFERENCES [dbo].[t_transportadora]([id_transportadora]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
