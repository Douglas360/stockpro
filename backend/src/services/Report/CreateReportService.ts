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
    async getSaleReport(id_company: number, report: any): Promise<any> {
        try {
            const { data_inicial = null, data_final = null, cliente = null, situacao = null } = report || {};

            const filters: any = {
                id_empresa: id_company,
            };
            // Add optional filters to the query based on user input
            if (data_inicial && data_final) {
                filters.data_venda = {
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

            const sales = await prismaClient.venda.findMany({
                where: filters,
                include: {
                    empresa: true,
                    cliente: true,
                    situacao_venda: true,
                },
                orderBy: {
                    data_venda: "asc",
                },
            });

            if (sales.length === 0) {
                throw new Error("Nenhuma venda encontrada")
            }

            const salesFormatted = sales.map((sale) => {
                return {
                    numero_venda: sale.numero_venda,
                    cliente: sale?.cliente?.nome,
                    data_venda: new Date(sale.data_venda).toLocaleDateString('pt-BR'),
                    situacao: sale?.situacao_venda?.descricao,
                    valor_total: sale.valor_total,
                    nomeEmpresa: sale?.empresa?.nome_fantasia,
                    cnpjEmpresa: sale?.empresa?.cnpj,
                    enderecoEmpresa: `${sale?.empresa?.logradouro}, ${sale?.empresa?.numero} - ${sale?.empresa?.bairro} - ${sale?.empresa?.cidade} - ${sale?.empresa?.estado}`,
                    telefoneEmpresa: sale?.empresa?.telefone,
                    emailEmpresa: sale?.empresa?.email,
                    logoEmpresa: sale?.empresa?.avatar,
                }
            })
            //return sales and total rows
            return salesFormatted
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getSupplierReport(id_company: number, report: any): Promise<any> {       
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

            const suppliers = await prismaClient.fornecedor.findMany({
                where: filters,
                include: {
                    empresa: true,
                },
            });

            if (suppliers.length === 0) {
                throw new Error("Nenhum fornecedor encontrado")
            }

            const suppliersFormatted = suppliers.map((supplier) => {
                return {
                    id_fornecedor: supplier.id_fornecedor,
                    nome: supplier.nome,
                    tipo_fornecedor: supplier.tipo_fornecedor,
                    cnpj: supplier.cnpj,
                    razao_social: supplier.razao_social,
                    email: supplier.email,
                    telefone: supplier.telefone,
                    nomeEmpresa: supplier?.empresa?.nome_fantasia,
                    cnpjEmpresa: supplier?.empresa?.cnpj,
                    enderecoEmpresa: `${supplier?.empresa?.logradouro}, ${supplier?.empresa?.numero} - ${supplier?.empresa?.bairro} - ${supplier?.empresa?.cidade} - ${supplier?.empresa?.estado}`,
                    telefoneEmpresa: supplier?.empresa?.telefone,
                    emailEmpresa: supplier?.empresa?.email,
                    logoEmpresa: supplier?.empresa?.avatar,
                }
            })

            return suppliersFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getCarrierReport(id_company: number, report: any): Promise<any> {
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

            const carrier = await prismaClient.transportadora.findMany({
                where: filters,
                include: {
                    empresa: true,
                },
            });

            if (carrier.length === 0) {
                throw new Error("Nenhuma transportadora encontrada")
            }

            const carrierFormatted = carrier.map((carrer) => {
                return {
                    id_transportadora: carrer.id_transportadora,
                    nome: carrer.nome,
                    tipo_transportadora: carrer.tipo_transportadora,
                    cnpj: carrer.cnpj,
                    razao_social: carrer.razao_social,
                    email: carrer.email,
                    telefone: carrer.telefone,
                    nomeEmpresa: carrer?.empresa?.nome_fantasia,
                    cnpjEmpresa: carrer?.empresa?.cnpj,
                    enderecoEmpresa: `${carrer?.empresa?.logradouro}, ${carrer?.empresa?.numero} - ${carrer?.empresa?.bairro} - ${carrer?.empresa?.cidade} - ${carrer?.empresa?.estado}`,
                    telefoneEmpresa: carrer?.empresa?.telefone,
                    emailEmpresa: carrer?.empresa?.email,
                    logoEmpresa: carrer?.empresa?.avatar,
                }
            })

            return carrierFormatted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //Generate report of all products sales by month
    async getProductsSalesReport(id_company: number, report: any): Promise<any> {
        try {
            const { data_inicial = null, data_final = null, produto = null, cliente = null, situacao = null } = report || {};

            const filters: any = {
                id_empresa: id_company,
            };
            // Add optional filters to the query based on user input
            if (data_inicial && data_final) {
                filters.data_venda = {
                    gte: new Date(data_inicial),
                    lte: new Date(data_final),
                };
            }
            if (produto) {
                filters.itens = {
                    some: {
                        id_produto: {
                            in: Number(produto),
                        },
                    },
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

            const sales = await prismaClient.venda.findMany({
                where: filters,
                include: {
                    empresa: true,
                    cliente: true,
                    situacao_venda: true,
                    itens: {
                        include: {
                            produto: true,
                        }
                    }
                },
                orderBy: {
                    data_venda: "asc",
                },
            });

            if (sales.length === 0) {
                throw new Error("Nenhuma venda encontrada")
            }

            const productsMap: { [key: number]: { id_produto: number; nome_produto: string; quantidade: number; valor_total: number } } = {};

            sales.forEach((sale) => {
                sale.itens.forEach((item) => {
                    const { id_produto, produto, quantidade, valor_total } = item;
                    if (id_produto && produto) {
                        if (productsMap[id_produto]) {
                            productsMap[id_produto].quantidade += quantidade;
                            productsMap[id_produto].valor_total += valor_total;
                        } else {
                            productsMap[id_produto] = {
                                id_produto,
                                nome_produto: produto.nome || '',
                                quantidade,
                                valor_total,
                            };
                        }
                    }
                });
            });

            const productsSales = Object.values(productsMap);

            // Restante do código...

            return productsSales;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }




} export { CreateReportService }