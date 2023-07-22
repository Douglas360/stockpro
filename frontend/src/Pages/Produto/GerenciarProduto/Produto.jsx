import React from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import ListarProdutos from './ListarProduto';

const tabsContent = [
  {
    title: 'Listar Produtos',
    content: <ListarProdutos />,
    url: 'gerenciar'
  },
  {
    title: 'Cadastrar Produtos',
    url: 'gerenciar/cadastrar'

  },

];


export const ProdutoJSX = ({ onTabSelect }) => {

  const handleTabSelect = (index) => {

    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Listar Produtos"
        subheading="Produtos cadastrados no sistema."
        icon="pe-7s-box1 icon-gradient bg-amy-crisp"
      />


      <Tabs
        tabsWrapperClass="body-tabs body-tabs-layout"
        transform={false}
        showInkBar={true}
        items={tabsContent}
        onChange={handleTabSelect}

      />

    </>
  )
}
