import { Request, Response } from "express";
import { CreateCarrierService } from "../../../services/Register/Carrier/CreateCarrierService";
import { ICarrier } from "../../../types/CarrierTypes";

class CreateCarrierController {
    async create(req: Request, res: Response) {
        const {
            id_empresa,
            nomeCliente,
            tipoCliente,
            emailCliente,
            cpfCliente,
            rgCliente,
            dataNascimentoCliente,
            cnpjCliente,
            telefoneCliente,
            razaoSocialCliente,
            inscricaoEstadualCliente,
            tipoContribuinteCliente,
            inscricaoMunicipalCliente,
            inscricaoSuframaCliente,
            observacaoCliente,
            enderecos,
            contatos
        } = req.body;

        const carrierData: ICarrier = {
            id_empresa,
            nome: nomeCliente,
            tipo_transportadora: tipoCliente,
            email: emailCliente,
            cpf: cpfCliente,
            rg_representante: rgCliente,
            dt_nascimento: dataNascimentoCliente ? new Date(dataNascimentoCliente) : null,
            cnpj: cnpjCliente,
            razao_social: razaoSocialCliente,
            inscricao_estadual: inscricaoEstadualCliente,
            tipo_contribuinte: tipoContribuinteCliente,
            inscricao_municipal: inscricaoMunicipalCliente,
            inscricao_suframa: inscricaoSuframaCliente,
            telefone: telefoneCliente,
            observacao: observacaoCliente,
            endereco: enderecos,
            contato: contatos
        };

        const createCarrierService = new CreateCarrierService();
        const carrier = await createCarrierService.create(carrierData);
        return res.json(carrier);
    }
    async get(req: Request, res: Response) {
        // By Id in search params of request
        const { id } = req.params

        const createCarrierService = new CreateCarrierService();
        const carrier = await createCarrierService.get(Number(id));
        return res.json(carrier);
    }
    async update(req: Request, res: Response) {
        const { carrierData } = req.body;
        const { id } = req.params;
       
        const createCarrierService = new CreateCarrierService();
        const carrier = await createCarrierService.update(Number(id), carrierData);
        return res.json(carrier);
    }

    async getAll(req: Request, res: Response) {
        // By Id in search params of request
        const { id } = req.query;

        const createCarrierService = new CreateCarrierService();
        const carriers = await createCarrierService.getAll(Number(id));
        return res.json(carriers);
    }

    async delete(req: Request, res: Response) {
        // By Id in search params of request
        const { id } = req.params;

        const createCarrierService = new CreateCarrierService();
        const result = await createCarrierService.delete(Number(id));
        return res.json(result);
    }
}

export { CreateCarrierController };
