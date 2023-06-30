import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import CadastrarConfiguracao from './CadastrarConfiguracao';

export const ConfiguracaoJSX = () => {
    return (
        <>
            <PageTitle
                heading="Configurações de orçamento"
                subheading="Configurações de orçamento."
                icon="lnr lnr-cog icon-gradient bg-amy-crisp"
            />
            <CadastrarConfiguracao />
        </>
    )
}
