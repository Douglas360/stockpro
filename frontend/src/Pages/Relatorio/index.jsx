import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { RelatorioCadastroJSX } from './Cadastro/Cadastro';
import { Cliente } from './Cadastro/Cliente';
import { Produto } from './Cadastro/Produto';

import { Orcamento } from './Venda/Orcamento';
import { RelatorioVendaJSX } from './Venda/VendasJSX';
import { Venda } from './Venda/Venda';

import {ClientesMaisCompra} from './Venda/ClientesMaisCompra';
import { ProdutosVendidos } from './Venda/ProdutosVendidos';

const Relatorio = () => {
    const navigate = useNavigate();

    const handleTabSelect = (url) => {
        navigate(url); // Update the URL with the selected tab URL         
    };

    return (
        <>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">

                        {/* Relatorio */}
                        <Routes>
                            <Route
                                path="/"
                                element={<RelatorioCadastroJSX />}
                            />
                            <Route
                                path="/cadastros"
                                element={<RelatorioCadastroJSX />}
                            />
                            <Route
                                path="/cadastros/clientes"
                                element={<Cliente />}
                            />
                            <Route
                                path="/cadastros/produtos"
                                element={<Produto />}
                            />
                            <Route
                                path="/vendas"
                                element={<RelatorioVendaJSX />}
                            />
                            <Route
                                path="/vendas/orcamentos"
                                element={<Orcamento />}
                            />
                            <Route
                                path='/vendas/vendas'
                                element={<Venda />}
                            />
                            <Route
                                path='/vendas/produtos-vendidos'
                                element={<ProdutosVendidos />}
                            />
                            <Route
                                path='/vendas/clientes-que-mais-compraram'
                                element={<ClientesMaisCompra />}
                            />


                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default Relatorio;