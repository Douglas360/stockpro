import { Request, Response } from "express";
import { CreateDashboardService } from "../../services/Dashboard/CreateDashboardService";


class CreateDashboardController {
    async getTotalConcretizedSales(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getTotalConcretizedSales(Number(id));

        return res.json(dashboard);
    }

} export { CreateDashboardController };