import { Request, Response } from "express";
import { InventoryService } from "../../services/Inventory/InventoryService";

class InventoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const inventoryService = new InventoryService();

        const inventory = await inventoryService.getInventoryById(Number(id));

        return res.json(inventory);
    }
}export { InventoryController };