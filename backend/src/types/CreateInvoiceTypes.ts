
export interface CreateInvoiceServiceRequest {
  orderId: number;
  natureza_operacao: string;
  tipo_documento: number;
  local_destino: number;
  finalidade_emissao: number;
}
