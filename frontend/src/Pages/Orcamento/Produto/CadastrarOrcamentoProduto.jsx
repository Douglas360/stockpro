import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import FormBudget from "../../../components/Budget/FormBudget";
import { useBudget } from "../../../context/BudgetContext/useBudget";

const CadastrarOrcamentoProduto = () => {
  const { id } = useParams();
  const { createBudget, getBudgetById, loading } = useBudget();

  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState({
    bairro: "",
    cep: "",
    cidade: "",
    complemento: "",
    estado: "",
    logradouro: "",
    numero: "",
    title: "",
    numeroVenda: "",
    clienteOrcamento: "",
    dataOrcamento: new Date().toISOString().slice(0, 10),
    situacaoVendaOrcamento: "",
    canalVendaOrcamento: "",
    produtos: "",
    id_transportadora: "",
    observacaoOrcamento: "",
    observacaoInternaOrcamento: "",
    valorFrete: null,
    valorProdutos: null,
    valorTotal: null,
    valorDesconto: null,
  });

  useEffect(() => {
    if (isEditMode) {
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
            valorDesconto: response.valor_desconto,
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
  }, [isEditMode, id]);

  const handleSubmit = async (data) => {
    if (isEditMode) {
      console.log(data);
    } else {
      await createBudget(data);
    }
  };

  return (
    <div>
      <PageTitle
        heading={isEditMode ? `Editar orçamento ${id}` : "Cadastrar orçamento"}
        subheading={isEditMode ? "Editar orçamento" : "Cadastrar orçamento"}
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        isEditMode={isEditMode}
        url="/orcamento/produto"
        handleFormSubmit={handleSubmit}
        loading={loading}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        typeForm="orcamento"
      />
    </div>
  );
};

export default CadastrarOrcamentoProduto;
