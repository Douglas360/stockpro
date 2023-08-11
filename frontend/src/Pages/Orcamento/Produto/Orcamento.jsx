import React from "react";
import ListarOrcamentoProduto from "./ListarOrcamentoProduto";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Tabs from "react-responsive-tabs";

const tabsContent = [
  {
    title: "Listar Orçamento Produtos",
    content: <ListarOrcamentoProduto />,
    url: "produto",
  },
  {
    title: "Cadastrar Orçamento Produtos",
    url: "/orcamento/produto/cadastrar",
  },
];

export const OrcamentoProdutoJSX = ({ onTabSelect }) => {
  const handleTabSelect = (index) => {
    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Orçamentos de produtos"
        subheading="Orçamentos cadastrados no sistema."
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />

      <Tabs
        tabsWrapperClass="body-tabs body-tabs-layout"
        transform={false}
        showInkBar={true}
        items={tabsContent}
        onChange={handleTabSelect}
      />
    </>
  );
};
