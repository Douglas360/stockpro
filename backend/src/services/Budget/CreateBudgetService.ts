import prismaClient from "../../prisma";
import { IBudget } from "../../types/BudgetTypes";
import { IOrderItem } from "../../types/OrderItem";

class CreateBudgetService {
    async create(orderData: IBudget): Promise<any> {
        try {
            const { itens, pagamentos, ...rest } = orderData;

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
            }

            //Check if already exists an order with the same number
            const orderExists = await prismaClient.orcamento.findFirst({
                where: { numero_orcamento: Number(rest.numero_orcamento) },
            });

            if (orderExists) {
                throw new Error(`Budget number already exists`);
            }

            // Create the order
            const newBudget = await prismaClient.orcamento.create({
                data: {
                    ...rest,
                    itens: {
                        create: itens as IOrderItem[],
                    },

                },

            });
            if (pagamentos) {
                await Promise.all(
                    pagamentos.map(async (pagamento) => {
                        const { id_forma_pagamento, valor, parcelado, vencimento, observacao, venda } = pagamento;
                        if (!id_forma_pagamento) {
                            throw new Error("id_forma_pagamento not found");
                        }
                        if (!venda) {
                            throw new Error("Se for orçamento venda=false, se for venda venda=true");
                        }
                        if (!valor) {
                            throw new Error("valor not found");
                        }
                        if (!parcelado) {
                            throw new Error("parcelado not found");
                        }
                        if (!vencimento) {
                            throw new Error("vencimento not found");
                        }

                        // Create the payment
                        await prismaClient.pagamentoOrcamento.create({
                            data: {
                                id_forma_pagamento,
                                valor,
                                venda,
                                parcelado,
                                vencimento,
                                observacao,
                                id_orcamento: newBudget.id_orcamento,
                            },
                        });
                    })
                );

            }

            //Update history of the product sales       
            await prismaClient.historicoSituacaoOrcamento.create({
                data: {

                    id_orcamento: newBudget?.id_orcamento,
                    id_situacao_venda: newBudget?.id_situacao_venda,
                    descricao: `Orçamento Cadastrado`,
                    id_usuario: newBudget?.id_user as number,
                    data: newBudget.data_orcamento,
                },
            });


            return newBudget;
        } catch (error: any) {

            throw new Error(error.message);
        }
    }
    async listBudgetByNumber(id: number): Promise<any> {
        try {
            const budget = await prismaClient.orcamento.findFirst({
                where: { numero_orcamento: id },
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
                    pagamento: true,
                },

            });

            return budget;

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
    async listBudgetByCompany(id: number): Promise<any> {
        try {
            const budget = await prismaClient.orcamento.findMany({
                where: { id_empresa: id },
                include: {
                    cliente: {
                        select: {
                            nome: true,
                        }
                    },
                    situacao_venda: {
                        select: {
                            descricao: true,
                            cor: true,
                        }
                    }
                },
            });

            return budget;

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
    async delete(id: number): Promise<any> {
        try {
            const budget = await prismaClient.orcamento.delete({
                where: { numero_orcamento: id },
            });

            return budget;

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
    async listBudgetToPrint(id: number): Promise<any> {
        try {
            // Check id
            if (!id) throw new Error("id not found")

            const budget = await prismaClient.orcamento.findFirst({
                where: { numero_orcamento: id },
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

            return budget;

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
    async updateBudgetStatus(id: number, statusId: number, descricao: string): Promise<any> {
        try {
            // Check id
            if (!id) throw new Error("id is required")

            const budgetId = await prismaClient.orcamento.findFirst({
                where: { numero_orcamento: id },
            });
            if (!budgetId) throw new Error("Budget not found")


            const budget = await prismaClient.orcamento.update({
                where: { numero_orcamento: id },
                data: {
                    id_situacao_venda: statusId,
                },
            });

            //Update history of the product sales
            await prismaClient.historicoSituacaoOrcamento.create({
                data: {
                    id_orcamento: budgetId.id_orcamento,
                    id_situacao_venda: statusId,
                    descricao: descricao,
                    id_usuario: budget.id_user as number,
                    data: new Date(),
                },
            });




            return budget;

        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);

        }
    }
    async listHistoryBudgetStatus(id: number): Promise<any> {
        try {
            // Check id
            if (!id) throw new Error("id not found")
            const budget = await prismaClient.orcamento.findFirst({
                where: { numero_orcamento: id },
            });
            if (!budget) throw new Error("Budget not found")

            const budgetHistoryStatus = await prismaClient.historicoSituacaoOrcamento.findMany({
                where: { id_orcamento: budget.id_orcamento },
                include: {
                    situacao_venda: true,
                    usuario: true,
                },
                orderBy: {
                    data: 'desc',
                },
            });

            const budgetHistoryStatusFormatted = budgetHistoryStatus.map((item) => {
                return {

                    data: item.data,
                    descricao: item.descricao,
                    id_situacao_venda: item.id_situacao_venda,
                    situacao_venda: item.situacao_venda?.descricao,
                    cor: item.situacao_venda?.cor,
                    usuario: item.usuario?.nome,

                }
            })


            return budgetHistoryStatusFormatted;

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
    async update(budgetId: number, updatedBudgetData: IBudget): Promise<any> {
        try {
            const { itens, pagamentos, ...rest } = updatedBudgetData;

            // Fetch the existing budget
            const existingBudget = await prismaClient.orcamento.findUnique({
                where: { numero_orcamento: budgetId },
                include: { itens: true },
            });

            if (!existingBudget) {
                throw new Error(`Budget with ID ${budgetId} not found`);
            }

            // Perform updates on the budget data
            const updatedBudget = await prismaClient.orcamento.update({
                where: { numero_orcamento: budgetId },
                data: {
                    ...rest,
                },
                include: {
                    itens: true,
                },
            });

            // Update budget items
            const updatedItemPromises = updatedBudget.itens.map(async (existingItem) => {
                const matchingUpdatedItem = itens.find((item) => item.id_produto === existingItem.id_produto);
                if (!matchingUpdatedItem) {
                    return existingItem;
                }

                const updatedItem = await prismaClient.itemOrcamento.update({
                    where: { id_item_orcamento: existingItem.id_item_orcamento },
                    data: {
                        quantidade: matchingUpdatedItem.quantidade,
                        // Update other item properties if needed
                    },
                });

                return updatedItem;
            });

            // Update payments
            if (pagamentos) {
                // First, delete existing payments
                await prismaClient.pagamentoOrcamento.deleteMany({
                    where: { id_orcamento: updatedBudget.id_orcamento },
                });

                // Then, create updated payments
                const updatedPaymentsPromises = pagamentos.map(async (pagamento) => {
                    const { id_forma_pagamento, valor, parcelado, vencimento, observacao, venda } = pagamento;

                    if (!id_forma_pagamento) {
                        throw new Error("id_forma_pagamento not found");
                    }
                    if (!venda) {
                        throw new Error("Se for orçamento venda=false, se for venda venda=true");
                    }
                    if (!valor) {
                        throw new Error("valor not found");
                    }
                    if (!parcelado) {
                        throw new Error("parcelado not found");
                    }
                    if (!vencimento) {
                        throw new Error("vencimento not found");
                    }


                    const createdPayment = await prismaClient.pagamentoOrcamento.create({
                        data: {
                            id_forma_pagamento,
                            valor,
                            venda,
                            parcelado,
                            vencimento,
                            observacao,
                            id_orcamento: updatedBudget.id_orcamento,
                        },
                    });

                    return createdPayment;
                });

                await Promise.all(updatedPaymentsPromises);
            }

            // Additional update logic for history if needed

            return updatedBudget;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

} export { CreateBudgetService }