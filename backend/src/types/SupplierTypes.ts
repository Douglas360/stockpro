import { Contato, Endereco } from "@prisma/client";

export interface ISupplier {
    nome: string;
    tipo_fornecedor: string;
    cpf?: string | null;
    rg_representante?: string | null;
    dt_nascimento?: Date | null;
    razao_social?: string | null;
    inscricao_estadual?: string | null;
    tipo_contribuinte?: string | null;
    inscricao_municipal?: string | null;
    inscricao_suframa?: string | null;    
    cnpj?: string | null;
    email?: string;
    telefone?: string | null;
    observacao?: string | null;
    avatar?: string | null;
    ativo?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    id_empresa: number;
    endereco?: Endereco[]
    contato?: Contato[]
}
