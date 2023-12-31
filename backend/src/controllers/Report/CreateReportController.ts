import { Request, Response } from "express";
import { CreateReportService } from "../../services/Report/CreateReportService";

class CreateReportController {
    async getCustomerReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        // ativo string to boolean conversion 
        if (report.ativo === 'true') {
            report.ativo = true;
        } else if (report.ativo === 'false') {
            report.ativo = false;
        }

        const reportCreated = await createReportService.getCustomerReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getProductReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        // ativo string to boolean conversion
        if (report.ativo === 'true') {
            report.ativo = true;
        } else if (report.ativo === 'false') {
            report.ativo = false;
        }

        const reportCreated = await createReportService.getProductReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getBudgetReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        const reportCreated = await createReportService.getBudgetReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getSaleReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        const reportCreated = await createReportService.getSaleReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getProductsSalesReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        const reportCreated = await createReportService.getProductsSalesReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getSupplierReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        // ativo string to boolean conversion
        if (report.ativo === 'true') {
            report.ativo = true;
        } else if (report.ativo === 'false') {
            report.ativo = false;
        }

        const reportCreated = await createReportService.getSupplierReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getCarrierReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        // ativo string to boolean conversion
        if (report.ativo === 'true') {
            report.ativo = true;
        } else if (report.ativo === 'false') {
            report.ativo = false;
        }

        const reportCreated = await createReportService.getCarrierReport(Number(id), report);

        return res.json(reportCreated);
    }
    async getCustomersSalesReport(req: Request, res: Response) {
        const { id } = req.params;
        const { report } = req.body;

        const createReportService = new CreateReportService();

        const reportCreated = await createReportService.getCustomersSalesReport(Number(id), report);

        return res.json(reportCreated);
    }
} export { CreateReportController }