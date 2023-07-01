import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const handleRequest = async (requestPromise, message) => {
        try {
            setLoading(true);
            const response = await requestPromise;
            toast.success(message, {
                autoClose: 2000,
            });
            return response.data;
        } catch (error) {
            console.log(error)
            const message =
                ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    //function to create a Order
    const createOrder = async (data) => {

        const newData = {
            "orderData": {
                "numero_venda": parseInt(data.numeroVenda),
                "data_venda": new Date(),
                "id_empresa": 1,
                "id_cliente": parseInt(data.clienteOrcamento),
                "id_situacao_venda": parseInt(data.situacaoVendaOrcamento) || 1,
                "id_canal_venda": parseInt(data.canalVendaOrcamento) || 1,
                "id_user": 1,
                "id_forma_pagamento": parseInt(data.formaPagamentoAvista) || 1,
                "id_transportadora": parseInt(data.id_transportadora),
                "valor_total": data.valorTotal,
                "valor_desconto": data.descontoValor,
                "valor_frete": parseFloat(data.valorFrete),
                "observacao": data.observacaoOrcamento,
                "observacao_interna": data.observacaoInternaOrcamento,
                "itens": data.produtos?.map((produto) => ({
                    "id_produto": parseInt(produto.produto),
                    "quantidade": parseInt(produto.quantidade),
                    "valor_unitario": produto.valor,
                    "valor_total": produto.subtotal
                }))
            }
        }
        //console.log(newData)
        return handleRequest(api.post('/order', newData), 'Venda cadastrada com sucesso');

    };

    //function to list all Orders by id_empresa 
    const listAllOrders = async (id_empresa) => {
        return handleRequest(api.get(`/list/order/id_company/${id_empresa}`));
    };



    return (
        <OrderContext.Provider
            value={{
                loading,
                createOrder,
                listAllOrders

            }}
        >
            {children}
        </OrderContext.Provider>
    );
};