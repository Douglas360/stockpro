import { Request, Response } from "express";
import { CreateInvoiceService } from "../../services/Invoice/CreateInvoiceService";
import { CreateInvoiceServiceRequest } from "../../types/CreateInvoiceTypes";

class CreateInvoiceController {
    async create(req: Request, res: Response): Promise<Response> {
        const createInvoiceService = new CreateInvoiceService();

        const data: CreateInvoiceServiceRequest = req.body;

        const result = await createInvoiceService.create(data);
        return res.status(200).json(result);

    }
    async getInvoiceData(req: Request, res: Response): Promise<Response> {
        const createInvoiceService = new CreateInvoiceService();

        const { ref } = req.params;

        const result = await createInvoiceService.getInvoiceData(Number(ref));
        return res.status(200).json(result);

    }

    async getInvoice(req: Request, res: Response): Promise<Response> {
        const createInvoiceService = new CreateInvoiceService();

        const { id } = req.params;

        const result = await createInvoiceService.getInvoice(Number(id));
        return res.status(200).json(result);

    }

    async cancelInvoice(req: Request, res: Response): Promise<Response> {
        const createInvoiceService = new CreateInvoiceService();

        const { id } = req.params;
        const { reason } = req.body;
             const result = await createInvoiceService.cancelInvoice(id, reason);
        return res.status(200).json(result);

    }



} export { CreateInvoiceController };