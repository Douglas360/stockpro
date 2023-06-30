import { CamposExtra, ControleEstoque, Fornecedor } from "@prisma/client";

export interface IProduct {
    nome: string;
    codigo_interno?: string | null;
    codigo_barra?: string | null;
    movimenta_estoque?: boolean | null;
    habilitar_nfce?: boolean | null;
    validade?: boolean | null;
    descricao?: string | null;
    peso_kg?: number | null;
    altura_cm?: number | null;
    largura_cm?: number | null;
    comprimento_cm?: number | null;
    ativo?: boolean;
    valor_custo?: number;
    despesas_acessorias?: number;
    despesas_outras?: number;
    custo_final?: number;
    valor_venda?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    id_empresa: number;
    campos?: {
        create: CamposExtra[];
    } | undefined;
    estoque?: {
        create: ControleEstoque[];
    } | undefined;
    codigo_ncm?: string | null;
    codigo_cest?: string | null;
    codigo_beneficio?: string | null;
    origem?: string | null;
    peso_liquido?: number | null;
    peso_bruto?: number | null;
    numero_fci?: string | null;
    vl_tribut?: number | null;
    vl_fixo_pis?: number | null;
    vl_fixo_cofins?: number | null;
    vl_fixo_pis_st?: number | null;
    vl_fixo_cofins_st?: number | null;
    id_fornecedor?: number | null;
}
