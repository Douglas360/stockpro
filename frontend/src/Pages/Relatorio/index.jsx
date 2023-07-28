import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { RelatorioCadastroJSX } from './Cadastro/Cadastro';
import { Cliente } from './Cadastro/Cliente';
import { Produto } from './Cadastro/Produto';
import { RelatorioVendaJSX } from './Venda/Venda';
import { Orcamento } from './Venda/Orcamento';

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
                                element={<RelatorioCadastroJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/cadastros"
                                element={<RelatorioCadastroJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/cadastros/clientes"
                                element={<Cliente onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/cadastros/produtos"
                                element={<Produto onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/vendas"
                                element={<RelatorioVendaJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route  
                                path="/vendas/orcamentos"
                                element={<Orcamento/>}
                            />


                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default Relatorio;