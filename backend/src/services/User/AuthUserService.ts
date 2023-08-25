import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUserLogin } from "../../types/UserTypes";

class AuthUserService {
    async execute({ login, senha }: IUserLogin) {
        const email = login;
        const user = await prismaClient.user.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },
                    {
                        login,
                    },
                ],
            },
            include: {
                empresa: true, // include the linked Empresa record
            },
        });

        try {
            if (!user) {
                throw new Error("Login not found");
            }
            if (!user.ativo) {
                throw new Error("User is not active");
            }

            const passwordMatch = await compare(senha, user.senha);

            if (!passwordMatch) {
                throw new Error("Invalid login or password");
            }

            // Update last login
            await prismaClient.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ultimo_login: new Date(),
                },
            });

            const token = sign(
                {
                    email: user.email,
                    login: user.login,
                },
                process.env.JWT_SECRET!,
                {
                    subject: user.id.toString(),
                    expiresIn: "5d",
                }
            );

            const userLogged = {
                id: user.id,
                nome: user.nome,
                login: user.login,
                email: user.email,
                id_empresa: user.empresa?.id_empresa,
                logo: user.empresa?.avatar,

            };

            return {
                token,
                user: userLogged,

            };

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}



export { AuthUserService };
