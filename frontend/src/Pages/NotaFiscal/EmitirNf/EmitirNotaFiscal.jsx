import React, { useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { Button, Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomSpinner } from '../../../components/CustomSpinner'
import { useInvoice } from '../../../context/InvoiceContext/useInvoice'


export const EmitirNotaFiscal = () => {
    const { createInvoice, loading } = useInvoice()
    const [data, setData] = useState([])

    const navigate = useNavigate()

    //get OrderId in the URL params and set in the state to use in the request to the API 
    const { id } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
            orderId: id,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createInvoice(data)
        navigate(`/nota-fiscal/gerenciar`)
    };

    return (
        <div>
            <PageTitle
                heading="Emitir Nota Fiscal"
                subheading="Relizar uma nova emissão de nota fiscal."
                icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
            />
            {loading && <CustomSpinner/>}
            <Card className='main-card mb-3'>
                <CardBody>
                    <h5 className='card-title'>Emitir Nota Fiscal</h5>
                    <p>Preview da venda...</p>
                    <p>NOME DO CLIENTE | PRODUTOS | VALOR TOTAL</p>
                </CardBody>
            </Card>
            <Card className='main-card mb-3'>
                <CardBody>
                    <Row className='mb-3'>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Natureza da operação</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.natureza_operacao}
                                onChange={handleInputChange}
                                name="natureza_operacao"
                                id="natureza_operacao"
                            >
                                <option value={0}>Natureza da operação</option>
                                <option value={'Venda'}>1-Venda</option>
                                <option value={'Devolução'}>2-Devolução</option>
                            </Input>
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Tipo da operação</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.tipo_documento}
                                onChange={handleInputChange}
                                name="tipo_documento"
                                id="tipo_documento"
                            >
                                <option value="0">Tipo da operação</option>
                                <option value={0}>0-Entrada</option>
                                <option value={1}>1-Saída</option>
                            </Input>
                        </Col>

                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Finalidade da Emissão</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.finalidade_emissao}
                                onChange={handleInputChange}
                                name="finalidade_emissao"
                                id="finalidade_emissao"
                            >
                                <option value={0}>Finalidade da emissão</option>
                                <option value={1}>1-Normal</option>
                                <option value={2}>2-Complementar</option>
                                <option value={3}>3-Ajuste</option>
                                <option value={4}>4-Devolução</option>
                            </Input>
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Destino da operação</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.local_destino}
                                onChange={handleInputChange}
                                name="local_destino"
                                id="local_destino"
                            >
                                <option value={0}>Finalidade da Emissão</option>
                                <option value={1}>1-Operação interna</option>
                                <option value={2}>2-Operação interestadual</option>
                                <option value={3}>3-Operação com exterior</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Button color='primary' type='submit' onClick={handleSubmit}>
                                Emitir Nota Fiscal
                            </Button>
                        </Col>
                    </Row>

                </CardBody>
            </Card>




        </div>
    )
}
