import React from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import ListarValorVenda from './ListarValorVenda';


const tabsContent = [
  {
    title: 'Valor de venda',
    content: <ListarValorVenda />,
    url: 'valores'
  },
  {
    title: 'Cadastrar Produtos',   
    url: 'valores/cadastrar'

  },

];


export const ValorVendaJSX = ({onTabSelect}) => {
  
  const handleTabSelect = (index) => {
   
    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Valores de venda"
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
