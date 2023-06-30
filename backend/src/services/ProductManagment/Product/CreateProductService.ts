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
                throw new Error("Company id is required");
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



            const product = await prismaClient.produto.create({
                data: productData,
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
                    id_usuario: productData.id_usuario || 1,
                    descricao: "Entrada manual de produto",

                }
            });

            return productWithDetails;
        } catch (error: any) {
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
