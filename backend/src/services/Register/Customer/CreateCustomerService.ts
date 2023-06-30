import prismaClient from "../../../prisma";
import { ICustomer } from "../../../types/CustomerTypes";

class CreateCustomerService {
    async create(customerData: ICustomer) {
        try {
            // Validate user input
            // Check if email is valid
            if (customerData.email) {
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(customerData.email)) {
                    throw new Error("Invalid email format");
                }
            }

            if (customerData.cpf) {
                // Check if CPF already exists
                const existingCustomer = await prismaClient.cliente.findFirst({
                    where: {
                        cpf: customerData?.cpf || undefined
                    },
                });

                if (existingCustomer) {
                    throw new Error("CPF already exists");
                }
            }

            // Check if CNPJ already exists
            if (customerData.cnpj) {
                const existingCnpj = await prismaClient.cliente.findFirst({
                    where: { cnpj: customerData.cnpj },
                });
                if (existingCnpj) {
                    throw new Error("CNPJ already exists");
                }
            }

            if (customerData.email) {
                // Check if email already exists
                const existingEmail = await prismaClient.cliente.findFirst({
                    where: { email: customerData.email },
                });
                if (existingEmail) {
                    throw new Error("Email already exists");
                }
            }

            // customerData without address and contact
            const customerDataWithoutAddressAndContact = { ...customerData };
            delete customerDataWithoutAddressAndContact.endereco;
            delete customerDataWithoutAddressAndContact.contato;

            const createdCustomer = await prismaClient.cliente.create({
                data: customerDataWithoutAddressAndContact,
                include: {
                    enderecos: true,
                    contatos: true,
                },
            });

            if (customerData.endereco) {
                // Map to create the customer's address
                const addressData = customerData.endereco?.map((address) => ({
                    ...address,
                    id_cliente: createdCustomer.id_cliente,
                }));

                // Create the customer's address
                if (addressData) {
                    await prismaClient.endereco.createMany({
                        data: addressData,
                    });
                }
            }

            if (customerData.contato) {
                // Map to create the customer's contact
                const contactData = customerData.contato?.map((contact) => ({
                    ...contact,
                    id_cliente: createdCustomer.id_cliente,
                }));

                // Create the customer's contact
                if (contactData) {
                    await prismaClient.contato.createMany({
                        data: contactData,
                    });
                }
            }

            // Fetch the created customer along with the associated address and contact data
            const customerWithDetails = await prismaClient.cliente.findUnique({
                where: { id_cliente: createdCustomer.id_cliente },
                include: {
                    enderecos: true,
                    contatos: true,
                },
            });

            return customerWithDetails;
        } catch (error: any) {
            throw error;
        }
    }

    async update(customerId: number, customerData: ICustomer) {
        try {
            const existingCustomer = await prismaClient.cliente.findUnique({
                where: { id_cliente: customerId },
            });

            if (!existingCustomer) {
                throw new Error("Customer not found");
            }

            // Update the customer's information
            const updatedCustomer = await prismaClient.cliente.update({
                where: { id_cliente: customerId },
                data: customerData,
            });

            return updatedCustomer;
        } catch (error: any) {
            throw error;
        }
    }
    async getAll(id_empresa: number) {
        try {
            const customers = await prismaClient.cliente.findMany({
                where: {
                    id_empresa: id_empresa,
                },
                select: {
                    id_cliente: true,
                    tipo_cliente: true,
                    nome: true,
                    ativo: true,
                    telefone: true,
                    email: true,
                    createdAt: true,
                }
            });

            return customers
        } catch (error: any) {
            throw error;
        }
    }
    async delete(customerId: number) {
      
        try {
            const existingCustomer = await prismaClient.cliente.findUnique({
                where: { id_cliente: customerId },
            });

            if (!existingCustomer) {
                throw new Error("Customer not found");
            }

           /* // Delete the customer's address
            await prismaClient.endereco.deleteMany({
                where: { id_cliente: customerId },
            });

            // Delete the customer's contact
            await prismaClient.contato.deleteMany({
                where: { id_cliente: customerId },
            });*/

            await prismaClient.cliente.delete({
                where: { id_cliente: customerId },
            });

            return { message: "Customer deleted successfully" };
        } catch (error: any) {
            throw error;
        }
    }
}

export { CreateCustomerService };
