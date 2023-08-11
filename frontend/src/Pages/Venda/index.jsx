import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import { ConfiguracaoJSX } from "./Configuracao/Configuracao";
import { VendaProdutoJSX } from "./Produto/VendaProduto";
import CadastrarVendaProduto from "./Produto/CadastrarVendaProduto";

const Venda = () => {
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
                element={<VendaProdutoJSX onTabSelect={handleTabSelect} />}
              />

              <Route
                path="/produto"
                element={<VendaProdutoJSX onTabSelect={handleTabSelect} />}
              />
              <Route
                path="/produto/cadastrar"
                element={<CadastrarVendaProduto />}
              />
              <Route
                path="/produto/gerar-venda/"
                element={<CadastrarVendaProduto />}
              />
              <Route
                path="/produto/editar/:id"
                element={<CadastrarVendaProduto />}
              />
              <Route
                path="/produto/gerar-venda=true/:id/:gerarVenda"
                element={<CadastrarVendaProduto />}
              />
              <Route path="/configuracao" element={<ConfiguracaoJSX />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Venda;
