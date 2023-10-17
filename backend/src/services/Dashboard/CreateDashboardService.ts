import prismaClient from "../../prisma";

class CreateDashboardService {
    async getTotalConcretizedSales(id_company: number): Promise<any> {
        try {
            const totalSales = await prismaClient.venda.count({
                where: {
                    id_empresa: id_company,
                    id_situacao_venda: 1,
                }
            });

            return totalSales;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getInventoryValue(id_company: number): Promise<any> {
        try {
            const totalInventoryValue = await prismaClient.produto.findMany({
                where: {
                    id_empresa: id_company,
                    estoque: {
                        some: {
                            estoque_min: {
                                gt: 0,
                            },
                            estoque_max: {
                                gt: 0,
                            },
                        },
                    },
                },
                include: {
                    estoque: true,
                }

            });

            //Return the name of product , quantity, min quantity and max quantity
            const totalInventoryValue2 = totalInventoryValue.map((product) => {
                return {
                    nome: product.nome,
                    quantidade: product.estoque[0]?.quantidade,
                    quantidade_minima: product?.estoque[0].estoque_min,
                    quantidade_maxima: product?.estoque[0].estoque_max,
                }
            });

            return totalInventoryValue2;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getMovementInventory(id_company: number): Promise<any> {
        try {
            const movementInventory = await prismaClient.produto.findMany({
                where: {
                    id_empresa: id_company,
                },
                include: {
                    movimentacao_estoque: {
                        orderBy: {
                            data_movimentacao: "desc",
                        },
                    }
                },
                take:10
            });
           
            const movementInventory2 = movementInventory.map((product) => {
                return {
                    id: product.id_produto,
                    nome: product.nome,
                    movimentacao_estoque: product.movimentacao_estoque[0]?.data_movimentacao,
                    tipo_movimentacao: product.movimentacao_estoque[0]?.tipo_movimentacao,
                    quantidade: product.movimentacao_estoque[0]?.quantidade,
                    descricao: product.movimentacao_estoque[0]?.descricao,
                }
            });

            return movementInventory2;

        } catch (error: any) {
            throw new Error(error.message);


        }

    }
    async getSalesByMonth(id_company: number): Promise<any> {
        try {
            const salesByMonth = await prismaClient.venda.findMany({
                where: {
                    id_empresa: id_company,
                },
                include: {
                    situacao_venda: {
                        select: {
                            descricao: true,
                            cor: true,
                        }
                    },
                    cliente: {
                        select: {
                            nome: true,
                        }
                    },
                },
                orderBy: {
                    data_venda: "desc",
                },
                take:8


            });
            const salesByMonth2 = salesByMonth.map((sale) => {
                return {
                    id: sale.numero_venda,
                    data_venda: sale.data_venda,
                    //valor_total: sale.valor_total,
                    nome_cliente: sale.cliente?.nome,
                    situacao_venda: sale.situacao_venda?.descricao,
                    cor: sale.situacao_venda?.cor,
                }
            });



            return salesByMonth2;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getBudgetsByMonth(id_company: number): Promise<any> {
        try {
            const budgetsByMonth = await prismaClient.orcamento.findMany({
                where: {
                    id_empresa: id_company,
                },
                include: {
                    situacao_venda: {
                        select: {
                            descricao: true,
                            cor: true,
                        }
                    },
                    cliente: {
                        select: {
                            nome: true,
                        }
                    },
                },
                orderBy: {
                    data_orcamento: "desc",
                },
                take:8


            });
            const budgetsByMonth2 = budgetsByMonth.map((budget) => {
                return {
                    id: budget.numero_orcamento,
                    data_orcamento: budget.data_orcamento,
                    //valor_total: sale.valor_total,
                    nome_cliente: budget.cliente?.nome,
                    situacao_venda: budget.situacao_venda?.descricao,
                    cor: budget.situacao_venda?.cor,
                }
            });

            return budgetsByMonth2;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }



} export { CreateDashboardService };