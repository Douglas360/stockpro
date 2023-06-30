import { Request, Response } from "express";
import { CompanyService } from "../../../services/Register/Company/CompanyService";
import { ICompany } from "../../../types/CompanyTypes";




class CompanyController {
    async create(req: Request, res: Response) {
        const { nome, endereco, cnpj, email, telefone, } = req.body;

        const companyService = new CompanyService();

        const data: ICompany = {
            nome,
            endereco,
            cnpj,
            email,
            telefone,           
        };

        const company = await companyService.create(data);

        return res.json(company);
    }

}

export { CompanyController };