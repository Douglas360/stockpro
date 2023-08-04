import { Request, Response } from "express";
import { TypeSaleService } from "../../services/TypeSale/TypeSaleService";

class TypeSaleController {
    async listTypeSale(req: Request, res: Response) {

        const typeSaleService = new TypeSaleService();

        const typeSaleResult = await typeSaleService.listTypeSale();

        return res.status(200).json(typeSaleResult);

    }
} export { TypeSaleController }