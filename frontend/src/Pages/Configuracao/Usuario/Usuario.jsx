import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { ListarUsuario } from './ListarUsuario';
import Tabs from 'react-responsive-tabs';

const tabsContent = [
  {
    title: 'ListarUsuario',
    content: <ListarUsuario />,
    url: 'usuario'
  },
  {
    title: 'Cadastrar Usuario',
    url: 'usuario/cadastrar'

  },

];

export const UsuarioJSX = ({ onTabSelect }) => {

  const handleTabSelect = (index) => {

    onTabSelect(tabsContent[index].url);
  };
  return (
    <>
      <PageTitle
        heading="Usuários"
        subheading="Usuários cadastrados no sistema."
        icon="lnr lnr-users icon-gradient bg-amy-crisp"

      />
      <Tabs
        tabsWrapperClass="body-tabs body-tabs-layout"
        transform={false}
        showInkBar={true}
        items={tabsContent}
        onSelect={handleTabSelect}

      />
    </>
  )
}
