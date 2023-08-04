import prismaClient from "../../prisma";

class TypeSaleService {
    async listTypeSale() {
        const typeSale = await prismaClient.tipoVenda.findMany({
            where: {
                ativo: true,
            },
        });

        return typeSale;
    }
} export { TypeSaleService }