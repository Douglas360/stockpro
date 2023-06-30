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
            throw error;
        }
    }
} export { CreateUserService };

