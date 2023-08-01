import { Request, Response } from "express";
import { CreateSupplierService } from "../../../services/Register/Supplier/CreateSupplierService";
import { ISupplier } from "../../../types/SupplierTypes";

class CreateSupplierController {
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
            contatos,
            //situacaoCliente
        } = req.body;
        //console.log(situacaoCliente)

        const supplierData: ISupplier = {
            id_empresa,
            nome: nomeCliente,
            tipo_fornecedor: tipoCliente,
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
            contato: contatos,
            //ativo: situacaoCliente === '1' ? true : false

        };

        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.create(supplierData);
        return res.json(supplier);
    }
    async get(req: Request, res: Response) {
        //By Id in search params of request
        const { id } = req.params;

        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.get(Number(id));
        return res.json(supplier);
    }
    async update(req: Request, res: Response) {
        //By Id in search params of request
        const { id } = req.params;
        const { supplierData } = req.body;

        supplierData.ativo = supplierData.ativo === 'true' ? true : false;

        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.update(Number(id), supplierData);
        return res.json(supplier);
    }
    async getAll(req: Request, res: Response) {
        //By Id in search params of request
        const { id } = req.query;

        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.getAll(Number(id));
        return res.json(supplier);
    }
    async delete(req: Request, res: Response) {
        //By Id in search params of request
        const { id } = req.params;

        const createSupplierService = new CreateSupplierService();
        const supplier = await createSupplierService.delete(Number(id));
        return res.json(supplier);
    }
} export { CreateSupplierController };