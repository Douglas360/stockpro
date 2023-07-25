import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { EmpresaJSX } from './Empresa/EmpresaJSX';
import { GerallJSX } from './Geral/GeralJSX';
import { CertificadoDigitalJSX } from './CertificadoDigital/CertificadoDigitalJSX';
import { UsuarioJSX } from './Usuario/Usuario';
import { CreateUsuario } from './Usuario/CreateUsuario';


const Configuracao = () => {
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
                                element={<EmpresaJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/geral"
                                element={<GerallJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/usuario"
                                element={<UsuarioJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/usuario/cadastrar"
                                element={<CreateUsuario onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/usuario/editar/:id"
                                element={<CreateUsuario onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/certificado-digital"
                                element={<CertificadoDigitalJSX onTabSelect={handleTabSelect} />}
                            />
                            <Route
                                path="/empresa"
                                element={<EmpresaJSX onTabSelect={handleTabSelect} />}
                            />


                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Configuracao