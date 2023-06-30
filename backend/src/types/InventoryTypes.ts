export interface IInventory {

    id_produto: number;
    quantidade?: number;
    estoque_min?: number;
    estoque_max?: number;
    data_ultima_entrada?: Date;
    data_ultima_saida?: Date;
}

