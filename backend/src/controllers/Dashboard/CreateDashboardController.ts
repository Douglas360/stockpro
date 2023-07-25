import { Request, Response } from "express";
import { CreateDashboardService } from "../../services/Dashboard/CreateDashboardService";


class CreateDashboardController {
    async getTotalConcretizedSales(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getTotalConcretizedSales(Number(id));

        return res.json(dashboard);
    }
    async getInventoryValue(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getInventoryValue(Number(id));

        return res.json(dashboard);
    }
    async getMovementInventory(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getMovementInventory(Number(id));

        return res.json(dashboard);
    }
    async getSalesByMonth(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getSalesByMonth(Number(id));

        return res.json(dashboard);
    }
    async getBudgetsByMonth(req: Request, res: Response) {
        const { id } = req.params;

        const createDashboardService = new CreateDashboardService();

        const dashboard = await createDashboardService.getBudgetsByMonth(Number(id));

        return res.json(dashboard);
    }

} export { CreateDashboardController };