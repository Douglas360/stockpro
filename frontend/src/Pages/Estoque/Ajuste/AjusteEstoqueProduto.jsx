import { faArrowCircleLeft, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap';
import { useInventory } from '../../../context/InventoryContext/useInventory';
import { CustomSpinner } from '../../../components/CustomSpinner';
import { dateFormatWithHours } from '../../../functions/getFomatter';

const periodOptions = ['Selecione periodo da movimentação', 'Hoje', 'Esta Semana', 'Este Mês'];
const typeOptions = ['Selecione o tipo de movimentação', 'Entrada', 'Saida', 'Ajuste'];

export const AjusteEstoqueProduto = () => {
    const { listInventoryById, loading } = useInventory();
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const [inventory, setInventory] = useState([]);
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

    const loadInventory = async () => {
        const response = await listInventoryById(productId);
        setInventory(response);
    };

    useEffect(() => {
        loadInventory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to check if a movement type is selected
    const isMovementSelected = (movement) => {
        return selectedMovement === null || selectedMovement === "Selecione o tipo de movimentação" || selectedMovement === movement;
    };

    // Function to check if a date is within the selected period
    const isDateWithinPeriod = (date) => {
        if (selectedPeriod === 'Hoje') {
            const today = new Date().toLocaleDateString('en-US');
            return new Date(date).toLocaleDateString('en-US') === today;
        } else if (selectedPeriod === 'Esta Semana') {
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date();
            endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
            return new Date(date) >= startOfWeek && new Date(date) <= endOfWeek;
        } else if (selectedPeriod === 'Este Mês') {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);
            endOfMonth.setDate(endOfMonth.getDate() - 1);
            return new Date(date) >= startOfMonth && new Date(date) <= endOfMonth;
        } else {
            return true; // Display all records if no period is selected
        }
    };

    // Filter inventory data based on selected period
    const filteredInventory = inventory?.filter((item) => isDateWithinPeriod(item.data_movimentacao));

    return (
        <Card className='main-card'>
            {loading && <CustomSpinner />}
            <CardHeader className='d-flex justify-content-between align-items-center'>
                <Label>
                    <h3>
                        <FontAwesomeIcon icon={faRightLeft} className='me-3' />
                        {inventory.length > 0 && inventory[0].nome_produto}

                    </h3>
                </Label>
                <div
                    className='d-flex align-items-center'
                    style={{ cursor: 'pointer' }}
                    onMouseOver={(e) => (e.currentTarget.firstChild.style.transform = 'scale(1.2)')}
                    onMouseOut={(e) => (e.currentTarget.firstChild.style.transform = 'scale(1.0)')}
                    onClick={() => navigate('/estoque/movimentacao')}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} size='xl' className='me-3' />
                </div>
            </CardHeader>
            <CardBody>
                <Row className='d-flex justify-content-between mb-3'>
                    <Col md={6}>
                        <Input type='select' className='mb-2' onChange={(e) => setSelectedPeriod(e.target.value)}>
                            {periodOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Input>
                    </Col>
                    <Col md={6}>
                        <Input type='select' className='mb-2' onChange={(e) => setSelectedMovement(e.target.value)}>

                            {typeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Input>
                    </Col>
                </Row>

                <Card className='main-card mb-3'>
                    <CardHeader className='bg-light'>
                        <h5>Detalhes da movimentação</h5>
                    </CardHeader>
                    <CardBody>
                        {filteredInventory.length === 0 ? (
                            <p className="text-center">Não há movimentações no período informado.</p>

                        ) : (
                            <Table bordered striped hover responsive>
                                <thead className='text-center'>
                                    <tr>
                                        <th>Data/Hora</th>
                                        <th>Tipo</th>
                                        <th>Qnt. movim.</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventory.map((item) => (
                                        isMovementSelected(item.tipo_movimentacao) && (
                                            <tr
                                                key={item.id_movimentacao}
                                                className={`text-center ${item.tipo_movimentacao === 'Entrada' ? 'text-success' : 'text-danger'}`}
                                            >
                                                <td>{dateFormatWithHours(item.data_movimentacao)}</td>
                                                <td>{item.tipo_movimentacao}</td>
                                                <td>{item.quantidade}</td>
                                                <td>{item.descricao}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    );
};
