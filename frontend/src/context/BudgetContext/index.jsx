import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {

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
                error.response?.data.error || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 4000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    //function to create a Budget
    const createBudget = async (data) => {

        const date = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
        )

        const newData = {
            "budgetData": {
                "numero_orcamento": parseInt(data.numeroVenda),
                //Pegar horario do BRasil 
                "data_orcamento": date,
                "id_empresa": parseInt(data.id_empresa),
                "id_cliente": parseInt(data.clienteOrcamento),
                "id_situacao_venda": parseInt(data.situacaoVendaOrcamento) || 1,
                "id_canal_orcamento": parseInt(data.canalVendaOrcamento) || 1,
                "id_user": parseInt(data.id_user),
                "id_forma_pagamento": parseInt(data.formaPagamentoAvista) || 1,
                "id_transportadora": parseInt(data.id_transportadora),
                "valor_total": data.valorTotal,
                "validade_orcamento": data.validadeOrcamento || "",
                "introducao": data.introducaoOrcamento || "",
                "valor_desconto": parseFloat(data.descontoValor),
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
        return handleRequest(api.post('/budget', newData), 'Orçamento cadastrado com sucesso');
    };

    //function to list budgets by id_company
    const listAllBudget = async (id_company) => {
        return handleRequest(api.get(`/list/budget/id_company/${id_company}`));
    };

    //function to delete a budget
    const deleteBudget = async (id) => {
        return handleRequest(api.delete(`/delete/budget/${id}`), 'Orçamento excluído com sucesso');
    };

    // function to list Budget by id to print
    const listBudgetToPrint = async (id) => {
        return handleRequest(api.get(`/print/budget/${id}`));
    };

    //function to list history status budget by id
    const listHistoryBudget = async (id) => {
        return handleRequest(api.get(`/list/historybudgetstatus/${id}`));
    };

    //function to update a status budget
    const updateStatusBudget = async (data, id) => {
      
        return handleRequest(api.put(`/update/budgetstatus/${id}`, data), 'Status do orçamento atualizado com sucesso');
    };

    return (
        <BudgetContext.Provider
            value={{
                loading,
                createBudget,
                listAllBudget,
                deleteBudget,
                listBudgetToPrint,
                updateStatusBudget,
                listHistoryBudget,

            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};