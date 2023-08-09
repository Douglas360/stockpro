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
            cfop
        } = req.body;

        const { file } = req;
        const folderName = 'fotos/produtos'

        const estoqueData = {
            estoque_min: Number(estoqueMinimo) || 0,
            estoque_max: Number(estoqueMaximo) || 0,
            quantidade: Number(estoqueAtual) || 0,
            data_ultima_entrada: new Date(),
        }

        //verificar se o campo extra é um array ou um objeto e fazer o parse para array de objetos caso seja um objeto e se for um array não fazer nada 
        let camposExtrasParsed = [];
        if (camposExtras !== 'undefined') {
            //console.log("testes: "+camposExtras)
            camposExtrasParsed = JSON.parse(camposExtras)
        }


        //console.log(camposExtrasParsed)        

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            nome: nomeProduto,
            codigo_interno: codigoInterno,
            codigo_barra: codigoBarra === 'undefined' ? null : codigoBarra, //se o codigo de barra for undefined ele vai receber null, se não ele vai receber o valor de 'codigoBarras
            movimenta_estoque: movimentaEstoque === "true" ? true : false,
            habilitar_nfce: habilitarNf === "true" ? true : false,
            validade: validade === "true" ? true : false,
            peso_kg: Number(pesoProduto) || 0,
            altura_cm: Number(alturaProduto) || 0,
            largura_cm: Number(larguraProduto) || 0,
            comprimento_cm: Number(comprimentoProduto) || 0,
            descricao: descricaoProduto === 'undefined' ? null : descricaoProduto,
            id_empresa: Number(id_empresa),
            campos: {
                create: camposExtrasParsed
            },
            valor_custo: Number(valorCusto) || 0,
            despesas_acessorias: Number(despesasAcessorias) || 0,
            despesas_outras: Number(outrasDespesas) || 0,
            custo_final: Number(custoFinal) || 0,
            valor_venda: Number(valorVendaUtilizado) || 0,
            estoque: {
                create: estoqueData as any,

            },
            codigo_ncm: codigoNcm === 'undefined' ? null : codigoNcm,
            codigo_cest: codigoCest === 'undefined' ? null : codigoCest,
            codigo_beneficio: codigoBeneficio === 'undefined' ? null : codigoBeneficio,
            origem: origemProduto === 'undefined' ? null : origemProduto,
            cfop: cfop === 'undefined' ? null : cfop,
            peso_liquido: Number(pesoLiquido) || 0,
            peso_bruto: Number(pesoBruto) || 0,
            numero_fci: numeroFci === 'undefined' ? null : numeroFci,
            vl_tribut: Number(VrAproxTribut) || 0,
            vl_fixo_pis: Number(valorFixoPis) || 0,
            vl_fixo_cofins: Number(valorFixoCofins) || 0,
            vl_fixo_pis_st: Number(valorFixoPisSt) || 0,
            vl_fixo_cofins_st: Number(valorFixoCofinsSt) || 0,
            id_fornecedor: Number(fornecedor) || null,
            id_usuario: Number(id_usuario) || null,

        }, file, folderName);

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

        //const { productData } = req.body;
        const { nomeProduto,
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
            //id_usuario,
            cfop,
            id_estoque,
            //id_produto
        } = req.body;
        const { file } = req
        const folderName = 'fotos/produtos'



        const updatedStockData = {
            id_estoque: Number(id_estoque),
            estoque_min: Number(estoqueMinimo),
            estoque_max: Number(estoqueMaximo),
            quantidade: Number(estoqueAtual),
            //data_ultima_entrada: new Date()
            //getDate Brasil 
            data_ultima_entrada: new Date()

        } as any

        //verificar se o campo extra é um array ou um objeto e fazer o parse para array de objetos caso seja um objeto e se for um array não fazer nada 
        let camposExtrasParsed = [];
        if (camposExtras !== 'undefined') {
            //console.log("testes: "+camposExtras)
            camposExtrasParsed = JSON.parse(camposExtras)
        }


        const updatedProductData: IProduct = {
            nome: nomeProduto,
            codigo_interno: codigoInterno,
            codigo_barra: codigoBarra,
            movimenta_estoque: movimentaEstoque === "true" ? true : false,
            habilitar_nfce: habilitarNf === "true" ? true : false,
            validade: validade === "true" ? true : false,
            peso_kg: Number(pesoProduto),
            altura_cm: Number(alturaProduto),
            largura_cm: Number(larguraProduto),
            comprimento_cm: Number(comprimentoProduto),
            descricao: descricaoProduto,
            id_empresa: Number(id_empresa),
            /*campos: {
                create: camposExtrasParsed,
            },*/
            valor_custo: Number(valorCusto),
            despesas_acessorias: Number(despesasAcessorias),
            despesas_outras: Number(outrasDespesas),
            custo_final: Number(custoFinal),
            valor_venda: Number(valorVendaUtilizado),
            codigo_ncm: codigoNcm,
            cfop: cfop,
            codigo_cest: codigoCest,
            codigo_beneficio: codigoBeneficio,
            origem: origemProduto,
            peso_liquido: parseFloat(pesoLiquido),
            peso_bruto: parseFloat(pesoBruto),
            numero_fci: numeroFci,
            vl_tribut: Number(VrAproxTribut),
            vl_fixo_pis: Number(valorFixoPis),
            vl_fixo_cofins: Number(valorFixoCofins),
            vl_fixo_pis_st: Number(valorFixoPisSt),
            vl_fixo_cofins_st: Number(valorFixoCofinsSt),
            id_fornecedor: Number(fornecedor) || null,

        }


        const createProductService = new CreateProductService();
        const product = await createProductService.update(Number(id), updatedProductData, updatedStockData, file, folderName);
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
    async deleteFile(req: Request, res: Response) {
        const { id } = req.params;
        const createProductService = new CreateProductService();
        const product = await createProductService.deleteFile(Number(id));
        return res.json(product);
    }
} export { CreateProductController };