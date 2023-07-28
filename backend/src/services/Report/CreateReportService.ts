import prismaClient from "../../prisma";


class CreateReportService {
    async getCustomerReport(id_company: number, report: any): Promise<any> {
        try {
            const { ativo = null, nome = null, email = null } = report || {};

            const filters: any = {
                id_empresa: id_company,
            };

            // Add optional filters to the query based on user input            
            if (typeof ativo === 'boolean') {
                filters.ativo = ativo;
            }
            if (nome) {
                filters.nome = {
                    contains: nome,
                };
            }
            if (email) {
                filters.email = {
                    contains: email,
                };
            }

            const customers = await prismaClient.cliente.findMany({
                where: filters,
                include: {
                    empresa: true,
                },
            });

            if (customers.length === 0) {

                throw new Error("Nenhum cliente encontrado")
            }
            const customersFormatted = customers.map((customer) => {
                return {
                    id_cliente: customer.id_cliente,
                    nome: customer.nome,
                    tipo_cliente: customer.tipo_cliente,
                    cnpj: customer.cnpj,
                    razao_social: customer.razao_social,
                    email: customer.email,
                    telefone: customer.telefone,
                    nomeEmpresa: customer?.empresa?.nome_fantasia,
                    cnpjEmpresa: customer?.empresa?.cnpj,
                    enderecoEmpresa: `${customer?.empresa?.logradouro}, ${customer?.empresa?.numero} - ${customer?.empresa?.bairro} - ${customer?.empresa?.cidade} - ${customer?.empresa?.estado}`,
                    telefoneEmpresa: customer?.empresa?.telefone,
                    emailEmpresa: customer?.empresa?.email,
                    logoEmpresa: customer?.empresa?.avatar,
                }
            })

            return customersFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getProductReport(id_company: number, report: any): Promise<any> {
        try {
            const { ativo = null, nome = null, estoque_min = null, estoque_max = null } = report || {};

            const filters: any = {
                id_empresa: id_company,
            };

            // Add optional filters to the query based on user input
            if (typeof ativo === 'boolean') {
                filters.ativo = ativo;
            }
            if (nome) {
                filters.nome = {
                    contains: nome,
                };
            }
            if (estoque_min) {
                filters.estoque_min = {
                    gt: estoque_min,
                };
            }
            if (estoque_max) {
                filters.estoque_max = {
                    gt: estoque_max,
                };
            }

            const products = await prismaClient.produto.findMany({
                where: filters,
                include: {
                    empresa: true,
                    fornecedor: true,
                    estoque: true,
                },
                orderBy: {
                    nome: "asc",
                },
            });

            if (products.length === 0) {
                throw new Error("Nenhum produto encontrado")
            }
            const productsFormatted = products.map((product) => {
                return {
                    codigo_interno: product.codigo_interno,
                    nome: product.nome,
                    codigo_ncm: product.codigo_ncm,
                    custo_final: product.custo_final,
                    valor_venda: product.valor_venda,
                    estoque: product.estoque,
                    fornecedor: product?.fornecedor?.nome,
                    nomeEmpresa: product?.empresa?.nome_fantasia,
                    cnpjEmpresa: product?.empresa?.cnpj,
                    enderecoEmpresa: `${product?.empresa?.logradouro}, ${product?.empresa?.numero} - ${product?.empresa?.bairro} - ${product?.empresa?.cidade} - ${product?.empresa?.estado}`,
                    telefoneEmpresa: product?.empresa?.telefone,
                    emailEmpresa: product?.empresa?.email,
                    logoEmpresa: product?.empresa?.avatar,
                }
            })
            return productsFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getBudgetReport(id_company: number, report: any): Promise<any> {
        try {
            const { data_inicial = null, data_final = null, cliente = null, situacao = null } = report || {};

            const filters: any = {
                id_empresa: id_company,
            };
            // Add optional filters to the query based on user input
            if (data_inicial && data_final) {
                filters.data_orcamento = {
                    gte: new Date(data_inicial),
                    lte: new Date(data_final),
                };
            }
            if (cliente) {
                filters.id_cliente = {
                    in: Number(cliente),
                };
            }
            if (situacao) {
                filters.id_situacao_venda = {
                    in: Number(situacao),
                };
            }

            const budgets = await prismaClient.orcamento.findMany({
                where: filters,
                include: {
                    empresa: true,
                    cliente: true,
                    situacao_venda: true,
                },
                orderBy: {
                    data_orcamento: "asc",
                },
            });

            if (budgets.length === 0) {
                throw new Error("Nenhum orçamento encontrado")
            }

            const budgetFormatted = budgets.map((budget) => {
                return {
                    numero_orcamento: budget.numero_orcamento,
                    cliente: budget?.cliente?.nome,
                    data_orcamento: new Date(budget.data_orcamento).toLocaleDateString('pt-BR'),
                    situacao: budget?.situacao_venda?.descricao,
                    valor_total: budget.valor_total,
                    nomeEmpresa: budget?.empresa?.nome_fantasia,
                    cnpjEmpresa: budget?.empresa?.cnpj,
                    enderecoEmpresa: `${budget?.empresa?.logradouro}, ${budget?.empresa?.numero} - ${budget?.empresa?.bairro} - ${budget?.empresa?.cidade} - ${budget?.empresa?.estado}`,
                    telefoneEmpresa: budget?.empresa?.telefone,
                    emailEmpresa: budget?.empresa?.email,
                    logoEmpresa: budget?.empresa?.avatar,


                }
            })
            //return budgets and total rows
            return { budgetFormatted, total: budgets.length };
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }

} export { CreateReportService }