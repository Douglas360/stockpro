import { MovimentacaoEstoque } from "@prisma/client";
import { IOrderItem } from "./OrderItem";

export interface IOrder {
    numero_venda: number;
    data_venda: Date;
    id_empresa: number;
    id_cliente: number;
    id_situacao_venda: number;
    id_canal_venda: number;
    id_user: number;
    id_forma_pagamento: number;
    id_transportadora: number;
    valor_total: number;
    valor_desconto?: number;
    valor_frete?: number;
    observacao: string;
    observacao_interna: string;
    itens: IOrderItem[];
    movimentacoesEstoque?: MovimentacaoEstoque[];
    pagamentos?: IPayment[];
}

export interface IPayment {
    id_forma_pagamento: number;
    valor: number;
    parcelado: boolean;
    venda: boolean;
    vencimento: Date;
    realizado?: boolean;
    data_realizado?: Date;
    observacao?: string;

}