import { Request, Response } from "express";
import { CreateCustomerService } from "../../../services/Register/Customer/CreateCustomerService";
import { ICustomer } from "../../../types/CustomerTypes";

class CreateCustomerController {
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

        const customerData: ICustomer = {
            id_empresa,
            nome: nomeCliente,
            tipo_cliente: tipoCliente,
            email: emailCliente,
            cpf: cpfCliente,
            rg_representante: rgCliente,
            dt_nascimento: dataNascimentoCliente ? new Date(dataNascimentoCliente) : null,
            cnpj: cnpjCliente,
            razao_social: razaoSocialCliente,
            inscricao_estadual: inscricaoEstadualCliente ? inscricaoEstadualCliente : 'ISENTO',
            tipo_contribuinte: tipoContribuinteCliente,
            inscricao_municipal: inscricaoMunicipalCliente,
            inscricao_suframa: inscricaoSuframaCliente,
            telefone: telefoneCliente,
            observacao: observacaoCliente,
            endereco: enderecos,
            contato: contatos
        };

        const createCustomerService = new CreateCustomerService();
        const customer = await createCustomerService.create(customerData);
        return res.json(customer);
    }

    async getAll(req: Request, res: Response) {
        // By Id in search params of request
        const { id } = req.query;

        const createCustomerService = new CreateCustomerService();
        const customer = await createCustomerService.getAll(Number(id));
        return res.json(customer);
    }

    async delete(req: Request, res: Response) {
        // By Id in search params of request
        const { id } = req.params;

        const createCustomerService = new CreateCustomerService();
        const customer = await createCustomerService.delete(Number(id));
        return res.json(customer);
    }

}

export { CreateCustomerController };
