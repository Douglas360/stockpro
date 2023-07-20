import prismaClient from "../../prisma";

class InventoryService {
    async getInventoryById(id: number) {
        const inventory = await prismaClient.movimentacaoEstoque.findMany({
            where: {
                id_produto: id
            },
            orderBy: {
                data_movimentacao: 'desc'
            },
            include: {
                produto: {
                    select: {
                        nome: true,
                    }
                }
            }

        });

        //return formated inventory
        const formatedInventory = inventory.map((item) => {
            return {
                id_movimentacao: item.id_movimentacao,
                id_produto: item.id_produto,
                tipo_movimentacao: item.tipo_movimentacao,
                quantidade: item.quantidade,
                quantidade_atual: item.quantidade_atual,
                data_movimentacao: item.data_movimentacao,
                nome_produto: item.produto.nome,
                descricao: item.descricao
            }
        });

        return formatedInventory;

    }
} export { InventoryService };