import { Request, Response } from 'express';
import { CreateOrderService } from '../../../services/Order/Product/CreateOrderService';


class CreateOrderController {
    async create(req: Request, res: Response) {
        const { orderData } = req.body;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.create(orderData);

        return res.status(201).json(orderResult);

    }
}

export { CreateOrderController };
