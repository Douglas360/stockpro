import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { ClienteJSX } from './Cliente/Cliente';
import CadastrarCliente from './Cliente/CadastrarCliente';
import { FornecedorJSX } from './Fornecedor/Fornecedor';
import CadastrarFornecedor from './Fornecedor/CadastarFornecedor';
import { TransportadoraJSX } from './Transportadora/Transportadora';
import CadastrarTransportadora from './Transportadora/CadastrarTransportadora';

const Cadastro = () => {
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

                        {/* Cadastro */}
                        <Routes>
                            <Route
                                path="/"
                                element={<ClienteJSX onTabSelect={handleTabSelect} />}
                            />

                            <Route
                                path="cliente"
                                element={<ClienteJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="cliente/cadastrar"
                                element={<CadastrarCliente />}
                            />
                            <Route
                                path="cliente/editar/:id"
                                element={<CadastrarCliente />}
                            />
                            <Route
                                path="fornecedor"
                                element={<FornecedorJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="fornecedor/cadastrar"
                                element={<CadastrarFornecedor />}
                            />
                            <Route
                                path="fornecedor/editar/:id"
                                element={<CadastrarFornecedor />}
                            />

                            <Route
                                path="transportadora"
                                element={<TransportadoraJSX onTabSelect={handleTabSelect} />}
                            />

                            <Route
                                path="transportadora/cadastrar"
                                element={<CadastrarTransportadora />}
                            />

                            <Route
                                path="transportadora/editar/:id"
                                element={<CadastrarTransportadora />}
                            />




                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default Cadastro;