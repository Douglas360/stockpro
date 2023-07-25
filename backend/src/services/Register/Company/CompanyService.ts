import prismaClient from "../../../prisma";
import { ICompany } from "../../../types/CompanyTypes";

interface FileObject {
    originalname: string;
    buffer: Buffer;
}


class CompanyService {
    async create(empresaData: ICompany) {
        try {
            // Validate user input
            //Check if email is valid
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(empresaData.email)) {
                throw new Error("Invalid email format");
            }

            // Check if cnpj is valid
            const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
            if (!cnpjRegex.test(empresaData.cnpj)) {
                throw new Error("Cnpj is invalid");
            }

            // Check if CNPJ already exists
            const existingEmpresa = await prismaClient.empresa.findUnique({
                where: { cnpj: empresaData.cnpj },
            });
            if (existingEmpresa) {
                throw new Error('CNPJ already exists');
            }

            // Check if email already exists
            const existingEmail = await prismaClient.empresa.findUnique({
                where: { email: empresaData.email },
            });
            if (existingEmail) {
                throw new Error('Email already exists');
            }


            const company = await prismaClient.empresa.create({
                data: empresaData
            });

            return company;
        } catch (error: any) {
            throw error
        }

    }
    async listCompanyById(id: number) {
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            const company = await prismaClient.empresa.findUnique({
                where: { id_empresa: id },
            });

            if (!company) {
                throw new Error('Company not found');
            }

            return company;
        } catch (error: any) {
            throw error
        }

    }
    async update(id: number, empresaData: ICompany, file:FileObject) {
              
        try {
            if (!id) {
                throw new Error('Id is required');
            }

            const company = await prismaClient.empresa.update({
                where: { id_empresa: id },
                data: empresaData
            });

            return company;
        } catch (error: any) {

            throw new Error(error.message)
        }

    }
}


export { CompanyService };