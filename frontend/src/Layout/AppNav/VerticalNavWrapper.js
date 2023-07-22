import React from 'react';
import PropTypes from 'prop-types';
import MetisMenu from 'react-metismenu';
import { MainNav, CadastroNav, ProdutoNav, OrcamentoNav, VendaNav, EstoqueNav, NotaFiscalNav, RelatorioNav, ConfiguracaoNav, SairNav, } from './NavItems';

const Nav = () => {

    return (
        <>
            <h5 className="app-sidebar__heading">PRINCIPAL</h5>

            <MetisMenu
                content={MainNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />

            <MetisMenu
                content={CadastroNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={ProdutoNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={OrcamentoNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={VendaNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={EstoqueNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={NotaFiscalNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={RelatorioNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            <MetisMenu
                content={ConfiguracaoNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
            />
            {/* <MetisMenu
                content={SairNav}
                activeLinkFromLocation
                className="vertical-nav-menu"
                iconNamePrefix=""
                classNameStateIcon="pe-7s-angle-down"
                LinkComponent={(props) => <CustomMenuItem {...props} />} // Use the custom menu item component
    />*/}

        </>
    );
};

export default Nav;