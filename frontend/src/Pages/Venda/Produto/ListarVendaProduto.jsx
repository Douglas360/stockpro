import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useOrder } from '../../../context/OrderContext/useOrder';
import { dateFormatWithHours } from '../../../functions/getFomatter';

const ListarVendaProduto = () => {
    const { listAllOrders } = useOrder();
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        const response = await listAllOrders(1);
        console.log(response)
        setOrders(response);
    }

    useEffect(() => {
        loadOrders();
    }, []);


    const columns = ['Nº', 'Cliente', 'Data', 'Situação', 'Valor'];

    const status = {
        1: <div className="ms-auto badge bg-success">Concretizada</div>,
        2: <div className="ms-auto badge bg-warning">Em aberto</div>,
        3: <div className="ms-auto badge bg-info">Em andamento</div>,
        4: <div className="ms-auto badge bg-danger">Cancelada</div>,

    };

    const clients = orders?.map((order) => {
        return {
            id: order.numero_venda,
            nome: order.nome_cliente,
            date: dateFormatWithHours(order.data_venda),
            status: status[order.id_situacao_venda],
            valor: parseFloat(order.valor_total).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }
    });


    return (
        <>
            <SearchBar
                urlNavigate={'/venda/produto/cadastrar'}
                columns={columns}
                rows={clients}
                msgDelete={'Venda Produto'}
            />


        </>
    );
};

export default ListarVendaProduto;
