import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';
import { useNavigate } from 'react-router-dom';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const navigate = useNavigate();
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
                autoClose: 4000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleRequestCreate = async (requestPromise, successMessage) => {
        try {
            setLoading(true);
            const response = await requestPromise;

            if (response.data.status) {
                const errorMessage =
                    response.data.mensagem_sefaz || 'Erro desconhecido Sefaz';

                toast.error(errorMessage, {
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            } else {
                toast.success(successMessage, {
                    autoClose: 2000,
                });
                navigate(`/nota-fiscal/${response.data.id_nota_fiscal}`);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data.error || 'Erro desconhecido';
            toast.error(errorMessage, {
                autoClose: 3000,
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
                "id_empresa": parseInt(data.id_empresa),
                "id_cliente": parseInt(data.clienteOrcamento),
                "id_situacao_venda": parseInt(data.situacaoVendaOrcamento) || 1,
                "id_canal_venda": parseInt(data.canalVendaOrcamento) || 1,
                "id_user": parseInt(data.id_user),
                "id_forma_pagamento": parseInt(data.formaPagamentoAvista) || 1,
                "id_transportadora": parseInt(data.id_transportadora),
                "valor_total": data.valorTotal,
                "valor_desconto": data.descontoValor,
                "valor_frete": parseFloat(data.valorFrete),
                "valor_produto": parseFloat(data.valorProdutos),
                "observacao": data.observacaoOrcamento,
                "observacao_interna": data.observacaoInternaOrcamento,
                "itens": data.produtos?.map((produto) => ({
                    "id_produto": parseInt(produto.produto),
                    "numero_item": parseInt(produto.numero_item), // "numero_item": "1
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

    //function to list all Sales Status
    const listSalesStatus = async () => {
        return handleRequest(api.get('/list/salesstatus'));
    };

    //function to list history of a Order by id
    const listHistoryOrder = async (id) => {
        return handleRequest(api.get(`/list/historysalesstatus/${id}`));
    };

    //function to delete a Order by id
    const deleteOrder = async (data) => {
        return handleRequest(api.delete(`/delete/order/${data}`), 'Venda deletada com sucesso');
    };

    //function to update a Order Status by id
    const updateOrderStatus = async (data, id) => {       
        return handleRequest(api.put(`/update/orderstatus/${id}`, data), 'Status da venda atualizado com sucesso');
    };

    //function to cancel a Order by id
    const cancelOrder = async (data) => {
        return handleRequest(api.put(`/cancel/order/${data}`), 'Venda cancelada com sucesso');
    };


    return (
        <OrderContext.Provider
            value={{
                loading,
                createOrder,
                listAllOrders,
                listSalesStatus,
                listHistoryOrder,
                deleteOrder,
                updateOrderStatus,
                cancelOrder


            }}
        >
            {children}
        </OrderContext.Provider>
    );
};