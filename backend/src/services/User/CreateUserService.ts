import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { IUser } from "../../types/UserTypes";

class CreateUserService {
    async create(userData: IUser) {
        try {
            // Validate user input
            if (!userData.nome) {
                throw new Error("Name is required");
            }
            if (!userData.login) {
                throw new Error("Login is required");
            }
            if (!userData.email) {
                throw new Error("Email is required");
            }
            if (!userData.senha || userData.senha.length < 8) {
                throw new Error("Password should be at least 8 characters long");
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
                throw new Error("Invalid email format");
            }
            if (!userData.id_empresa) {
                throw new Error("Company is required");
            }

            // Check if user already exists
            const existingUser = await prismaClient.user.findUnique({
                where: { email: userData.email },
            });
            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            // Check if login and empresa linked user already exists
            const loginAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    login: userData.login,
                    id_empresa: userData.id_empresa,
                },
            });
            if (loginAlreadyExists) {
                throw new Error("User with this login already exists");
            }




            // Check if empresa exists
            const empresa = await prismaClient.empresa.findUnique({
                where: { id_empresa: userData.id_empresa },
            });
            if (!empresa) {
                throw new Error("Empresa not found");
            }


            // Check if login and empresa linked user already exists
            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    login: userData.login,
                    id_empresa: userData.id_empresa,
                },
            });
            if (userAlreadyExists) {
                throw new Error("User with this login already exists");
            }

            // Hash the password
            const passwordHash = await hash(userData.senha, 8);

            // Create user
            const user = await prismaClient.user.create({
                data: {
                    ...userData,
                    senha: passwordHash,
                },
            });

            // Remove password from return
            const { senha, ...userWithoutPassword } = user;

            return userWithoutPassword;


        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
    async getAll(id_company: number) {
        try {
            const users = await prismaClient.user.findMany({
                where: {
                    id_empresa: id_company,
                },
                include: {
                    empresa: true,
                },
            });

            const users2 = users.map((user) => {
                return {
                    id: user.id,
                    nome: user.nome,
                    login: user.login,
                    ativo: user.ativo,
                }
            });


            return users2;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async delete(id: number) {
        try {
            // Check if user have any sale or budget linked
            const user = await prismaClient.user.findUnique({
                where: {
                    id: id,
                },
                include: {
                    orcamento: true,
                    venda: true,
                },
            });

            if (user?.orcamento.length !== 0 || user?.venda.length !== 0) {
                throw new Error("User have sales or budgets linked");
            }

            // Delete user
            const userDeleted = await prismaClient.user.delete({
                where: {
                    id: id,
                },
            });


           

            return userDeleted;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async update(id: number, userData: IUser) {
        try {

            const passwordHash = await hash(userData.senha, 8);

            const user = await prismaClient.user.update({
                where: {
                    id: id,
                },
                data: {
                    nome: userData.nome,
                    login: userData.login,
                    email: userData.email,
                    senha: passwordHash,
                    ativo: userData.ativo,
                    id_empresa: userData.id_empresa,
                    avatar: userData.avatar,                                       
                },
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getUserById(id: number) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: id,
                },
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
} export { CreateUserService };

