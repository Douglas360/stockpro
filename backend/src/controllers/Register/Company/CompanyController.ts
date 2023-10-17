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
        const {
            nome,
            nome_fantasia,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            inscr_estadual,
            cnpj,
            email,
            telefone,
            token_nfe

        } = req.body;
        const { file } = req;
        const companyData = {
            id: Number(id), //without when update
            nome,
            nome_fantasia,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            inscr_estadual,
            cnpj,
            email,
            telefone,
            folderName: 'fotos/empresa', //without when update
            file: file, //without when update
            token_nfe
        } as ICompany;

        //console.log(companyData)
        //return res.json(companyData)

        const companyService = new CompanyService();

        const company = await companyService.update(companyData);

        return res.json(company);
    }

}

export { CompanyController };