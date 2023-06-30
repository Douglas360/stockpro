import prismaClient from "../../../prisma";
import { ISalePrice } from "../../../types/SalePrice";

class CreateSalePriceService {
    async create(saleData: ISalePrice) {
        try {
            const salePrice = await prismaClient.lucroSugerido.create({
                data: saleData,
            });

            return salePrice;
        } catch (error: any) {
            throw new Error(error.message);


        }
    }

    async getAll() {
        try {
            const salePrice = await prismaClient.lucroSugerido.findMany();

            return salePrice;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

} export { CreateSalePriceService };