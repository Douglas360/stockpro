import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSadTear, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'react-bootstrap';
import { useRegister } from '../context/RegisterContext/useRegister';

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

const TableView = ({ columns, rows, handleDeleteData }) => {
    const { loading } = useRegister();
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [openEditTooltip, setOpenEditTooltip] = useState({});
    const [openDeleteTooltip, setOpenDeleteTooltip] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleItemsPerPage = (e) => {
        setCurrentPage(1);
        setItemsPerPage(+e.target.value);
    };

    const handleConfirm = () => {
        handleDeleteData(selectedItem);
        setDeleteModalOpen(false);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };
    // Sorting function
    const sortData = (data) => {
        const sortedData = data.slice().sort((a, b) => {
            // Implement your custom sorting logic based on the sortColumn and sortOrder
            // For example, if sorting by the "Nome" column:
            if (sortColumn === 'nome') {
                if (sortOrder === 'asc') {
                    return a.nome.localeCompare(b.nome);
                } else {
                    return b.nome.localeCompare(a.nome);
                }
            }
            if (sortColumn === 'tipo') {
                if (sortOrder === 'asc') {
                    return a.tipo.localeCompare(b.tipo);
                } else {
                    return b.tipo.localeCompare(a.tipo);
                }
            }
            if (sortColumn === 'ativo') {
                if (sortOrder === 'asc') {
                    return a.ativo.localeCompare(b.ativo);
                } else {
                    return b.ativo.localeCompare(a.ativo);
                }
            }
            if (sortColumn === 'Cadastrado em') {
                if (sortOrder === 'asc') {
                    return a.createdAt.localeCompare(b.createdAt);
                } else {
                    return b.createdAt.localeCompare(a.createdAt);
                }
            }
            return 0;
        });

        return sortedData;
    };
    const toggleEditTooltip = (clientId) => {
        setOpenEditTooltip((prevState) => ({
            ...prevState,
            [clientId]: !prevState[clientId],
        }));
    };
    const toggleDeleteTooltip = (clientId) => {
        setOpenDeleteTooltip((prevState) => ({
            ...prevState,
            [clientId]: !prevState[clientId],
        }));
    };

    const sortedData = sortData(rows);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);
    const renderActions = (client) => {
        const handleEdit = () => {
            // Handle edit action
        };

        const handleDelete = () => {
            setSelectedItem(client.id);
            setDeleteModalOpen(true);
        };

        return (
            <div>
                <Tooltip placement="top"

                    target={`edit-${client.id}`}
                    isOpen={openEditTooltip[client.id]}
                    toggle={() => toggleEditTooltip(client.id)}
                    style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                    Editar
                </Tooltip>
                <Tooltip placement="top"
                    target={`delete-${client.id}`}
                    isOpen={openDeleteTooltip[client.id]}
                    toggle={() => toggleDeleteTooltip(client.id)}
                    style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                    Excluir
                </Tooltip>
                <FontAwesomeIcon
                    icon={faEdit}
                    id={`edit-${client.id}`}
                    className="mb-2 me-2 btn-transition"
                    size="xl"
                    style={{ cursor: 'pointer', color: 'orange' }}
                    onClick={handleEdit}
                />
                <FontAwesomeIcon
                    icon={faTrashCan}
                    id={`delete-${client.id}`}
                    className="mb-2 me-2 btn-transition"
                    size="xl"
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={handleDelete}
                />
            </div>
        );
    };
    return (
        <>
            {currentItems.length === 0 ? (
                <div className="text-center mt-5">
                    <span className="fs-5">Nenhum registro encontrado... </span>
                    <FontAwesomeIcon icon={faSadTear} size="xl" />
                </div>
            )
                :
                (
                    <>
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
                        <Table hover responsive>
                            <thead>
                                <tr className='text-center'>
                                    {columns.map((column) => (
                                        <th
                                            key={column}
                                            onClick={() => handleSort(column.toLowerCase())}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {column} {sortColumn === column.toLowerCase() && <i className={`ml-1 fas fa-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
                                        </th>
                                    ))}
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className='text-center items-center justify-center'>
                                {currentItems.map((client) => (
                                    <tr key={client.id}>
                                        {Object.values(client).map((value, index) => (
                                            <td key={index}>{value}</td>
                                        ))}
                                        <td>
                                            {renderActions(client)}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <span>Items Por Página:</span>
                                <select
                                    className="mx-2 form-select"
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPage}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                            </div>

                            {currentItems.length >= 10 &&
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                    <Pagination.Item active>{currentPage}</Pagination.Item>
                                    <Pagination.Next
                                        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                        disabled={indexOfLastItem >= rows?.length}
                                    />
                                    <Pagination.Last
                                        onClick={() => setCurrentPage(indexOfLastItem - 1)}
                                        disabled={indexOfLastItem >= rows?.length}
                                    > <div>  {rows?.length / itemsPerPage > 1 ? rows?.length / itemsPerPage : 1
                                    }</div>
                                    </Pagination.Last>

                                </Pagination>

                            }


                        </div>
                    </>
                )
            }

            <DeleteModal
                isOpen={deleteModalOpen}
                toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

export default TableView;
