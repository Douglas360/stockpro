import prismaClient from "../../../prisma";
import { ICarrier } from "../../../types/CarrierTypes";

class CreateCarrierService {
    async create(carrierData: ICarrier) {
        try {
            // Validate user input
            // Check if email already exists
            if (carrierData.email) {
                const existingEmail = await prismaClient.transportadora.findFirst({
                    where: { email: carrierData.email },
                });
                if (existingEmail) {
                    throw new Error('Email already exists');
                }
            }


            if (carrierData.cpf) {
                // Check if CPF already exists
                const existingCarrier = await prismaClient.transportadora.findFirst({
                    where: {
                        cpf: carrierData?.cpf || undefined,
                    },
                });

                if (existingCarrier) {
                    throw new Error('CPF already exists');
                }
            }

            if (carrierData.cnpj) {
                // Check if CNPJ already exists
                const existingCnpj = await prismaClient.transportadora.findFirst({
                    where: { cnpj: carrierData.cnpj },
                });
                if (existingCnpj) {
                    throw new Error('CNPJ already exists');
                }
            }

            //carrierData without address and contact
            const carrierDataWithoutAddressAndContact = { ...carrierData };
            delete carrierDataWithoutAddressAndContact.endereco;
            delete carrierDataWithoutAddressAndContact.contato;


            // Create the carrier
            const createdCarrier = await prismaClient.transportadora.create({
                data: carrierDataWithoutAddressAndContact,
            });

            if (carrierData.endereco) {
                // Map to create the carrier's addresses

                const addressData = carrierData.endereco?.map((address) => ({
                    ...address,
                    id_transportadora: createdCarrier.id_transportadora,
                }));

                // Create the carrier's address
                if (addressData) {
                    await prismaClient.endereco.createMany({
                        data: addressData,
                    });
                }

            }

            if (carrierData.contato) {
                // Map to create the carrier's contact
                const contactData = carrierData.contato?.map((contact) => ({
                    ...contact,
                    id_transportadora: createdCarrier.id_transportadora,
                }));

                // Create the carrier's contact
                if (contactData) {
                    await prismaClient.contato.createMany({
                        data: contactData,
                    });

                }
            }


            // Fetch the created carrier along with the associated address and contact data
            const carrierWithDetails = await prismaClient.transportadora.findUnique({
                where: { id_transportadora: createdCarrier.id_transportadora },
                include: {
                    enderecos: true,
                    contatos: true,
                },
            });

            return carrierWithDetails;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async get(carrierId: number) {
        try {
            const carrier = await prismaClient.transportadora.findUnique({
                where: { id_transportadora: carrierId },
                include: {
                    enderecos: true,
                    contatos: true,
                },
            });

            if (!carrier) {
                throw new Error("Carrier not found");
            }

            return carrier;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async update(carrierId: number, carrierData: ICarrier) {
        try {
            const existingCarrier = await prismaClient.transportadora.findUnique({
                where: { id_transportadora: carrierId },
            });

            if (!existingCarrier) {
                throw new Error("Carrier not found");
            }else{
                // Update the carrier's information
                const updatedCarrier = await prismaClient.transportadora.update({
                    where: { id_transportadora: carrierId },
                    data: carrierData,
                });
                return updatedCarrier;
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }    
    
    async getAll(id_empresa: number) {
        try {
            const carriers = await prismaClient.transportadora.findMany({
                where: {
                    id_empresa: id_empresa,
                },
                select: {
                    id_transportadora: true,
                    tipo_transportadora: true,
                    nome: true,
                    ativo: true,
                    telefone: true,
                    email: true,
                    createdAt: true,
                }
            });

            return carriers;
        } catch (error: any) {
            throw error;
        }
    }
    async delete(carrierId: number) {
        try {
            // Check if the carrier exists
            const existingCarrier = await prismaClient.transportadora.findUnique({
                where: { id_transportadora: carrierId },
            });

            if (!existingCarrier) {
                throw new Error('Carrier not found');
            }

            // Delete the carrier's address
            await prismaClient.endereco.deleteMany({
                where: {
                    id_transportadora: carrierId,
                },
            });

            // Delete the carrier's contact
            await prismaClient.contato.deleteMany({
                where: {
                    id_transportadora: carrierId,
                },
            });

            // Delete the carrier
            await prismaClient.transportadora.delete({
                where: {
                    id_transportadora: carrierId,
                },
            });

            return { message: "Carrier deleted successfully" };
        } catch (error: any) {
            throw error;
        }
    }
}

export { CreateCarrierService };
