import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { ProdutoJSX } from './GerenciarProduto/Produto';
import CadastrarProduto from './GerenciarProduto/CadastrarProduto';
import { ValorVendaJSX } from './ValorDeVenda/ValorVenda';
import CadastrarValoreVenda from './ValorDeVenda/CadastrarValoreVenda';

const Produto = () => {
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

                        {/* Produto */}
                        <Routes>
                            <Route
                                path="/"
                                element={<ProdutoJSX onTabSelect={handleTabSelect} />}
                            />

                            <Route
                                path="gerenciar"
                                element={<ProdutoJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="gerenciar/cadastrar"
                                element={<CadastrarProduto />}
                            />

                            <Route
                                path="valores"
                                element={<ValorVendaJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="valores/cadastrar"
                                element={<CadastrarValoreVenda />}
                            />
                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default Produto;