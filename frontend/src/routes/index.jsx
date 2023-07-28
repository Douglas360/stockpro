import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CombinedProvider } from '../context/index';
import Dashboards from '../Pages/Dashboards';
import Cadastro from '../Pages/Cadastro';
import Produto from '../Pages/Produto';
import Orcamento from '../Pages/Orcamento';
import Venda from '../Pages/Venda';
import Login from '../Pages/Login';
import NotaFiscal from '../Pages/NotaFiscal';
import { useAuth } from '../context/AuthContext/useAuth';
import Estoque from '../Pages/Estoque';
import Configuracao from '../Pages/Configuracao';
import Relatorio from '../Pages/Relatorio';

export const AppRouter = () => {

  const Private = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/" replace />
  }

  return (
    <Router>
      <CombinedProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboards/basic" element={<Private><Dashboards /></Private>} />
          <Route path="/cadastro/*" element={<Private><Cadastro /></Private>} />
          <Route path="/produto/*" element={<Private><Produto /></Private>} />
          <Route path="/orcamento/*" element={<Private><Orcamento /></Private>} />
          <Route path="/venda/*" element={<Private><Venda /></Private>} />
          <Route path="/nota-fiscal/*" element={<Private><NotaFiscal /></Private>} />
          <Route path="/estoque/*" element={<Private><Estoque /></Private>} />
          <Route path="/configuracao/*" element={<Private><Configuracao /></Private>} />
          <Route path="/relatorio/*" element= {<Private><Relatorio /></Private>} />

        </Routes>
      </CombinedProvider>
    </Router>
  );
};
