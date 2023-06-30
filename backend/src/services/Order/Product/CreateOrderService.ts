import prismaClient from "../../../prisma";
import { IOrderItem } from "../../../types/OrderItem";
import { IOrder } from "../../../types/OrderTypes";

class CreateOrderService {
    async create(orderData: IOrder): Promise<any> {
        let order
        let updatedItems;
        try {
            const { itens, ...rest } = orderData;

            // Perform additional checks on each order item if needed
            for (const item of itens) {

                // Check if the product exists
                const product = await prismaClient.produto.findUnique({
                    where: { id_produto: item.id_produto },
                });

                if (!product) {
                    throw new Error("Product not found");
                }

                // Check if the product is active
                if (!product.ativo) {
                    throw new Error(`Product ${item.id_produto} is not active`);
                }

                // Check if the product has inventory                
                const inventory = await prismaClient.controleEstoque.findUnique({
                    where: { id_produto: item.id_produto },
                });

                if (!inventory || inventory.quantidade === null) {
                    throw new Error(`Invalid inventory for product ${item.id_produto}`);
                }

                if (item.quantidade > inventory.quantidade) {
                    throw new Error(`Insufficient inventory for product ${item.id_produto}`);
                }
            }

            //Check if already exists an order with the same number
            const orderExists = await prismaClient.venda.findFirst({
                where: { numero_venda: rest.numero_venda },
            });

            if (orderExists) {
                throw new Error(`Order number already exists`);
            }

            // Create the order
            const newOrder = order = await prismaClient.venda.create({
                data: {
                    ...rest,
                    itens: {
                        create: itens as IOrderItem[],
                    },
                },
                include: {
                    itens: true,

                },
            });

            // Update the inventory for each sold item
            updatedItems = await Promise.all(
                order.itens.map(async (item) => {
                    const { id_produto, quantidade } = item;

                    // Update the inventory for the product
                    const updatedInventory = await prismaClient.controleEstoque.update({
                        where: { id_produto },
                        data: {
                            quantidade: {
                                decrement: quantidade,
                            },
                            data_ultima_saida: new Date(),
                        },
                    });

                    return updatedInventory;
                })
            );

            //Update Inventory Movements for each sold item 
            await Promise.all(
                order.itens.map(async (item) => {
                    const { id_produto, quantidade } = item;

                    // Update the inventory for the product
                    await prismaClient.movimentacaoEstoque.create({
                        data: {
                            id_produto,
                            id_usuario: newOrder.id_user,
                            quantidade,
                            tipo_movimentacao: "Saida",
                            id_venda: newOrder.id_venda,
                            descricao: `Lançamento da venda nº ${newOrder.numero_venda}`,
                            data_movimentacao: new Date(),
                        },
                    });
                })
            );



            return order;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export { CreateOrderService };
