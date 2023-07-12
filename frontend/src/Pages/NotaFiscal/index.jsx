import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { EmitirNotaFiscal } from './EmitirNf/EmitirNotaFiscal';
import { ListarNotaFiscal } from './GerenciarNf/ListarNotaFiscal';


const NotaFiscal = () => {

    return (
        <>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">

                        {/* NotaFiscal */}
                        <Routes>
                            <Route
                                path="/"
                                element={<EmitirNotaFiscal />}
                            />
                            <Route
                                path="/emitir/:id"
                                element={<EmitirNotaFiscal />}
                            />
                            <Route
                                path="/gerenciar"
                                element={<ListarNotaFiscal />}
                            />



                        </Routes>


                    </div>

                </div>
            </div>
        </>
    )
}


export default NotaFiscal;