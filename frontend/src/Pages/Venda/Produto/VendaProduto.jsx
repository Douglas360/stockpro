import React from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Tabs from "react-responsive-tabs";
import ListarVendaProduto from "./ListarVendaProduto";

const tabsContent = [
  {
    title: "Listar Vendas de Produtos",
    content: <ListarVendaProduto />,
    url: "produto",
  },
  {
    title: "Realizar Venda de Produtos",
    url: "/venda/produto/cadastrar",
  },
];

export const VendaProdutoJSX = ({ onTabSelect }) => {
  const handleTabSelect = (index) => {
    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Venda de produtos"
        subheading="Venda cadastradas no sistema."
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
