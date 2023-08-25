export interface ICompany {
    id? : number;
    nome: string;
    nome_fantasia: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
    inscr_estadual: string
    cnpj: string
    email: string
    telefone: string
    avatar: string
    file?: FileObject
    folderName?: string
}

interface FileObject {
    originalname: string;
    buffer: Buffer;
}