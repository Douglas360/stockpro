import React, { useEffect, useState } from 'react'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Col, Input, Label, Row, Table } from 'reactstrap'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useAuth } from '../../../context/AuthContext/useAuth'

const CardTransporte = ({ data, handleInputChange }) => {
    const { listAllCarriers } = useRegister();
    const {user} = useAuth();
    const [carriers, setCarriers] = useState([]);

    const idCompany = user?.id_empresa;
  
    const loadCarriers = async () => {
        const response = await listAllCarriers(idCompany);
        setCarriers(response);
    }

    useEffect(() => {
       if(idCompany){
        loadCarriers();
         }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                    type='select'
                                    name='id_transportadora'
                                    id='id_transportadora'
                                    onChange={handleInputChange}
                                    value={data.id_transportadora}
                                >
                                    <option value=''>Selecione uma transportadora</option>
                                    {carriers?.map(carrier => (
                                        <option key={carrier.id_transportadora} value={carrier.id_transportadora}>{carrier.nome}</option>
                                    ))}
                                </Input>


                            </td>
                        </tr>
                    </tbody>
                </Table>

            </CardBody>

        </Card>
    )
}

export default CardTransporte