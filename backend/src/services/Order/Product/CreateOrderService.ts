import prismaClient from "../../../prisma";
import { IOrderItem } from "../../../types/OrderItem";
import { IOrder } from "../../../types/OrderTypes";

class CreateOrderService {
    async create(orderData: IOrder): Promise<any> {

        let order
        let updatedItems;
        try {
            const { itens, pagamentos, ...rest } = orderData;

            if (!orderData.numero_venda) {

                throw new Error("Order number not found or invalid")
            }


            // Perform additional checks on each order item if needed
            for (const item of itens) {

                // Check if the product exists
                const product = await prismaClient.produto.findUnique({
                    where: { id_produto: Number(item.id_produto) },
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
                    where: { id_produto: Number(item.id_produto) },
                });

                if (!inventory || inventory.quantidade === null) {
                    throw new Error(`Invalid inventory for product ${item.id_produto}`);
                }

                if (item.quantidade > inventory.quantidade) {
                    //throw new Error(`Insufficient inventory for product ${item.id_produto}`);
                    throw new Error(`Insufficient inventory for product`);
                }
            }

            //Check if already exists an order with the same number
            const orderExists = await prismaClient.venda.findFirst({
                where: { numero_venda: Number(rest.numero_venda) },
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
            if (pagamentos) {
                await Promise.all(
                    pagamentos.map(async (pagamento) => {
                        const { id_forma_pagamento, valor, parcelado, vencimento, observacao, venda } = pagamento;

                        if (!id_forma_pagamento) throw new Error("id_forma_pagamento not found")

                        // Create the payment
                        await prismaClient.pagamento.create({
                            data: {
                                id_forma_pagamento,
                                valor,
                                venda,
                                parcelado,
                                vencimento,
                                observacao,
                                id_venda: newOrder.id_venda,
                            },
                        });

                    })
                );

            }
            //Update history of the product sales       
            await prismaClient.historicoSituacaoVenda.create({
                data: {

                    id_venda: newOrder.id_venda,
                    id_situacao_venda: newOrder.id_situacao_venda,
                    descricao: `Venda Cadastrada`,
                    id_usuario: newOrder.id_user,
                    data: newOrder.data_venda,
                },
            });

            let quantidadeAtual = 0;
            if (newOrder.id_situacao_venda !== 4) {
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

                        quantidadeAtual = updatedInventory.quantidade as number;

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
                                quantidade_atual: quantidadeAtual,
                                tipo_movimentacao: "Saida",
                                id_venda: newOrder.id_venda,
                                descricao: `Lançamento da venda nº ${newOrder.numero_venda}`,
                                data_movimentacao: new Date(),
                            },
                        });
                    })
                );
            }



            return order;
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }
    async listOrderByNumber(orderId: number): Promise<any> {
        try {
            // Check id
            if (!orderId) throw new Error("id not found")

            const order = await prismaClient.venda.findFirst({
                where: {
                    numero_venda: orderId,
                },

                include: {
                    //itens: true,
                    itens: {
                        include: {
                            produto: true,
                            tipoVenda: true,
                        },
                    },
                    //cliente: true,
                    cliente: {
                        include: {
                            enderecos: true,
                        },
                    },
                    situacao_venda: true,
                    pagamento: true,


                },
            });

            if (!order) throw new Error("Order not found")

            return order;
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }
    async listOrdersByCompany(companyId: number): Promise<any> {
        try {
            const orders = await prismaClient.venda.findMany({
                where: {
                    id_empresa: companyId,
                },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                        },
                    },
                    situacao_venda: {
                        select: {
                            descricao: true,
                            cor: true,
                        },
                    },

                },
                orderBy: {
                    data_venda: "desc",
                },
            });

            const ordersFormatted = orders.map((order) => {

                return {
                    id_venda: order.id_venda,
                    numero_venda: order.numero_venda,
                    nome_cliente: order.cliente?.nome,
                    data_venda: order.data_venda,
                    id_situacao_venda: order.id_situacao_venda,
                    valor_total: order.valor_total,
                    situacao_venda: order.situacao_venda?.descricao,
                    cor: order.situacao_venda?.cor,


                };
            });

            return ordersFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listOrdersByDateRange(startDate: Date, endDate: Date): Promise<any> {
        try {
            const orders = await prismaClient.venda.findMany({
                where: {
                    data_venda: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: {
                    itens: true,
                },
            });

            return orders;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listOrdersByCustomer(customerId: number): Promise<any> {
        try {
            const orders = await prismaClient.venda.findMany({
                where: {
                    id_cliente: customerId,
                },
                include: {
                    itens: true,
                },
            });

            return orders;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listOrdersByStatus(statusId: number): Promise<any> {
        try {
            const orders = await prismaClient.venda.findMany({
                where: {
                    id_situacao_venda: statusId,
                },
                include: {
                    itens: true,
                },
            });

            return orders;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listSalesStatus(): Promise<any> {
        try {
            const salesStatus = await prismaClient.situacaoVenda.findMany({
                where: {
                    ativo: true,
                },
            });

            return salesStatus;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listHistorySalesStatus(id: number): Promise<any> {
        try {
            // Check id
            if (!id) throw new Error("id not found")
            const order = await prismaClient.venda.findFirst({
                where: {
                    numero_venda: id,
                },
            });

            const historySalesStatus = await prismaClient.historicoSituacaoVenda.findMany({
                where: {
                    id_venda: order?.id_venda,
                },
                include: {
                    situacao_venda: true,
                    usuario: true,
                },
                orderBy: {
                    data: "desc",
                },
            });

            const historySalesStatusFormatted = historySalesStatus.map((history) => {
                return {
                    data: history.data,
                    descricao: history.descricao,
                    id_situacao_venda: history.id_situacao_venda,
                    situacao_venda: history.situacao_venda?.descricao,
                    cor: history.situacao_venda?.cor,
                    usuario: history.usuario?.nome,
                };
            });


            return historySalesStatusFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async updateOrderStatus(id: number, statusId: number, descricao?: string): Promise<any> {

        try {
            // Check id
            if (!id) throw new Error("id not found")

            // Check statusId
            if (!statusId) throw new Error("statusId not found")

            //Search id_venda by id
            const orderId = await prismaClient.venda.findFirst({
                where: {
                    numero_venda: id,
                },
            });
            if (!orderId) throw new Error("Order not found")
            //Check if there is a previous canceled order for the same venda
            const previousCanceledOrder = await prismaClient.historicoSituacaoVenda.findFirst({
                where: {
                    id_venda: orderId.id_venda,
                    id_situacao_venda: 4, // Assuming 4 is the status code for "canceled"
                },
            });

            const order = await prismaClient.venda.update({
                where: {
                    id_venda: orderId?.id_venda,
                },
                data: {
                    id_situacao_venda: statusId,
                },
                include: {
                    itens: true,
                },
            });
            if (!order) throw new Error("Order not found to update status")

            //Update history of the product sales
            await prismaClient.historicoSituacaoVenda.create({
                data: {
                    id_venda: order?.id_venda,
                    id_situacao_venda: order.id_situacao_venda,
                    descricao: descricao,
                    id_usuario: order.id_user,
                    data: new Date(),
                },
            });

            //Check if id_situacao_venda is 4 (canceled), if true, update inventory
            if (order.id_situacao_venda === 4) {



                if (!previousCanceledOrder) {
                    // Update the inventory for each canceled item
                    await Promise.all(
                        order.itens.map(async (item) => {
                            const { id_produto, quantidade } = item;

                            // Update the inventory for the product
                            const updatedInventory = await prismaClient.controleEstoque.update({
                                where: { id_produto },
                                data: {
                                    quantidade: {
                                        increment: quantidade, // Increment the quantity since the order is canceled
                                    },
                                    data_ultima_saida: new Date(),
                                },
                            });

                            return updatedInventory;
                        })
                    );

                    // Update Inventory Movements for each canceled item
                    await Promise.all(
                        order.itens.map(async (item) => {
                            const { id_produto, quantidade } = item;

                            // Update the inventory for the product
                            await prismaClient.movimentacaoEstoque.create({
                                data: {
                                    id_produto,
                                    id_usuario: order.id_user,
                                    quantidade,
                                    tipo_movimentacao: "Entrada", // Assuming "Entrada" is the movement type for canceling an order
                                    id_venda: order.id_venda,
                                    descricao: `Venda ${order.numero_venda} cancelada`,
                                    data_movimentacao: new Date(),
                                },
                            });
                        })
                    );
                }
            }



            return order;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async delete(id: number): Promise<any> {
        try {
            // Check id
            if (!id) throw new Error("id not found")

            const order = await prismaClient.venda.findFirst({
                where: {
                    numero_venda: id,
                },
            });

            if (!order) throw new Error("Order not found")

            // Check if there is a previous canceled order for the same venda
            const previousCanceledOrder = await prismaClient.historicoSituacaoVenda.findFirst({
                where: {
                    id_venda: order.id_venda,
                    id_situacao_venda: 4, // Assuming 4 is the status code for "canceled"
                },
            });

            const deletedOrder = await prismaClient.venda.delete({
                where: {
                    id_venda: order.id_venda,
                },
                include: {
                    itens: true,
                },
            });

            if (!previousCanceledOrder) {
                //TODO: update the inventory for each deleted item
                await Promise.all(
                    deletedOrder.itens.map(async (item) => {
                        const { id_produto, quantidade } = item;

                        // Update the inventory for the product
                        const updatedInventory = await prismaClient.controleEstoque.update({
                            where: { id_produto },
                            data: {
                                quantidade: {
                                    increment: quantidade, // Increment the quantity since the order is canceled
                                },
                                data_ultima_saida: new Date(),
                            },
                        });

                        return updatedInventory;
                    })


                );

                // Update Inventory Movements for each canceled item

                /*await Promise.all(
                    deletedOrder.itens.map(async (item) => {
                        const { id_produto, quantidade } = item;
                        //console.log(deletedOrder.itens)

                        // Update the inventory for the product
                        await prismaClient.movimentacaoEstoque.create({
                            data: {
                                id_produto,
                                id_usuario: deletedOrder.id_user,
                                quantidade,
                                tipo_movimentacao: "Entrada", // Assuming "Entrada" is the movement type for canceling an deletedOrder
                                id_venda: deletedOrder.id_venda,
                                descricao: `Venda ${deletedOrder.numero_venda} excluída`,
                                data_movimentacao: new Date(),
                            },
                        });
                    })
                );*/
            }
            return deletedOrder;
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }
    async cancel(orderId: number): Promise<any> {
        try {
            // Check if the order exists
            const order = await prismaClient.venda.findUnique({
                where: { numero_venda: orderId },
                include: { itens: true },
            });

            if (!order) {
                throw new Error("Order not found");
            }

            // Check if the order is already canceled
            if (order.id_situacao_venda === 4) { // Assuming 4 is the status code for "canceled"
                throw new Error("Order is already canceled");
            }

            // Check if there is a previous canceled order for the same venda
            const previousCanceledOrder = await prismaClient.historicoSituacaoVenda.findFirst({
                where: {
                    id_venda: order?.id_venda,
                    id_situacao_venda: 4, // Assuming 4 is the status code for "canceled"
                },
            });

            // Cancel the order by updating its status
            const canceledOrder = await prismaClient.venda.update({
                where: { id_venda: order?.id_venda },
                data: { id_situacao_venda: 4 }, // Assuming 4 is the status code for "canceled"
                include: { itens: true },
            });

            // Update history of the product sales
            await prismaClient.historicoSituacaoVenda.create({
                data: {
                    id_venda: canceledOrder.id_venda,
                    id_situacao_venda: canceledOrder.id_situacao_venda,
                    descricao: `Venda${canceledOrder.numero_venda} cancelada`,
                    id_usuario: canceledOrder.id_user,
                    data: new Date(),
                },
            });

            let quantidadeAtual = 0;

            if (!previousCanceledOrder) {
                // Update the inventory for each canceled item
                await Promise.all(
                    canceledOrder.itens.map(async (item) => {
                        const { id_produto, quantidade } = item;

                        // Update the inventory for the product
                        const updatedInventory = await prismaClient.controleEstoque.update({
                            where: { id_produto },
                            data: {
                                quantidade: {
                                    increment: quantidade, // Increment the quantity since the order is canceled
                                },
                                data_ultima_saida: new Date(),
                            },
                        });

                        quantidadeAtual = updatedInventory.quantidade as number;

                        return updatedInventory;
                    })
                );

                // Update Inventory Movements for each canceled item
                await Promise.all(
                    canceledOrder.itens.map(async (item) => {
                        const { id_produto, quantidade } = item;

                        // Update the inventory for the product
                        await prismaClient.movimentacaoEstoque.create({
                            data: {
                                id_produto,
                                id_usuario: canceledOrder.id_user,
                                quantidade,
                                quantidade_atual: quantidadeAtual,
                                tipo_movimentacao: "Entrada", // Assuming "Entrada" is the movement type for canceling an order
                                id_venda: canceledOrder.id_venda,
                                descricao: `Estorno da venda ${canceledOrder.numero_venda}`,
                                data_movimentacao: new Date(),
                            },
                        });
                    })
                );
            }

            return canceledOrder;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async listOrderToPrint(orderId: number): Promise<any> {
        try {
            // Check id
            if (!orderId) throw new Error("id not found")

            const order = await prismaClient.venda.findFirst({
                where: {
                    numero_venda: orderId,
                },

                include: {
                    itens: {
                        include: {
                            produto: true,
                        },
                    },
                    cliente: {
                        include: {
                            enderecos: true,
                        },
                    },
                    situacao_venda: true,
                    empresa: true,
                },
            });

            if (!order) throw new Error("Order not found")

            return order;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async update(orderId: number, updatedOrderData: IOrder): Promise<any> {
        let updatedOrder;
        let updatedItems;

        try {
            const { itens, pagamentos, ...rest } = updatedOrderData;

            // Fetch the existing order
            const existingOrder = await prismaClient.venda.findUnique({
                where: { numero_venda: orderId },
                include: { itens: true },
            });

            if (!existingOrder) {
                throw new Error(`Order with ID ${orderId} not found`);
            }

            // Perform updates on the order data
            const updatedOrder = await prismaClient.venda.update({
                where: { numero_venda: orderId },
                data: {
                    ...rest,
                },
                include: {
                    itens: true,
                },
            });

            // Update order items
            const updatedItemPromises = updatedOrder.itens.map(async (existingItem) => {
                const matchingUpdatedItem = itens.find((item) => item.id_produto === existingItem.id_produto);
                if (!matchingUpdatedItem) {
                    return existingItem;
                }

                const updatedItem = await prismaClient.itemVenda.update({
                    where: { id_item_venda: existingItem.id_item_venda },
                    data: {
                        quantidade: matchingUpdatedItem.quantidade,
                        // Update other item properties if needed
                    },
                });

                return updatedItem;
            });

            updatedItems = await Promise.all(updatedItemPromises);

            // Update payments
            if (pagamentos) {
                // First, delete existing payments
                await prismaClient.pagamento.deleteMany({
                    where: { id_venda: orderId },
                });

                // Then, create updated payments
                const updatedPaymentsPromises = pagamentos.map(async (pagamento) => {
                    const { id_forma_pagamento, valor, parcelado, vencimento, observacao, venda } = pagamento;

                   
                    if (!valor) {
                        throw new Error("valor not found");
                    }
                    
                    if (!vencimento) {
                        throw new Error("vencimento not found");
                    }

                    const createdPayment = await prismaClient.pagamento.create({
                        data: {
                            id_forma_pagamento,
                            valor,
                            venda,
                            parcelado,
                            vencimento,
                            observacao,
                            id_venda: updatedOrder.id_venda,
                        },
                    });

                    return createdPayment;
                });

                await Promise.all(updatedPaymentsPromises);
            }

            // Additional update logic for inventory and history if needed

            return updatedOrder;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}

export { CreateOrderService };
