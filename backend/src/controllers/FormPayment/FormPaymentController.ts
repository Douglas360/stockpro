import { Request, Response } from "express";
import { FormPaymentService } from "../../services/FormPayment/FormPaymentService";

class FormPaymentController {
    async list(request: Request, response: Response) {
        const formPaymentService = new FormPaymentService();
        const formPayments = await formPaymentService.list();
        return response.json(formPayments);
    }
}export { FormPaymentController }
