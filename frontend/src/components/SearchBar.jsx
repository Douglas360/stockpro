import { faArrowDown, faFileExcel, faGears, faPlusCircle, faSearch, faTrashArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledTooltip } from 'reactstrap'

import { useNavigate } from 'react-router-dom';
import { AdvancedSearch } from './AdvancedSearch';
import TableView from './TableView';

const DeleteModal = ({ isOpen, toggleModal, handleConfirm }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggleModal} >
            <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <ModalHeader toggle={toggleModal} className="text-lg font-medium mb-4">
                    Confirmação de exclusão
                </ModalHeader>
                <ModalBody className="text-gray-600 mb-6">Tem certeza que deseja excluir?</ModalBody>
                <ModalFooter className="flex justify-end">
                    <Button color="secondary" outline className="mr-2" onClick={toggleModal}>
                        Cancelar
                    </Button>
                    <Button color="danger" outline onClick={handleConfirm}>
                        Excluir
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
};

export const SearchBar = ({
    urlNavigate,
    columns,
    rows,
    msgDelete,
    handleDeleteData,
    loading,
    actions,
    ActionsDropdown,
    columnsToFilter

}) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);
    const toggleAdvancedSearch = () =>
        setIsAdvancedSearchVisible(!isAdvancedSearchVisible);

    const navigate = useNavigate();

    const handleAddClient = () => {
        navigate(urlNavigate);
    };

    const handleDeleteClients = () => {
        // Delete clients logic here
    };

    const handleImportClients = () => {
        // Import clients logic here
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

    };

    const handleAdvancedSearch = () => {
        // Advanced search logic here
    };

    const columnsTo =  ['nome', 'email', 'telefone', 'celular'];

    const filteredData = rows?.filter((client) =>
        columnsTo.some(
            (column) =>
                client[column]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        
    );

    /*const filteredData = rows?.filter(
        (client) =>
            client?.nome.toLowerCase().includes(searchTerm.toLowerCase())/* ||
            client?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client?.telefone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client?.celular.toLowerCase().includes(searchTerm.toLowerCase())

    )*/

    const newActions = [
        ...actions ? actions : [],
        {
            label: 'Excluir',
            icon: faTrashCan,
            color: 'red',
            onClick: (client) => {
                setSelectedItem(client.id);
                setDeleteModalOpen(true);
            },
        },
    ];


    const renderActions = (client) => {
        return (
            <>
                {newActions.map((action, index) => (
                    <React.Fragment key={index}>
                        <UncontrolledTooltip
                            placement="top"
                            target={`${action.label}-${client.id}`}
                            style={{ fontSize: '.6rem', padding: '4px 8px' }}
                        >
                            {action.label}
                        </UncontrolledTooltip>


                        <FontAwesomeIcon
                            icon={action.icon}
                            id={`${action.label}-${client.id}`}
                            className="me-1 btn-transition"
                            size="xl"
                            style={{ cursor: 'pointer', color: action.color }}
                            onClick={() => action.onClick(client)}
                        />
                    </React.Fragment>
                ))}

                {ActionsDropdown && (
                    <ActionsDropdown client={client} />
                )}
            </>
        );
    };


    const handleConfirm = () => {
        handleDeleteData(selectedItem);
        setDeleteModalOpen(false);
    };

    return (
        <>

            <Row className="mb-1">
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50
                        }}
                    >
                        <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
                    </div>
                )}
                <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button color="primary" onClick={handleAddClient}>
                        <FontAwesomeIcon icon={faPlusCircle} size='xl' />
                        <span> Adicionar</span>
                    </Button>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="d-none d-sm-block">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret>
                            <FontAwesomeIcon icon={faGears} size='xl' />
                            <span> Mais Ações</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={handleImportClients}>
                                <FontAwesomeIcon icon={faFileExcel} size='lg' style={{ color: 'green' }} />
                                <span style={{ marginLeft: '1.0rem' }}> Importar de uma planilha</span>
                            </DropdownItem>
                            <DropdownItem onClick={handleDeleteClients}>
                                <FontAwesomeIcon icon={faTrashArrowUp} size='lg' style={{ color: 'red' }} />
                                <span style={{ marginLeft: '1.0rem' }}>   Excluir {msgDelete}</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col xs={12} sm={12} md={12} lg={7} className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-between flex-grow-1">
                        <div className="flex-grow-1">
                            <InputGroup>
                                <Input type="text" placeholder="Buscar por nome"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputGroupText addonType="append">
                                    <FontAwesomeIcon icon={faSearch} size="xl" onClick={handleSearch}
                                    />

                                </InputGroupText>
                            </InputGroup>
                        </div>
                        <div className="d-flex  align-items-center" style={{ marginLeft: '1rem' }}>
                            <Button color="secondary" onClick={toggleAdvancedSearch} disabled>
                                Busca Avançada <FontAwesomeIcon icon={faArrowDown} />
                            </Button>
                        </div>
                    </div>
                </Col>
                {isAdvancedSearchVisible && (
                    <Col xs={12} className="mt-3">
                        <AdvancedSearch advancedSearch={handleAdvancedSearch} />
                    </Col>
                )}

            </Row>
            <Row>
                <Col >
                    <TableView
                        columns={columns}
                        rows={filteredData}
                        handleDeleteData={handleDeleteData}
                        renderActions={renderActions}
                    />
                </Col>
            </Row>
            <DeleteModal
                isOpen={deleteModalOpen}
                toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
                handleConfirm={handleConfirm}
            />
        </>
    )
}
