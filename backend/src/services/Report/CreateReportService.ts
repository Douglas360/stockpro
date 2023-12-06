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
                    in: [Number(cliente)],
                };
            }
            if (situacao) {
                filters.id_situacao_venda = {
                    in: [Number(situacao)],
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
                throw new Error("Nenhum orçamento encontrado");
            }

            let totalValue = 0; // Variable to store the total value of all budgets

            const budgetFormatted = budgets.map((budget) => {
                totalValue += budget.valor_total; // Calculate the total value

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
                };
            });

            // Format valor_total with two decimal places for each budget
            budgetFormatted.forEach((budget) => {
                budget.valor_total = Number(budget.valor_total.toFixed(2));
            });

            // Format the totalValue with two decimal places
            totalValue = Number(totalValue.toFixed(2));

            // Return the budgetFormatted array and the totalValue
            return { budgetFormatted, valor_total: totalValue };
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
                    in: [Number(cliente)],
                };
            }
            if (situacao) {
                filters.id_situacao_venda = {
                    in: [Number(situacao)],
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
                throw new Error("Nenhum produto encontrado")
            }



            /*const salesFormatted = sales.map((sale) => {
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
            });*/
            const salesFormatted = []
            for (const sale of sales) {
                const nfNumber = await prismaClient.notaFiscal.findFirst({
                    where: {
                        ref: String(sale.numero_venda)
                    },
                    select: {
                        numero_nfe: true,
                        status:true
                    }
                })
                salesFormatted.push({
                    numero_venda: sale.numero_venda,
                    cliente: sale?.cliente?.nome,
                    data_venda: new Date(sale.data_venda).toLocaleDateString("pt-BR"),
                    situacao: sale?.situacao_venda?.descricao,
                    valor_total: sale.valor_total,
                    nomeEmpresa: sale?.empresa?.nome_fantasia,
                    cnpjEmpresa: sale?.empresa?.cnpj,
                    enderecoEmpresa: `${sale?.empresa?.logradouro}, ${sale?.empresa?.numero} - ${sale?.empresa?.bairro} - ${sale?.empresa?.cidade} - ${sale?.empresa?.estado}`,
                    telefoneEmpresa: sale?.empresa?.telefone,
                    emailEmpresa: sale?.empresa?.email,
                    logoEmpresa: sale?.empresa?.avatar,
                    // Access the numero_nfe from the separate query
                    numero_nfe: nfNumber?.numero_nfe || null,
                    status_nfe: nfNumber?.status || null    
                });

            }

            // Calculate the total value from the sales data
            const totalValue = sales.reduce((total, sale) => total + sale.valor_total, 0);



            // Return salesFormatted along with the totalValue
            return {
                salesFormatted,
                valor_total: totalValue,
            };
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
                throw new Error("Nenhuma venda encontrada");
            }

            const productsMap: { [key: string]: { codigo_interno: string; nome_produto: string; quantidade: number; valor_total: number } } = {};

            sales.forEach((sale) => {
                sale.itens.forEach((item) => {
                    const { produto, quantidade, valor_total } = item;
                    if (produto?.codigo_interno) {
                        const { codigo_interno, nome } = produto;
                        if (productsMap[codigo_interno]) {
                            productsMap[codigo_interno].quantidade += quantidade;
                            productsMap[codigo_interno].valor_total += valor_total;
                        } else {
                            productsMap[codigo_interno] = {
                                codigo_interno,
                                nome_produto: nome || '',
                                quantidade,
                                valor_total,
                            };
                        }
                    }
                });
            });

            const productsSales = Object.values(productsMap);

            // Add empresa information to each product sale object
            const productsSalesWithEmpresa = productsSales.map((productSale) => {
                const { codigo_interno } = productSale;
                const sale = sales.find((sale) => sale.itens.some((item) => item.produto?.codigo_interno === codigo_interno));

                return {
                    ...productSale,
                    nomeEmpresa: sale?.empresa?.nome_fantasia || 'N/A',
                    cnpjEmpresa: sale?.empresa?.cnpj || 'N/A',
                    enderecoEmpresa: `${sale?.empresa?.logradouro}, ${sale?.empresa?.numero} - ${sale?.empresa?.bairro} - ${sale?.empresa?.cidade} - ${sale?.empresa?.estado}`,
                    telefoneEmpresa: sale?.empresa?.telefone || 'N/A',
                    emailEmpresa: sale?.empresa?.email || 'N/A',
                    logoEmpresa: sale?.empresa?.avatar || null,
                };
            });

            // Calculate the total quantities and total value
            const quantidade_total = productsSales.reduce((total, sale) => total + sale.quantidade, 0);
            const valor_total = productsSales.reduce((total, sale) => total + sale.valor_total, 0);

            // Add the total quantities and total value to the result object
            const result = {
                productsSalesWithEmpresa,
                quantidade_total,
                valor_total,
            };

            return result;

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    //get customers who buy the most from the company
    async getCustomersSalesReport(id_company: number, report: any): Promise<any> {
        try {
            const { data_inicial = null, data_final = null, cliente = null, situacao = null, orderBy = null } = report || {};

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
            });

            if (sales.length === 0) {
                throw new Error("Nenhuma venda encontrada");
            }

            const customersMap: { [key: number]: { id_cliente: number; nome_cliente: string; valor_total: number; quantidade_vendas: number } } = {};

            sales.forEach((sale) => {
                const { id_cliente, cliente, valor_total } = sale;
                if (id_cliente && cliente) {
                    if (customersMap[id_cliente]) {
                        customersMap[id_cliente].valor_total += valor_total;
                        customersMap[id_cliente].quantidade_vendas += 1; // Increment the sale count for the customer
                    } else {
                        customersMap[id_cliente] = {
                            id_cliente,
                            nome_cliente: cliente.nome || '',
                            valor_total,
                            quantidade_vendas: 1, // Set the sale count to 1 for the new customer
                        };
                    }
                }
            });

            const customersSales = Object.values(customersMap);

            // Add empresa information to each customer sale object
            const customersSalesWithEmpresa = customersSales.map((customerSale) => {
                const { id_cliente } = customerSale;
                const sale = sales.find((sale) => sale.id_cliente === id_cliente);

                return {
                    ...customerSale,
                    nomeEmpresa: sale?.empresa?.nome_fantasia || 'N/A',
                    cnpjEmpresa: sale?.empresa?.cnpj || 'N/A',
                    enderecoEmpresa: `${sale?.empresa?.logradouro}, ${sale?.empresa?.numero} - ${sale?.empresa?.bairro} - ${sale?.empresa?.cidade} - ${sale?.empresa?.estado}`,
                    telefoneEmpresa: sale?.empresa?.telefone || 'N/A',
                    emailEmpresa: sale?.empresa?.email || 'N/A',
                    logoEmpresa: sale?.empresa?.avatar || null,
                };
            });

            // Sort the customersSalesWithEmpresa array based on the orderBy parameter          
            if (orderBy === 1) {
                // Sort by quantidade_vendas in ascending order
                customersSalesWithEmpresa.sort((a, b) => a.quantidade_vendas - b.quantidade_vendas);
            } else if (orderBy === 2) {
                // Sort by valor_total in ascending order
                customersSalesWithEmpresa.sort((a, b) => a.valor_total - b.valor_total);
            }

            // Format valor_total with two decimal places
            customersSalesWithEmpresa.forEach((customer) => {
                customer.valor_total = Number(customer.valor_total.toFixed(2));
            });

            return customersSalesWithEmpresa;


        } catch (error: any) {
            throw new Error(error.message);
        }
    }


} export { CreateReportService }