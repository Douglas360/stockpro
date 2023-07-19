import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledButtonDropdown } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { SearchBar } from '../../../components/SearchBar';
import { useOrder } from '../../../context/OrderContext/useOrder';
import { useNavigate } from 'react-router-dom';
import { ChangeStatusModal } from './ChangeStatusModal';
import { printA4 } from '../../../functions/printA4';


const ListarVendaProduto = () => {
    const { listAllOrders, listHistoryOrder, deleteOrder, cancelOrder, loading, listOrderToPrint } = useOrder();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user');
    const id = JSON.parse(idEmpresa).id_empresa;

    const loadOrders = async () => {
        const response = await listAllOrders(id);

        setOrders(response);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleEmitNfeClick = (status, client) => {
        if (status !== "Concretizada") {
            setShowModal(true)
        }
        else {
            navigate(`/nota-fiscal/emitir/${client.id}`)
        }
    }
    const handleDelete = async (id) => {
        await deleteOrder(id);
        await loadOrders();
    };
    const handleChangeStatusClick = async (client) => {
        const response = await listHistoryOrder(client.id)
        //pass id to modal 
        response[0].id = client.id
        setData(response)
        setShowChangeStatusModal(true)
    }
    const handleCancelOrder = async (client) => {
        if (client.status.props.children === "Cancelada") {
            alert("Venda ja está cancelada")
            return
        }
        alert(`Cancelar a venda ${client.id}`);
        await cancelOrder(client.id);
        await loadOrders();
    };

    const handlePrintA4 = async (client) => {
        const response = await listOrderToPrint(client.id)
        printA4(response);
    };

    const ActionsDropdown = ({ client }) => {
        const navItems = [
            {
                href: '/venda/produto/cadastrar',
                label: 'Alterar situação',
                icon: 'lnr-inbox',
                color: 'success',
                onClick: () => handleChangeStatusClick(client),


            },
            {
                href: '/venda/produto/imprimir',
                label: 'Imprimir A4',
                icon: 'lnr-printer',
                color: 'info',
                onClick: () => handlePrintA4(client),
            },
            {
                href: '/venda/produto/emitirNfe',
                label: 'Emitir NF-e',
                icon: 'lnr-license',
                color: 'warning',
                onClick: handleEmitNfeClick
            },
            {
                href: '/venda/produto/devolucao',
                label: 'Realizar Devolução',
                icon: 'lnr-undo',
                color: 'danger',
                onClick: () => handleCancelOrder(client)
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
                                <NavLink className="text-dark" onClick={() => onClick(client?.status.props.children, client)}>
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

    const columns = ['Nº', 'Cliente', 'Data', 'Situação', 'Valor'];

    const actions = [

        {
            label: 'Editar',
            icon: faEdit,
            color: 'orange',
            onClick: (client) => {
                // Lógica para a ação de edição
                navigate(`/venda/produto/editar/${client.id}`);
            },
        },

    ];


    const clients = orders?.map(({ numero_venda, nome_cliente, data_venda, situacao_venda, valor_total, cor }) => ({
        id: numero_venda,
        nome: nome_cliente,
        date: new Date(data_venda).toLocaleString('pt-br'),
        status: <div className="ms-auto badge" style={{ backgroundColor: cor }}>{situacao_venda}</div>,
        valor: parseFloat(valor_total).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    }));

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const toggleChangeStatusModal = () => {
        setShowChangeStatusModal(!showChangeStatusModal);
    };

    return (

        <>
            <SearchBar
                urlNavigate="/venda/produto/cadastrar"
                columns={columns}
                rows={clients}
                msgDelete="Venda Produto"
                actions={actions}
                loading={loading}
                ActionsDropdown={ActionsDropdown}
                handleDeleteData={handleDelete}
            />
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Situação inválida</ModalHeader>
                <ModalBody>
                    Só é possível emitir NF-e para vendas concretizadas.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Fechar
                    </Button>
                </ModalFooter>
            </Modal>

            {showChangeStatusModal &&
                <ChangeStatusModal
                    isOpen={showChangeStatusModal}
                    toggleModal={toggleChangeStatusModal}
                    data={data}
                    loadOrders={loadOrders}

                />

            }
        </>
    );
};

export default ListarVendaProduto;
