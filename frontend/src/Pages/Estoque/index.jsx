import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { AjusteEstoqueJSX } from './Ajuste/AjusteEstoque';
import { CadastrarAjusteEstoque } from './Ajuste/CadastrarAjusteEstoque';
import { AjusteEstoqueProduto } from './Ajuste/AjusteEstoqueProduto';


const Estoque = () => {
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
                                element={<AjusteEstoqueJSX onTabSelect={handleTabSelect} />}
                            />

                            <Route
                                path="movimentacao"
                                element={<AjusteEstoqueJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="movimentacao/cadastrar"
                                element={<CadastrarAjusteEstoque onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="movimentacao/editar/:id"
                                element={<AjusteEstoqueProduto onTabSelect={handleTabSelect} />}
                            />

                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default Estoque;