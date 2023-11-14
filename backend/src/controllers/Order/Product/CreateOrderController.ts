import { Request, Response } from 'express';
import { CreateOrderService } from '../../../services/Order/Product/CreateOrderService';


class CreateOrderController {
    async create(req: Request, res: Response) {
        const { orderData } = req.body;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.create(orderData);

        return res.status(201).json(orderResult);

    }
    async listOrderByNumber(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listOrderByNumber(Number(id));

        return res.status(200).json(orderResult);

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
    async listSalesStatus(req: Request, res: Response) {

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listSalesStatus();

        return res.status(200).json(orderResult);

    }
    async listHistorySalesStatus(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listHistorySalesStatus(Number(id));

        return res.status(200).json(orderResult);

    }
    async updateOrderStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { statusId, descricao, idUser } = req.body;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.updateOrderStatus(Number(id), Number(statusId), descricao, Number(idUser));

        return res.status(200).json(orderResult);

    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.delete(Number(id));

        return res.status(200).json(orderResult);

    }
    async cancelOrder(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.cancel(Number(id));

        return res.status(200).json(orderResult);

    }
    async listOrderToPrint(req: Request, res: Response) {
        const { id } = req.params;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.listOrderToPrint(Number(id));

        return res.status(200).json(orderResult);

    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { orderData } = req.body;

        const createOrderService = new CreateOrderService();

        const orderResult = await createOrderService.update(Number(id), orderData);

        return res.status(200).json(orderResult);

    }
    async salesChart(req: Request, res: Response) {
        const { id } = req.params;
        const createOrderService = new CreateOrderService();

        const saleDate = await createOrderService.salesChart(Number(id))

        return res.status(200).json(saleDate)
    }
}

export { CreateOrderController };
