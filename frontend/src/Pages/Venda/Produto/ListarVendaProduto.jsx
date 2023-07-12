import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,  faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledButtonDropdown } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { SearchBar } from '../../../components/SearchBar';
import { useOrder } from '../../../context/OrderContext/useOrder';
import { useNavigate } from 'react-router-dom';


const ListarVendaProduto = () => {
    const { listAllOrders } = useOrder();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const loadOrders = async () => {
            const response = await listAllOrders(1);
            setOrders(response);
        };

        loadOrders();
    }, []);

    const handleEmitNfeClick = (status, client) => {
        if (status != "Concretizada") {
            setShowModal(true)
        }
        else {
            navigate(`/nota-fiscal/emitir/${client.id}`)
        }
    }

    const ActionsDropdown = ({ client }) => {
        const navItems = [
            {
                href: '/venda/produto/cadastrar',
                label: 'Alterar situação',
                icon: 'lnr-inbox',
                color: 'success',
            },
            {
                href: '/venda/produto/imprimir',
                label: 'Imprimir A4',
                icon: 'lnr-printer',
                color: 'info',
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
            },
        },
       
    ];

    const status = {
        1: <div className="ms-auto badge bg-success">Concretizada</div>,
        2: <div className="ms-auto badge bg-warning">Em aberto</div>,
        3: <div className="ms-auto badge bg-info">Em andamento</div>,
        4: <div className="ms-auto badge bg-danger">Cancelada</div>,
    };

    const clients = orders?.map(({ numero_venda, nome_cliente, data_venda, id_situacao_venda, valor_total }) => ({
        id: numero_venda,
        nome: nome_cliente,
        date: new Date(data_venda).toLocaleString('pt-br'),
        status: status[id_situacao_venda],
        valor: parseFloat(valor_total).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    }));

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (

        <>
            <SearchBar
                urlNavigate="/venda/produto/cadastrar"
                columns={columns}
                rows={clients}
                msgDelete="Venda Produto"
                actions={actions}
                ActionsDropdown={ActionsDropdown}
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
        </>
    );
};

export default ListarVendaProduto;
