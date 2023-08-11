import { createContext, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../../config/ErrorMessage";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  /*const navigate = useNavigate();*/
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
      const message =
        ERROR_MESSAGES[error.response?.data.error] || "Erro desconhecido";
      toast.error(message, {
        autoClose: 4000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (data) => {
    const date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );

    const pagamento = Array.isArray(data.pagamentoParcelado)
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
          id_forma_pagamento: data?.pagamentoParcelado?.formaPagamentoParcela,
          observacao: data?.pagamentoParcelado?.observacao,
          parcelado: false,
          valor: data?.pagamentoParcelado?.valor
            ? +data?.pagamentoParcelado?.valor.toFixed(2)
            : +data?.valorTotal.toFixed(2),
          vencimento: data?.pagamentoParcelado?.vencimento ? new Date(data?.pagamentoParcelado?.vencimento).toISOString() : new Date().toISOString(),
          venda: true,
        },
      ];

    const newData = {
      orderData: {
        numero_venda: parseInt(data.numeroVenda),
        data_venda: date,
        id_empresa: parseInt(data.id_empresa),
        id_cliente: parseInt(data.clienteOrcamento),
        id_situacao_venda: parseInt(data.situacaoVendaOrcamento) || 1,
        id_canal_venda: parseInt(data.canalVendaOrcamento) || 1,
        id_user: parseInt(data.id_user),
        id_forma_pagamento: parseInt(data.formaPagamentoAvista) || 1,
        id_transportadora: parseInt(data.id_transportadora),
        valor_total: +data?.valorTotal.toFixed(2),
        valor_desconto: parseFloat(data.descontoValor),
        valor_frete: parseFloat(data.valorFrete),
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
            valor_total: produto.valor_total
              ? +produto.valor_total
              : +produto.subtotal,
          };
        }),
        pagamentos: pagamento,
      },
    };

    return handleRequest(
      api.post("/order", newData),
      "Venda cadastrada com sucesso"
    );
  };

  //function to list order by id
  const getOrderById = async (id) => {
    return handleRequest(api.get(`/list/order/${id}`));
  };

  //function to list all Orders by id_empresa
  const listAllOrders = async (id_empresa) => {
    return handleRequest(api.get(`/list/order/id_company/${id_empresa}`));
  };

  //function to list all Sales Status
  const listSalesStatus = async () => {
    return handleRequest(api.get("/list/salesstatus"));
  };

  //function to list history of a Order by id
  const listHistoryOrder = async (id) => {
    return handleRequest(api.get(`/list/historysalesstatus/${id}`));
  };

  //function to delete a Order by id
  const deleteOrder = async (data) => {
    return handleRequest(
      api.delete(`/delete/order/${data}`),
      "Venda deletada com sucesso"
    );
  };

  //function to update a Order Status by id
  const updateOrderStatus = async (data, id) => {
    return handleRequest(
      api.put(`/update/orderstatus/${id}`, data),
      "Status da venda atualizado com sucesso"
    );
  };

  //function to cancel a Order by id
  const cancelOrder = async (data) => {
    return handleRequest(
      api.put(`/cancel/order/${data}`),
      "Venda cancelada com sucesso"
    );
  };

  //function to list Order by id to print A4
  const listOrderToPrint = async (data) => {
    return handleRequest(api.get(`/print/order/${data}`));
  };
  //function to list type of payment
  const listTypePayment = async () => {
    return handleRequest(api.get("/formpayment"));
  };
  //function to list type of sale
  const listTypeSale = async () => {
    return handleRequest(api.get("/typesale"));
  };
  //function to update order
  const updateOrder = async (data) => {
    const date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );

    const pagamento = Array.isArray(data.pagamentoParcelado)
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
          id_forma_pagamento: data?.pagamentoParcelado?.formaPagamentoParcela,
          observacao: data?.pagamentoParcelado?.observacao,
          parcelado: false,
          valor: data?.pagamentoParcelado?.valor
            ? +data?.pagamentoParcelado?.valor.toFixed(2)
            : +data?.valorTotal.toFixed(2),
          vencimento: data?.pagamentoParcelado?.vencimento ? new Date(data?.pagamentoParcelado?.vencimento).toISOString() : new Date().toISOString(),
          venda: true,
        },
      ];

    const newData = {
      orderData: {
        numero_venda: parseInt(data.numeroVenda),
        data_venda: date,
        id_empresa: parseInt(data.id_empresa),
        id_cliente: parseInt(data.clienteOrcamento),
        id_situacao_venda: parseInt(data.situacaoVendaOrcamento) || 1,
        id_canal_venda: parseInt(data.canalVendaOrcamento) || 1,
        id_user: parseInt(data.id_user),
        id_forma_pagamento: parseInt(data.formaPagamentoAvista) || 1,
        id_transportadora: parseInt(data.id_transportadora),
        valor_total: +data?.valorTotal.toFixed(2),
        valor_desconto: parseFloat(data.descontoValor),
        valor_frete: parseFloat(data.valorFrete),
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
            valor_total: produto.valor_total
              ? +produto.valor_total
              : +produto.subtotal,
          };
        }),
        pagamentos: pagamento,
      },
    };
    return handleRequest(api.put(`/update/order/${data.id}`, newData), 'Venda atualizada com sucesso');
  };


  return (
    <OrderContext.Provider
      value={{
        loading,
        createOrder,
        updateOrder,
        listAllOrders,
        listSalesStatus,
        listHistoryOrder,
        deleteOrder,
        updateOrderStatus,
        cancelOrder,
        getOrderById,
        listOrderToPrint,
        listTypePayment,
        listTypeSale,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
