import React from 'react'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Col, Input, Label, Row, Table } from 'reactstrap'

const CardTransporte = ({ data, handleInputChange }) => {
    return (
        <Card className="main-card mb-1">
            <CardBody>

                <Row>
                    <Col md='12'>
                        <Label style={{ fontSize: 20 }}>
                            <FontAwesomeIcon icon={faTruckFast} style={{ fontSize: 20, marginRight: 3 }} />
                            Transporte</Label>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Valor do frete</th>
                            <th>Transportadora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Input
                                    type='text'
                                    name='valorFrete'
                                    id='valorFrete'
                                    placeholder='Valor do frete'
                                    onChange={handleInputChange}
                                    value={data.valorFrete}
                                />
                            </td>
                            <td>
                                <Input
                                    type='text'
                                    name='transportadora'
                                    id='transportadora'
                                    placeholder='Transportadora'
                                    onChange={handleInputChange}
                                    value={data.transportadora}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </CardBody>

        </Card>
    )
}

export default CardTransporte