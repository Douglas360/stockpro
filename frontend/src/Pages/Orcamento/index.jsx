import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppHeader from "../../Layout/AppHeader";
import { OrcamentoProdutoJSX } from "./Produto/Orcamento";
import CadastrarOrcamentoProduto from "./Produto/CadastrarOrcamentoProduto";
import AppSidebar from "../../Layout/AppSidebar";
import { ConfiguracaoJSX } from "./Configuracao/Configuracao";

const Orcamento = () => {
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
                element={<OrcamentoProdutoJSX onTabSelect={handleTabSelect} />}
              />

              <Route
                path="/produto"
                element={<OrcamentoProdutoJSX onTabSelect={handleTabSelect} />}
              />
              <Route
                path="/produto/cadastrar"
                element={<CadastrarOrcamentoProduto />}
              />
              <Route
                path="/produto/editar/:id"
                element={<CadastrarOrcamentoProduto />}
              />
              <Route path="/configuracao" element={<ConfiguracaoJSX />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orcamento;
