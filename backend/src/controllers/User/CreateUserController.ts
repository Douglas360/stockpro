import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { IUser } from "../../types/UserTypes";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { nome, login, email, senha, id_empresa } = req.body;
        console.log(nome, login, email, senha, id_empresa)

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
    async getAll(req: Request, res: Response) {
        const { id } = req.params;

        const createUserService = new CreateUserService();

        const users = await createUserService.getAll(Number(id));

        return res.json(users);
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const createUserService = new CreateUserService();

        const user = await createUserService.delete(Number(id));

        return res.json(user);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, login, email, senha, ativo, id_empresa } = req.body;

        const data: IUser = {
            nome,
            login,
            email,
            senha,
            ativo,
            id_empresa: Number(id_empresa),
        };

        const createUserService = new CreateUserService();

        const user = await createUserService.update(Number(id), data);

        return res.json(user);
    }
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;

        const createUserService = new CreateUserService();

        const user = await createUserService.getUserById(Number(id));

        return res.json(user);
    }

} export { CreateUserController };
