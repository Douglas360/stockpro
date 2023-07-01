import { Request, Response } from 'express';
import { CreateOrderService } from '../../../services/Order/Product/CreateOrderService';


class CreateOrderController {
    async create(req: Request, res: Response) {
        const { orderData } = req.body;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.create(orderData);

        return res.status(201).json(orderResult);

    }
    async listOrdersByCustomer(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listOrdersByCustomer(Number(id));

        return res.status(200).json(orderResult);

    }
    async listOrdersByCompany(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listOrdersByCompany(Number(id));

        return res.status(200).json(orderResult);

    }
}

export { CreateOrderController };
