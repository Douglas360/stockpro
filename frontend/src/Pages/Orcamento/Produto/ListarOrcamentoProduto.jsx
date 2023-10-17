import React, { useEffect, useState } from "react";

import { useBudget } from "../../../context/BudgetContext/useBudget";
import { SearchBar } from "../../../components/SearchBar";
import { dateFormatWithHours, dateFormatWithoutHours } from "../../../functions/getFomatter";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { printA4 } from "../../../functions/printA4";
import { ChangeStatusModal } from "../../../components/ChangeStatusModal";
import { useOrder } from "../../../context/OrderContext/useOrder";
import { getFormatterInputPrice } from "../../../functions/getFormatterInputPrice";

const ListarOrcamentoProduto = () => {
  const navigate = useNavigate();
  const {
    listAllBudget,
    deleteBudget,
    listBudgetToPrint,
    listHistoryBudget,
    loading,
    updateStatusBudget,
  } = useBudget();
  
  const { listSalesStatus } = useOrder();
  const [budgets, setBudgets] = useState([]);
  const idEmpresa =
    sessionStorage?.getItem("user") || localStorage?.getItem("user");
  const id = JSON.parse(idEmpresa).id_empresa;
  const [data, setData] = useState({});
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);

  async function loadBudgets() {
    const response = await listAllBudget(id);

    setBudgets(response);
  }

  useEffect(() => {
    loadBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteData = async (id) => {
    await deleteBudget(id);
    await loadBudgets();
  };

  const handleChangeStatusClick = async (client) => {
    const response = await listHistoryBudget(client.id);
    response[0].id = client.id;
    setData(response);
    setShowChangeStatusModal(true);
  };

  const handlePrintA4 = async (client) => {
    const response = await listBudgetToPrint(client.id);
    response.title = "ORÇAMENTO";
    printA4(response);
  };

  const ActionsDropdown = ({ client }) => {
    const navItems = [
      {
        //href: '/orcamento/produto/cadastrar',
        label: "Alterar situação",
        icon: "lnr-inbox",
        color: "success",
        onClick: () => handleChangeStatusClick(client),
      },
      {
        //href: '/venda/produto/imprimir',
        label: "Imprimir A4",
        icon: "lnr-printer",
        color: "info",
        onClick: () => handlePrintA4(client),
      },
      {
        //href: '/venda/produto/cadastrar/' + client.id,
        label: "Gerar Venda",
        icon: "lnr-cart",
        color: "success",
        onClick: () => navigate(`/venda/produto/gerar-venda=true/${client.id}/true`),
      },
    ];

    return (
      <UncontrolledButtonDropdown direction="down">
        <DropdownToggle color="link" size="sm">
          <FontAwesomeIcon icon={faPlusSquare} size="xl" />
        </DropdownToggle>
        <DropdownMenu>
          <Nav vertical>
            {navItems.map(({ href, label, icon, color, onClick }) => (
              <NavItem key={href}>
                {/*<NavLink href={`${href}/${client.id}`} className="text-dark">*/}
                <NavLink
                  className="text-dark"
                  onClick={() => onClick(client?.status, client)}
                >
                  <i className={`nav-link-icon ${icon} text-${color}`}></i>
                  <span>{label}</span>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  };

  const columns = ["Nº", "Cliente", "Data", "Situação", "Valor"];

  const actions = [
    {
      label: "Editar",
      icon: faEdit,
      color: "orange",
      onClick: (client) => {
        // Lógica para a ação de edição
        navigate(`/orcamento/produto/editar/${client.id}`);
      },
    },
  ];

  const clients = budgets?.map((budget) => {
    return {
      id: budget.numero_orcamento,
      nome: budget.cliente.nome,
      data_orcamento: dateFormatWithoutHours(budget.data_orcamento),
      status: budget.situacao_venda.descricao,
      valor_total: getFormatterInputPrice(budget.valor_total),
    };
  });

  const toggleChangeStatusModal = () => {
    setShowChangeStatusModal(!showChangeStatusModal);
  };

  return (
    <>
      <SearchBar
        urlNavigate={"/orcamento/produto/cadastrar"}
        columns={columns}
        rows={clients}
        actions={actions}
        ActionsDropdown={ActionsDropdown}
        loading={loading}
        handleDeleteData={handleDeleteData}
        msgDelete={"Orçamento Produto"}
      />
      {showChangeStatusModal && (
        <ChangeStatusModal
          data={data}
          toggleModal={toggleChangeStatusModal}
          isOpen={showChangeStatusModal}
          updateOrderStatus={updateStatusBudget}
          listSalesStatus={listSalesStatus}
          loadOrders={loadBudgets}
          loading={loading}
        />
      )}
    </>
  );
};

export default ListarOrcamentoProduto;
