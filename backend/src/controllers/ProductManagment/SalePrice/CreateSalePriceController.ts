import { Request, Response } from "express";
import { CreateSalePriceService } from "../../../services/ProductManagment/SalePrice/CreateSalePriceService";

class CreateSalePriceController {
    async create(req: Request, res: Response) {
        const { descricao, valor } = req.body;

        const createSalePriceService = new CreateSalePriceService();

        const salePrice = await createSalePriceService.create({
            descricao,
            valor: Number(valor),
        });

        return res.json(salePrice);
    }
    async getAll(req: Request, res: Response) {
        const createSalePriceService = new CreateSalePriceService();

        const salePrice = await createSalePriceService.getAll();

        return res.json(salePrice);
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const createSalePriceService = new CreateSalePriceService();

        const salePrice = await createSalePriceService.delete(Number(id));

        return res.json(salePrice);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { descricao, valor } = req.body;

        const createSalePriceService = new CreateSalePriceService();

        const salePrice = await createSalePriceService.update(Number(id), {
            descricao,
            valor: Number(valor),
        });

        return res.json(salePrice);
    }
    
} export { CreateSalePriceController };
