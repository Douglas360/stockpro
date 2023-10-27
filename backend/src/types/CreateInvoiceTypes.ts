
export interface CreateInvoiceServiceRequest {
  orderId: number;
  id_empresa: number;
  natureza_operacao: string;
  tipo_documento: number;
  local_destino: number;
  finalidade_emissao: number;
  cfop: number;
  numero_nota: number;
  informacoes_adicionais_contribuinte: string
  modalidade_frete: number
  quantidade?: number
  especie?: string
  marca?:string
  numero:string
  peso_bruto?: number
  peso_liquido?: number
}
