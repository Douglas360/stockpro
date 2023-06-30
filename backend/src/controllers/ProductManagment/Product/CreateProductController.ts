import { Request, Response } from "express";
import { CreateProductService } from "../../../services/ProductManagment/Product/CreateProductService";

class CreateProductController {
    async create(req: Request, res: Response) {
        const {
            nomeProduto,
            codigoInterno,
            codigoBarra,
            movimentaEstoque,
            habilitarNf,
            validade,
            pesoProduto,
            alturaProduto,
            larguraProduto,
            comprimentoProduto,
            camposExtras,
            descricaoProduto,
            id_empresa,
            valorCusto,
            despesasAcessorias,
            outrasDespesas,
            custoFinal,
            valorVendaUtilizado,
            estoqueMinimo,
            estoqueMaximo,
            estoqueAtual,
            codigoNcm,
            codigoCest,
            codigoBeneficio,
            origemProduto,
            pesoLiquido,
            pesoBruto,
            numeroFci,
            VrAproxTribut,
            valorFixoPis,
            valorFixoCofins,
            valorFixoPisSt,
            valorFixoCofinsSt,
            fornecedor,
        } = req.body;
        console.log(fornecedor)
        const estoqueData = {
            estoque_min: Number(estoqueMinimo) || 0,
            estoque_max: Number(estoqueMaximo) || 0,
            quantidade: Number(estoqueAtual) || 0,
            data_ultima_entrada: new Date(),
        }

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            nome: nomeProduto,
            codigo_interno: codigoInterno,
            codigo_barra: codigoBarra,
            movimenta_estoque: Boolean(movimentaEstoque),
            habilitar_nfce: Boolean(habilitarNf),
            validade: Boolean(validade),
            peso_kg: Number(pesoProduto) || 0,
            altura_cm: Number(alturaProduto) || 0,
            largura_cm: Number(larguraProduto) || 0,
            comprimento_cm: Number(comprimentoProduto) || 0,
            descricao: descricaoProduto,
            id_empresa: Number(id_empresa),
            campos: {
                create: camposExtras,
            },
            valor_custo: Number(valorCusto) || 0,
            despesas_acessorias: Number(despesasAcessorias) || 0,
            despesas_outras: Number(outrasDespesas) || 0,
            custo_final: Number(custoFinal) || 0,
            valor_venda: Number(valorVendaUtilizado) || 0,
            estoque: {
                create: estoqueData as any,

            },
            codigo_ncm: codigoNcm,
            codigo_cest: codigoCest,
            codigo_beneficio: codigoBeneficio,
            origem: origemProduto,
            peso_liquido: Number(pesoLiquido) || 0,
            peso_bruto: Number(pesoBruto) || 0,
            numero_fci: numeroFci,
            vl_tribut: Number(VrAproxTribut) || 0,
            vl_fixo_pis: Number(valorFixoPis) || 0,
            vl_fixo_cofins: Number(valorFixoCofins) || 0,
            vl_fixo_pis_st: Number(valorFixoPisSt) || 0,
            vl_fixo_cofins_st: Number(valorFixoCofinsSt) || 0,
            id_fornecedor: Number(fornecedor) || null

        });

        return res.json(product);
    }

    async getAll(req: Request, res: Response) {
        const { id } = req.query;
        const createProductService = new CreateProductService();
        const products = await createProductService.getAll(Number(id));
        return res.json(products);
    }


    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const createProductService = new CreateProductService();
        const product = await createProductService.delete(Number(id));
        return res.json(product);
    }
} export { CreateProductController };