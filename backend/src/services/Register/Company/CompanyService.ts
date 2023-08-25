import { deleteFile, uploadFile } from "../../../config/multer";
import prismaClient from "../../../prisma";
import { ICompany } from "../../../types/CompanyTypes";

class CompanyService {
    async create(empresaData: ICompany) {

        try {
            // Validate user input
            //Check if email is valid
            if (!empresaData.email) throw new Error("Email is required")

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
            throw new Error(error.message)
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
    async update(empresaData: ICompany) {

        try {
            if (!empresaData.id) {
                throw new Error('Id is required');
            }

            if (empresaData.file && empresaData.folderName) {
                //First delete old avatar from folder and database 
                const oldCompany = await prismaClient.empresa.findUnique({
                    where: { id_empresa: empresaData.id },
                });

                if (!oldCompany) {
                    throw new Error('Company not found');
                }

                if (oldCompany.avatar) {

                    const fileUrl = oldCompany.avatar.split('/');
                    const fileKey = `fotos/empresa/${fileUrl?.[fileUrl.length - 1]}`;
                    await deleteFile(fileKey);
                }

                const newAvatar = await uploadFile(empresaData.file, empresaData.folderName);
                empresaData.avatar = newAvatar as string;
            }


            //update empresaData without file, id and folderName
            const companyData = {
                nome: empresaData.nome,
                nome_fantasia: empresaData.nome_fantasia,
                logradouro: empresaData.logradouro,
                numero: empresaData.numero,
                complemento: empresaData.complemento,
                bairro: empresaData.bairro,
                cidade: empresaData.cidade,
                estado: empresaData.estado,
                cep: empresaData.cep,
                inscr_estadual: empresaData.inscr_estadual,
                cnpj: empresaData.cnpj,
                email: empresaData.email,
                telefone: empresaData.telefone,
                avatar: empresaData.avatar,
            } as ICompany;


            const company = await prismaClient.empresa.update({
                where: { id_empresa: empresaData.id },
                data: companyData
            });

            return company;
        } catch (error: any) {

            throw new Error(error.message)
        }

    }
}


export { CompanyService };