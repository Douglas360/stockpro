import prismaClient from "../../prisma";

class CreateDashboardService {
    async getTotalConcretizedSales(id_company: number): Promise<any> {
        try {
            const totalSales = await prismaClient.venda.count({
                where: {
                    id_empresa: id_company,
                    id_situacao_venda: 1,
                }
            });

            return totalSales;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
} export { CreateDashboardService };