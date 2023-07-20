import prismaClient from "../../../prisma";
import { IProduct } from "../../../types/ProductTypes";

class CreateProductService {
    async execute(productData: IProduct) {

        try {
            //Validate fields
            if (!productData.nome) {
                throw new Error("Product name is required");
            }
            if (!productData.codigo_interno) {
                throw new Error("Code is required");
            }
            if (!productData.id_empresa) {
                throw new Error("Company id is required");
            }
            //Check if product already exists in database
            const productAlreadyExists = await prismaClient.produto.findFirst({
                where: {
                    codigo_interno: productData.codigo_interno
                }
            });
            if (productAlreadyExists) {
                throw new Error("Product already exists");
            }

            //productData without id_usuario
            const productDataWithoutIdUser = {
                ...productData,
                id_usuario: undefined
            }

            const product = await prismaClient.produto.create({
                data: productDataWithoutIdUser,
                include: {
                    campos: true,
                    estoque: true,
                    fornecedor: true
                }
            });

            const productWithDetails = await prismaClient.produto.findFirst({
                where: {
                    id_produto: product.id_produto
                },
                include: {
                    campos: true,
                    estoque: true
                }
            });

            //Update movement inventory
            await prismaClient.movimentacaoEstoque.create({
                data: {
                    id_produto: product.id_produto,
                    tipo_movimentacao: "Entrada",
                    quantidade: productWithDetails?.estoque[0].quantidade || 0,
                    quantidade_atual: productWithDetails?.estoque[0].quantidade || 0,
                    id_usuario: productData.id_usuario || 1,
                    descricao: "Saldo Inicial",

                }
            });

            return productWithDetails;
        } catch (error: any) {
            console.log(error)
            throw new Error(error.message);

        }

    }
    async get(id: string) {
        try {
            // Check id          
            if (!id) { throw new Error("id is required") }

            const product = await prismaClient.produto.findFirst({
                where: {
                    codigo_interno: id.toString()
                },
                include: {
                    campos: true,
                    estoque: true
                }
            });
            if (!product) throw new Error("Product not found")
            return product;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async update(id: number, productData: IProduct, stockData?: any) {

        // Funções de criação de movimentos de entrada e saída
        async function createInventoryEntrada(productData: any, stockData: any) {

            await prismaClient.controleEstoque.update({
                where: {
                    id_estoque: stockData.id_estoque,
                },
                data: {
                    estoque_min: stockData.estoque_min,
                    estoque_max: stockData.estoque_max,
                    quantidade: stockData.quantidade,
                    data_ultima_entrada: stockData.data_ultima_entrada,
                },
            });
            const quantidadeAtual = stockData.quantidade
            stockData.quantidade = stockData.quantidade - productData?.estoque[0]?.quantidade;
            //console.log(productData?.estoque[0]?.quantidade)
            await prismaClient.movimentacaoEstoque.create({
                data: {
                    id_produto: productData.id_produto,
                    tipo_movimentacao: "Entrada",
                    quantidade: stockData.quantidade,
                    quantidade_atual: quantidadeAtual || 0,
                    id_usuario: productData.id_usuario || 1,
                    descricao: "Entrada manual de produto",
                },
            });
        }

        async function createInventorySaida(productData: any, stockData: any) {

            await prismaClient.controleEstoque.update({
                where: {
                    id_estoque: stockData.id_estoque,
                },
                data: {
                    estoque_min: stockData.estoque_min,
                    estoque_max: stockData.estoque_max,
                    quantidade: stockData.quantidade,
                    data_ultima_saida: stockData.data_ultima_saida,
                },
            });
            const quantidadeAtual = stockData.quantidade
            stockData.quantidade = stockData.quantidade - productData?.estoque[0]?.quantidade;
            await prismaClient.movimentacaoEstoque.create({
                data: {
                    id_produto: productData.id_produto,
                    tipo_movimentacao: "Saida",
                    quantidade: stockData.quantidade,
                    quantidade_atual: quantidadeAtual || 0,
                    id_usuario: productData.id_usuario || 1,
                    descricao: "Saída manual de produto",
                },
            });
        }

        try {
            // Check id
            if (!id) throw new Error("id not found")

            const product = await prismaClient.produto.update({
                where: {
                    id_produto: id
                },
                data: productData,
                include: {
                    estoque: true
                }
            });

            if (stockData) {
                const existingStockData = await prismaClient.controleEstoque.findUnique({
                    where: {
                        id_estoque: stockData.id_estoque
                    }
                });
                const existingQuantidade = existingStockData?.quantidade || 0;
                const estoqueMin = existingStockData?.estoque_min || 0;
                const estoqueMax = existingStockData?.estoque_max || 0;

                if (
                    estoqueMin !== stockData.estoque_min ||
                    estoqueMax !== stockData.estoque_max ||
                    existingQuantidade !== stockData.quantidade
                ) {
                    // Verificar se é uma entrada ou saída no inventário
                    if (stockData.quantidade > existingQuantidade) {

                        await createInventoryEntrada(product, stockData);
                    } else {
                        await createInventorySaida(product, stockData);
                    }
                }
            }

            return product;

        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }
    async getAll(id_empresa: number) {
        try {
            // Check id_empresa
            if (!id_empresa) throw new Error("id_empresa not found")
            const products = await prismaClient.produto.findMany({
                where: {
                    id_empresa
                },
                include: {
                    campos: true,
                    estoque: true
                },
                orderBy: {
                    id_produto: "desc"
                }
            });
            return products;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async delete(id: number) {
        try {
            // Search product by codigo_interno and delete it from database 
            const product = await prismaClient.produto.findFirst({
                where: {
                    codigo_interno: id.toString()
                },


            });
            if (!product) throw new Error("Product not found");
            await prismaClient.movimentacaoEstoque.deleteMany({
                where: {
                    id_produto: product.id_produto
                }
            });
            await prismaClient.produto.delete({
                where: {
                    id_produto: product.id_produto
                },


            });




            return { message: "Product deleted successfully" }




        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
export { CreateProductService };
