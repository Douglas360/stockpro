export interface OrderData {
    natureza_operacao: string;
    numero: number;
    serie: number;
    data_emissao: string;
    data_entrada_saida: string;
    tipo_documento: number;
    local_destino: number;
    finalidade_emissao: number;
    cnpj_emitente: string;
    nome_emitente: string;
    nome_fantasia_emitente: string;
    logradouro_emitente: string;
    numero_emitente: string;
    bairro_emitente: string;
    municipio_emitente: string;
    uf_emitente: string;
    cep_emitente: string;
    inscricao_estadual_emitente: string;
    nome_destinatario: string;
    cnpj_destinatario: string;
    inscricao_estadual_destinatario: string;
    telefone_destinatario: string;
    logradouro_destinatario: string;
    numero_destinatario: string;
    bairro_destinatario: string;
    municipio_destinatario: string;
    uf_destinatario: string;
    pais_destinatario: string;
    cep_destinatario: string;
    valor_frete: number;
    valor_seguro: number;
    valor_total: number;
    valor_produtos: number;
    modalidade_frete: number;
    informacoes_adicionais_contribuinte:string
    items: OrderItemData[];
}

export interface OrderItemData {
    numero_item: number;
    codigo_produto: string;
    descricao: string;
    cfop: number;
    unidade_comercial: string;
    quantidade_comercial: number;
    valor_unitario_comercial: number;
    valor_unitario_tributavel: number;
    unidade_tributavel: string;
    codigo_ncm?: number;
    quantidade_tributavel: number;
    valor_bruto: number;
    icms_situacao_tributaria: number;
    icms_origem: number;
    pis_situacao_tributaria: string;
    cofins_situacao_tributaria: string;
}

