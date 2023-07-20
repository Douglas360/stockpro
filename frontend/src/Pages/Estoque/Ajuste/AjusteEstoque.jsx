import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import Tabs from 'react-responsive-tabs';
import ListarProdutoEstoque from './ListarProdutoEstoque';

const tabsContent = [
    {
        title: 'Produtos',
        content: <ListarProdutoEstoque />,
        url: 'movimentacao'
    },   
]

export const AjusteEstoqueJSX = ({ onTabSelect }) => {
    const handleTabSelect = (index) => {

        onTabSelect(tabsContent[index].url);
    };
    return (
        <>
            <PageTitle
                heading="Ajuste de estoque"
                subheading="Ajuste de estoque de produtos."
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
    )
}
