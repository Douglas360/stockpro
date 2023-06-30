export interface IUser {
    id?: number;
    nome: string | null;
    login: string;
    email: string;
    senha: string;
    avatar?: string | null;
    id_empresa: number;
    updatedAt?: Date;
}

export interface IUserLogin {
    login: string;
    senha: string;
}


