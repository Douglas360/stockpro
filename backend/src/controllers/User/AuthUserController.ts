import { Request, Response } from "express";
import { AuthUserService } from "../../services/User/AuthUserService";
import {  IUserLogin } from "../../types/UserTypes";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { login, senha } = request.body
        const user: IUserLogin = {
            login, 
            senha,
           
        }

        const authUserService = new AuthUserService();

        const token = await authUserService.execute(user);

        return response.json(token);
    }
}

export { AuthUserController }