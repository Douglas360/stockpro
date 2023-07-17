import { Request, Response } from "express";
import { CreateProductService } from "../../../services/ProductManagment/Product/CreateProductService";
import { IProduct } from "../../../types/ProductTypes";


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
            id_usuario,
        } = req.body;
        console.log(id_usuario)

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
            movimenta_estoque: movimentaEstoque === "true" ? true : false,
            habilitar_nfce: habilitarNf === "true" ? true : false,
            validade: validade === "true" ? true : false,
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
            id_fornecedor: Number(fornecedor) || null,
            id_usuario

        });

        return res.json(product);
    }

    async get(req: Request, res: Response) {
        const { id } = req.params;
        const createProductService = new CreateProductService();
        const product = await createProductService.get(id);
        return res.json(product);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { productData } = req.body;

        const updatedStockData = {
            id_estoque: Number(productData.id_estoque),
            estoque_min: Number(productData.estoqueMinimo),
            estoque_max: Number(productData.estoqueMaximo),
            quantidade: Number(productData.estoqueAtual),
            //data_ultima_entrada: new Date()
            //getDate Brasil 
            data_ultima_entrada: new Date()               
            
        } as any


        const updatedProductData: IProduct = {
            nome: productData.nomeProduto,
            codigo_interno: productData.codigoInterno,
            codigo_barra: productData.codigoBarra,
            movimenta_estoque: productData.movimentaEstoque === "true" ? true : false,
            habilitar_nfce: productData.habilitarNf === "true" ? true : false,
            validade: productData.validade === "true" ? true : false,
            peso_kg: Number(productData.pesoProduto),
            altura_cm: Number(productData.alturaProduto),
            largura_cm: Number(productData.larguraProduto),
            comprimento_cm: Number(productData.comprimentoProduto),
            descricao: productData.descricaoProduto,
            id_empresa: Number(productData.id_empresa),
            /*campos: {
                create: productData.camposExtras,
            },*/
            valor_custo: Number(productData.valorCusto),
            despesas_acessorias: Number(productData.despesasAcessorias),
            despesas_outras: Number(productData.outrasDespesas),
            custo_final: Number(productData.custoFinal),
            valor_venda: Number(productData.valorVendaUtilizado),
            codigo_ncm: productData.codigoNcm,
            cfop: productData.cfop,
            codigo_cest: productData.codigoCest,
            codigo_beneficio: productData.codigoBeneficio,
            origem: productData.origemProduto,
            peso_liquido: parseFloat(productData.pesoLiquido),
            peso_bruto: parseFloat(productData.pesoBruto),
            numero_fci: productData.numeroFci,
            vl_tribut: Number(productData.VrAproxTribut),
            vl_fixo_pis: Number(productData.valorFixoPis),
            vl_fixo_cofins: Number(productData.valorFixoCofins),
            vl_fixo_pis_st: Number(productData.valorFixoPisSt),
            vl_fixo_cofins_st: Number(productData.valorFixoCofinsSt),
            id_fornecedor: Number(productData.fornecedor) || null,

        }

        const createProductService = new CreateProductService();
        const product = await createProductService.update(Number(id), updatedProductData, updatedStockData);
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