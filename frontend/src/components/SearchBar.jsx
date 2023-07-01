import { faArrowDown, faFileExcel, faGears, faPlusCircle, faSearch, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText, Row, Spinner } from 'reactstrap'

import { useNavigate } from 'react-router-dom';
import { AdvancedSearch } from './AdvancedSearch';
import TableView from './TableView';

export const SearchBar = ({
    urlNavigate,
    columns,
    rows,
    msgDelete,
    handleDeleteData,
    loading,

}) => {
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
    const filteredData = rows.filter(
        (client) =>
            client?.nome.toLowerCase().includes(searchTerm.toLowerCase())/* ||
            client?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client?.telefone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client?.celular.toLowerCase().includes(searchTerm.toLowerCase())*/

    );
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
                    />
                </Col>
            </Row>
        </>
    )
}
