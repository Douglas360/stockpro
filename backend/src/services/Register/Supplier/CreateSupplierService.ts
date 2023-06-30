import prismaClient from "../../../prisma";
import { ISupplier } from "../../../types/SupplierTypes";

class CreateSupplierService {
    async create(supplierData: ISupplier) {
        try {
            // Validate user input
            // Check if email already exists
            if (supplierData.email) {
                const existingEmail = await prismaClient.fornecedor.findFirst({
                    where: { email: supplierData.email },
                });
                if (existingEmail) {
                    throw new Error('Email already exists');
                }
            }


            if (supplierData.cpf) {
                // Check if CPF already exists
                const existingSupplier = await prismaClient.fornecedor.findFirst({
                    where: {
                        cpf: supplierData?.cpf || undefined,
                    },
                });

                if (existingSupplier) {
                    throw new Error('CPF already exists');
                }
            }

            if (supplierData.cnpj) {
                // Check if CNPJ already exists
                const existingCnpj = await prismaClient.fornecedor.findFirst({
                    where: { cnpj: supplierData.cnpj },
                });
                if (existingCnpj) {
                    throw new Error('CNPJ already exists');
                }
            }

            //supplierData without address and contact
            const supplierDataWithoutAddressAndContact = { ...supplierData };
            delete supplierDataWithoutAddressAndContact.endereco;
            delete supplierDataWithoutAddressAndContact.contato;


            // Create the supplier
            const createdSupplier = await prismaClient.fornecedor.create({
                data: supplierDataWithoutAddressAndContact,
            });

            if (supplierData.endereco) {
                // Map to create the supplier's addresses

                const addressData = supplierData.endereco?.map((address) => ({
                    ...address,
                    id_fornecedor: createdSupplier.id_fornecedor,
                }));

                // Create the supplier's address
                if (addressData) {
                    await prismaClient.endereco.createMany({
                        data: addressData,
                    });
                }

            }

            if (supplierData.contato) {
                // Map to create the customer's contact
                const contactData = supplierData.contato?.map((contact) => ({
                    ...contact,
                    id_fornecedor: createdSupplier.id_fornecedor,
                }));

                // Create the customer's contact
                if (contactData) {
                    await prismaClient.contato.createMany({
                        data: contactData,
                    });

                }
            }


            // Fetch the created customer along with the associated address and contact data
            const customerWithDetails = await prismaClient.fornecedor.findUnique({
                where: { id_fornecedor: createdSupplier.id_fornecedor },
                include: {
                    enderecos: true,
                    contatos: true,
                },
            });

            return customerWithDetails;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getAll(id_empresa: number) {
        try {
            const supplier = await prismaClient.fornecedor.findMany({
                where: {
                    id_empresa: id_empresa,
                },
                select: {
                    id_fornecedor: true,
                    tipo_fornecedor: true,
                    nome: true,
                    ativo: true,
                    telefone: true,
                    email: true,
                    createdAt: true,
                }
            });

            return supplier
        } catch (error: any) {
            throw error;
        }
    }
    async delete(supplierId: number) {
        try {
            // Check if the supplier exists
            const existingSupplier = await prismaClient.fornecedor.findUnique({
                where: { id_fornecedor: supplierId },
            });

            if (!existingSupplier) {
                throw new Error('Supplier not found');
            }

            //Delete the supplier's address
            await prismaClient.endereco.deleteMany({
                where: {
                    id_fornecedor: supplierId,
                },
            });

            //Delete the supplier's contact
            await prismaClient.contato.deleteMany({
                where: {
                    id_fornecedor: supplierId,
                },
            });

            // Delete the supplier
            await prismaClient.fornecedor.delete({
                where: {
                    id_fornecedor: supplierId,
                },
            });

            return { message: "Supplier deleted successfully" };
        } catch (error: any) {
            throw error;
        }
    }
}
export { CreateSupplierService };








