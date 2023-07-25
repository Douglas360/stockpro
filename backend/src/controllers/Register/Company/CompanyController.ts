import { Request, Response } from "express";
import { CompanyService } from "../../../services/Register/Company/CompanyService";
import { ICompany } from "../../../types/CompanyTypes";




class CompanyController {
    async create(req: Request, res: Response) {
        const { companyData } = req.body;

        const companyService = new CompanyService();

        const company = await companyService.create(companyData as ICompany);

        return res.json(company);
    }
    async listCompanyById(req: Request, res: Response) {
        const { id } = req.params;

        const companyService = new CompanyService();

        const company = await companyService.listCompanyById(Number(id));

        return res.json(company);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { companyData } = req.body;
        const { file } = req;
        console.log(req)

        //delete avatar in companyData
        delete companyData.file

        const companyService = new CompanyService();

        const company = await companyService.update(Number(id), companyData as ICompany, file as any);

        return res.json(company);
    }

}

export { CompanyController };