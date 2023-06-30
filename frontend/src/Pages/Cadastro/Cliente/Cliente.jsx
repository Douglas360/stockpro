import React from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import ListarClientes from './ListarCliente';

const tabsContent = [
  {
    title: 'Listar Clientes',
    content: <ListarClientes />,
    url: 'cliente'
  },
  {
    title: 'Cadastrar Clientes',   
    url: 'cliente/cadastrar'

  },

];

export const ClienteJSX = ({onTabSelect}) => {
  
  const handleTabSelect = (index) => {
   
    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Listar Clientes"
        subheading="Clientes cadastrados no sistema."
        icon="pe-7s-users icon-gradient bg-amy-crisp"
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
