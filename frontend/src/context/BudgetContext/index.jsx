import { createContext, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { cleanCurrencyMask } from "../../functions/cleanCurrencyMask";

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
      console.log(error);
      const message = error.response?.data.error || "Erro desconhecido";
      toast.error(message, {
        autoClose: 4000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createBudget = async (data) => {  
    const pagamento =
      Array.isArray(data.pagamentoParcelado) &&
        data.pagamentoParcelado.length > 0
        ? data.pagamentoParcelado?.map((pagamento) => {
          return {
            id_forma_pagamento: +pagamento.id_forma_pagamento,
            valor: pagamento.valor,
            vencimento: pagamento.vencimento,
            observacao: pagamento.observacao,
            venda: true,
            parcelado: true,
          };
        })
        : [
          {
            id_forma_pagamento: data?.pagamentoParcelado
              ?.formaPagamentoParcela
              ? data?.pagamentoParcelado?.formaPagamentoParcela
              : +data.formaPagamentoAvista,
            observacao: data?.pagamentoParcelado?.observacao
              ? data?.pagamentoParcelado?.observacao
              : data?.observacaoAvista,
            parcelado: false,
            valor: data?.pagamentoParcelado?.valor
              ? +data?.pagamentoParcelado?.valor.toFixed(2)
              : +data.valorTotal.toFixed(2),
            vencimento: data?.pagamentoParcelado?.vencimento
              ? new Date(data?.pagamentoParcelado?.vencimento).toISOString()
              : new Date().toISOString(),
            venda: true,
          },
        ];

    const newData = {
      budgetData: {
        numero_orcamento: parseInt(data.numeroVenda),
        //Pegar horario do BRasil
        data_orcamento: new Date(data.dataInclusao).toISOString(),
        //data_orcamento: date,
        id_empresa: parseInt(data.id_empresa),
        id_cliente: parseInt(data.clienteOrcamento),
        id_situacao_venda: parseInt(data.situacaoVendaOrcamento) || 1,
        id_canal_orcamento: parseInt(data.canalVendaOrcamento) || 1,
        id_user: parseInt(data.id_user),
        id_forma_pagamento: parseInt(data.formaPagamentoAvista) || 1,
        id_transportadora: parseInt(data.id_transportadora),
        valor_total: +data.valorTotal.toFixed(2),
        validade_orcamento: data.validadeOrcamento || "",
        introducao: data.introducaoOrcamento || "",
        valor_desconto: cleanCurrencyMask(data.valorDesconto),
        valor_frete: cleanCurrencyMask(data.valorFrete),
        valor_produto: +data.valorProdutos.toFixed(2),
        observacao: data.observacaoOrcamento,
        observacao_interna: data.observacaoInternaOrcamento,
        cep: data.cep || "",
        logradouro: data.logradouro || "",
        numero: data.numero || "",
        complemento: data.complemento || "",
        bairro: data.bairro || "",
        cidade: data.cidade || "",
        estado: data.estado || "",
        itens: data.produtos?.map((produto) => {
          return {
            id_produto: +produto.id_produto,
            numero_item: +produto.numero_item,
            quantidade: +produto.quantidade,
            id_tipo_venda: +produto.id_tipo_venda,
            desconto: +produto.desconto,
            tipo_desconto: produto.tipo_desconto,
            valor_unitario: +produto.valor_unitario,
            valor_total: produto?.valor_total
              ? +produto?.valor_total.toFixed(2)
              : +produto?.subtotal.toFixed(2),
          };
        }),
        pagamentos: pagamento,
      },
    };

    return handleRequest(
      api.post("/budget", newData),
      "Orçamento cadastrado com sucesso"
    );
  };

  //function to list budgets by id_company
  const listAllBudget = async (id_company) => {
    return handleRequest(api.get(`/list/budget/id_company/${id_company}`));
  };

  //function to delete a budget
  const deleteBudget = async (id) => {
    return handleRequest(
      api.delete(`/delete/budget/${id}`),
      "Orçamento excluído com sucesso"
    );
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
    return handleRequest(
      api.put(`/update/budgetstatus/${id}`, data),
      "Status do orçamento atualizado com sucesso"
    );
  };
  //function to list Budget by id
  const getBudgetById = async (id) => {
    return handleRequest(api.get(`/list/budget/${id}`));
  };
  //function to update a Budget by id
  const updateBudget = async (data) => {
    const pagamento =
      Array.isArray(data.pagamentoParcelado) &&
        data?.pagamentoParcelado.length > 0
        ? data.pagamentoParcelado?.map((pagamento) => {
          return {
            id_forma_pagamento: +pagamento.id_forma_pagamento,
            valor: pagamento.valor,
            vencimento: pagamento.vencimento,
            observacao: pagamento.observacao,
            venda: true,
            parcelado: true,
          };
        })
        : [
          {
            id_forma_pagamento: data?.pagamentoParcelado
              ?.formaPagamentoParcela
              ? data?.pagamentoParcelado?.formaPagamentoParcela
              : +data.formaPagamentoAvista,
            observacao: data?.pagamento[0]?.observacao,
            parcelado: false,
            valor: data?.pagamento[0]?.valor
              ? +data?.pagamento[0]?.valor.toFixed(2)
              : +data?.valorTotal.toFixed(2),
            vencimento: data?.pagamento[0]?.vencimento
              ? new Date(data?.pagamento[0]?.vencimento).toISOString()
              : new Date().toISOString(),
            venda: false,
          },
        ];

    const newData = {
      budgetData: {
        numero_orcamento: parseInt(data.numeroVenda),
        //Pegar horario do BRasil
        //data_orcamento: new Date(data.dataInclusao).toISOString(),
        data_orcamento: new Date(data.dataInclusao).toISOString(),
        id_empresa: parseInt(data.id_empresa),
        id_cliente: parseInt(data.clienteOrcamento),
        id_situacao_venda: parseInt(data.situacaoVendaOrcamento) || 1,
        id_canal_orcamento: parseInt(data.canalVendaOrcamento) || 1,
        id_user: parseInt(data.id_user),
        id_forma_pagamento: parseInt(data.formaPagamentoAvista) || 1,
        id_transportadora: parseInt(data.id_transportadora),
        valor_total: +data.valorTotal.toFixed(2),
        validade_orcamento: data.validadeOrcamento || "",
        introducao: data.introducaoOrcamento || "",
        valor_desconto: cleanCurrencyMask(data.valorDesconto),
        valor_frete: cleanCurrencyMask(data.valorFrete),
        valor_produto: +data.valorProdutos.toFixed(2),
        observacao: data.observacaoOrcamento,
        observacao_interna: data.observacaoInternaOrcamento,
        cep: data.cep || "",
        logradouro: data.logradouro || "",
        numero: data.numero || "",
        complemento: data.complemento || "",
        bairro: data.bairro || "",
        cidade: data.cidade || "",
        estado: data.estado || "",
        itens: data.produtos?.map((produto) => {
          return {
            id_produto: +produto.id_produto,
            numero_item: +produto.numero_item,
            quantidade: +produto.quantidade,
            id_tipo_venda: +produto.id_tipo_venda,
            desconto: +produto.desconto,
            tipo_desconto: produto.tipo_desconto,
            valor_unitario: +produto.valor_unitario,
            valor_total: produto?.valor_total
              ? +produto?.valor_total.toFixed(2)
              : +produto?.subtotal.toFixed(2),
          };
        }),
        pagamentos: pagamento,
      },
    };
    return handleRequest(
      api.put(`/update/budget/${data.id}`, newData),
      "Orçamento atualizado com sucesso"
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        loading,
        createBudget,
        updateBudget,
        listAllBudget,
        deleteBudget,
        listBudgetToPrint,
        updateStatusBudget,
        listHistoryBudget,
        getBudgetById,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
