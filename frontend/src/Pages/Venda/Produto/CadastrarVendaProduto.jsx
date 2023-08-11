import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import FormBudget from "../../../components/Budget/FormBudget";
import { useOrder } from "../../../context/OrderContext/useOrder";
import { useBudget } from "../../../context/BudgetContext/useBudget";

const CadastrarVendaProduto = () => {
  const { id, gerarVenda } = useParams();

  const [initialValues, setInitialValues] = useState({
    bairro: null,
    cep: null,
    cidade: null,
    complemento: null,
    estado: null,
    logradouro: null,
    numero: null,
    title: null,
    numeroVenda: null,
    clienteOrcamento: null,
    dataOrcamento: new Date(),
    situacaoVendaOrcamento: null,
    canalVendaOrcamento: null,
    produtos: null,
    id_transportadora: null,
    observacaoOrcamento: null,
    observacaoInternaOrcamento: null,
    valorFrete: null,
    valorProdutos: null,
    valorTotal: null,
    descontoValor: null,
    exibePagamento: null,
    pagamento: null,
    quantidadeParcelas: null,
    dataPrimeiraParcela: new Date(),
    formaPagamentoParcela: null,
    valorAvista: null,
    observacaoAvista: null,
    formaPagamentoAvista: null,
    vencimentoAvista: null,
    vencimento: null,
    pagamentoParcelado: null,
  });

  const { createOrder, getOrderById, updateOrder, loading } = useOrder();
  const { getBudgetById } = useBudget();

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && !gerarVenda) {
      const loadOrder = async () => {
        const response = await getOrderById(id);
        if (response) {
          const Object = {
            id: response.numero_venda,
            bairro: response.bairro,
            cep: response.cep,
            cidade: response.cidade,
            complemento: response.complemento,
            estado: response.estado,
            logradouro: response.logradouro,
            numero: response.numero,
            title: "venda",
            numeroVenda: response.numero_venda,
            clienteOrcamento: response.id_cliente,
            dataOrcamento: response.data_venda
              ? new Date(response.data_venda).toISOString().slice(0, 10)
              : "",
            situacaoVendaOrcamento: response.id_situacao_venda,
            canalVendaOrcamento: response.id_canal_venda,
            produtos: response.itens,
            id_transportadora: response.id_transportadora,
            observacaoOrcamento: response.observacao,
            observacaoInternaOrcamento: response.observacao_interna,
            valorFrete: response.valor_frete,
            valorProdutos: response.valor_produto,
            valorTotal: response.valor_total,
            descontoValor: response.valor_desconto,
            exibePagamento: response.pagamento.length > 0,
            pagamento: response.pagamento,
            quantidadeParcelas: response.pagamento.length,
            dataPrimeiraParcela: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0]?.vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
            formaPagamentoParcela: response.pagamento[0]?.id_forma_pagamento
              ? response.pagamento[0].id_forma_pagamento
              : null,
            valorAvista: response.pagamento[0]?.valor
              ? response.pagamento[0].valor
              : null,
            observacaoAvista: response.pagamento[0]?.observacao
              ? response.pagamento[0].observacao
              : "",
            formaPagamentoAvista: response.pagamento[0]?.id_forma_pagamento
              ? response.pagamento[0].id_forma_pagamento
              : null,
            vencimentoAvista: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0].vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
            vencimento: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0].vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
          };
          setInitialValues(Object);
        }
      };
      loadOrder();
    }
    if (gerarVenda) {
      const loadOrder = async () => {
        const response = await getBudgetById(id);
        if (response) {
          const Object = {
            bairro: response.bairro,
            cep: response.cep,
            cidade: response.cidade,
            complemento: response.complemento,
            estado: response.estado,
            logradouro: response.logradouro,
            numero: response.numero,
            title: "venda",
            numeroVenda: response.numero_orcamento,
            clienteOrcamento: response.id_cliente,
            dataOrcamento: response.data_orcamento
              ? new Date(response.data_orcamento).toISOString().slice(0, 10)
              : "",
            situacaoVendaOrcamento: response.id_situacao_venda,
            produtos: response.itens,
            id_transportadora: response.id_transportadora,
            observacaoOrcamento: response.observacao,
            observacaoInternaOrcamento: response.observacao_interna,
            valorFrete: response.valor_frete,
            valorProdutos: response.valor_produto,
            valorTotal: response.valor_total,
            descontoValor: response.valor_desconto,
            exibePagamento: response.pagamento.length > 0,
            pagamento: response.pagamento,
            quantidadeParcelas: response.pagamento.length,
            introducaoOrcamento: response?.introducao || "",
            canalVendaOrcamento: response.id_canal_orcamento || "",
            validadeOrcamento: response?.validade_orcamento || "",
            dataPrimeiraParcela: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0]?.vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
            formaPagamentoParcela: response.pagamento[0]?.id_forma_pagamento
              ? response.pagamento[0].id_forma_pagamento
              : null,
            valorAvista: response.pagamento[0]?.valor
              ? response.pagamento[0].valor
              : null,
            observacaoAvista: response.pagamento[0]?.observacao
              ? response.pagamento[0].observacao
              : "",
            formaPagamentoAvista: response.pagamento[0]?.id_forma_pagamento
              ? response.pagamento[0].id_forma_pagamento
              : null,
            vencimentoAvista: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0].vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
            vencimento: response.pagamento[0]?.vencimento
              ? new Date(response.pagamento[0].vencimento)
                .toISOString()
                .slice(0, 10)
              : "",
          };

          setInitialValues(Object);
        }
      };
      loadOrder();
    }
  }, [isEditMode, id, gerarVenda]);

  const handleSubmit = async (data) => {
    if (isEditMode && !gerarVenda) {
      console.log(data)
      await updateOrder(data)
    } else {
      //console.log(data)
      await createOrder(data);
    }
  };

  return (
    <div>
      <PageTitle
        heading={isEditMode ? `Editar venda ${id}` : "Cadastrar venda"}
        subheading={isEditMode ? "Editar venda" : "Cadastrar venda"}
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        gerarVenda={gerarVenda}
        isEditMode={isEditMode}
        url="/venda/produto"
        loading={loading}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        handleFormSubmit={handleSubmit}
        typeForm="venda"
      />
    </div>
  );
};

export default CadastrarVendaProduto;
