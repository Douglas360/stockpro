import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { IUser } from "../../types/UserTypes";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { nome, login, email, senha, id_empresa } = req.body;

        const data: IUser = {
            nome,
            login,
            email,
            senha,
            id_empresa: Number(id_empresa)
        };

        const createUserService = new CreateUserService();

        const user = await createUserService.create(data);

        return res.json(user);
    }
} export { CreateUserController };
