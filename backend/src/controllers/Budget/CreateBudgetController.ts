import { Request, Response } from "express";
import { CreateBudgetService } from "../../services/Budget/CreateBudgetService";

class CreateBudgetController {
   
    async create(request: Request, response: Response) {
        const { budgetData } = request.body;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.create(budgetData);

        return response.json(budget);
    }
    async listBudgetByNumber(request: Request, response: Response) {
        const { id } = request.params;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.listBudgetByNumber(Number(id));

        return response.json(budget);
    }

    async listBudgetByCompany(request: Request, response: Response) {
        const { id } = request.params;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.listBudgetByCompany(Number(id));

        return response.json(budget);
    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.delete(Number(id));

        return response.json(budget);
    }
    async listBudgetToPrint(request: Request, response: Response) {
        const { id } = request.params;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.listBudgetToPrint(Number(id));

        return response.json(budget);
    }
    async updateBudgetStatus(request: Request, response: Response) {
        const { id } = request.params;
        const { statusId, descricao } = request.body;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.updateBudgetStatus(Number(id), Number(statusId), descricao);

        return response.json(budget);
    }
    async listHistoryBudgetStatus(request: Request, response: Response) {
        const { id } = request.params;

        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.listHistoryBudgetStatus(Number(id));

        return response.json(budget);
    }
    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { budgetData } = request.body;
        
        const createBudgetService = new CreateBudgetService();

        const budget = await createBudgetService.update(Number(id), budgetData);

        return response.json(budget);
    }
    async budgetChart(req:Request, res:Response){
        const {id} = req.params
        const createBudgetService = new CreateBudgetService();

        const data = await createBudgetService.budgetChart(Number(id))

        return res.json(data)
    }
} export { CreateBudgetController };
