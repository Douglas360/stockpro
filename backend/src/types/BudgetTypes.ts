import { IOrderItem } from "./OrderItem";

export interface IBudget {
    numero_orcamento: number;
    data_orcamento: Date;
    id_empresa: number;
    id_cliente: number;
    id_situacao_venda: number;
    id_canal_orcamento: number;
    id_user: number;
    id_forma_pagamento: number;
    id_transportadora: number;
    validade_orcamento: string
    valor_total: number;
    valor_desconto?: number;
    valor_frete?: number;
    observacao: string;
    observacao_interna: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    itens: IOrderItem[];
    pagamentos?: IPayment[];

}

export interface IPayment {
    id_forma_pagamento: number;
    valor: number;
    parcelado: boolean;
    venda: boolean;
    vencimento: Date;
    observacao?: string;

}
