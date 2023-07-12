export interface CreateInvoiceRequest {
    // Defina os tipos de dados corretos para cada campo com base nos requisitos da API externa
    natureza_operacao: string;
    data_emissao: string;
    data_entrada_saida: string;
    tipo_documento: number;
    finalidade_emissao: number;
    cnpj_emitente: string;
    cpf_emitente: string;
    nome_emitente: string;
    nome_fantasia_emitente: string;
    logradouro_emitente: string;
    numero_emitente: number;
    bairro_emitente: string;
    municipio_emitente: string;
    uf_emitente: string;
    cep_emitente: string;
    inscricao_estadual_emitente: string;
    nome_destinatario: string;
    cpf_destinatario: string;
    inscricao_estadual_destinatario: string | null;
    telefone_destinatario: number;
    logradouro_destinatario: string;
    numero_destinatario: number;
    bairro_destinatario: string;
    municipio_destinatario: string;
    uf_destinatario: string;
    pais_destinatario: string;
    cep_destinatario: number;
    valor_frete: number;
    valor_seguro: number;
    valor_total: number;
    valor_produtos: number;
    modalidade_frete: number;
    items: CreateInvoiceItem[];
}

interface CreateInvoiceItem {
    numero_item?: number;
    codigo_produto?: string;
    descricao?: string;
    cfop?: number;
    unidade_comercial?: string;
    quantidade_comercial?: number;
    valor_unitario_comercial?: number;
    valor_unitario_tributavel?: number;
    unidade_tributavel?: string;
    codigo_ncm?: number;
    quantidade_tributavel?: number;
    valor_bruto?: number;
    icms_situacao_tributaria?: number;
    icms_origem?: number;
    pis_situacao_tributaria?: string;
    cofins_situacao_tributaria?: string;
}