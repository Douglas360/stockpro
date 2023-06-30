import React from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import ListarFornecedor from './ListarFornecedor';

const tabsContent = [
    {
        title: 'Listar Fornecedor',
        content: <ListarFornecedor/>,
        url: 'fornecedor'
    },
    {
        title: 'Cadastrar Fornecedor',
        url: 'fornecedor/cadastrar'

    },

];

export const FornecedorJSX = ({ onTabSelect }) => {

    const handleTabSelect = (index) => {

        onTabSelect(tabsContent[index].url);
    };
    return (
        <>
            <PageTitle
                heading="Listar Fornecedores"
                subheading="Fornecedores cadastrados no sistema."
                icon="lnr lnr-apartment icon-gradient bg-amy-crisp"
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
