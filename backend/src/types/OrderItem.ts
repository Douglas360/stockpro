export interface IOrderItem {
  id_produto: number;
  numero_item: number;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  desconto?: number;
  tipo_desconto?: string;
  id_tipo_venda: number;
}
