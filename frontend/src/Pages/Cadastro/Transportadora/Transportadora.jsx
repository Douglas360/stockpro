import React from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import ListarTranportadora from './ListarTransportadora';

const tabsContent = [
    {
        title: 'Listar Transportadora',
        content: <ListarTranportadora/>,
        url: 'transportadora'
    },
    {
        title: 'Cadastrar Transportadora',
        url: 'transportadora/cadastrar'

    },

];

export const TransportadoraJSX = ({ onTabSelect }) => {

    const handleTabSelect = (index) => {

        onTabSelect(tabsContent[index].url);
    };
    return (
        <>
            <PageTitle
                heading="Listar Transportadoras"
                subheading="Transportadoras cadastrados no sistema."
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
