import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GerallJSX = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('teste')
    }
    return (
        <>
            <PageTitle
                heading="Geral"
                subheading="Configurações gerais do sistema."
                icon="lnr lnr-cog icon-gradient bg-amy-crisp"

            />
            <Card className="main-card mb-3">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Col md='12'>
                                <Label for='codigo' style={{ fontSize: 20 }}>
                                    <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20, marginRight: 3 }} />
                                    Dados gerais
                                </Label>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col md='6'>
                                <Label>Definir periodo de validade:</Label>
                                <Input type='select'
                                    name='validade'
                                    id='validade'
                                >
                                    <option value='1'>1 Mês</option>
                                    <option value='2'>2 Meses</option>
                                    <option value='3'>3 Meses</option>
                                    <option value='4'>4 Meses</option>
                                    <option value='5'>5 Meses</option>
                                    <option value='6'>6 Meses</option>
                                    <option value='7'>7 Meses</option>
                                    <option value='8'>8 Meses</option>
                                    <option value='9'>9 Meses</option>
                                    <option value='10'>10 Meses</option>
                                    <option value='11'>11 Meses</option>
                                    <option value='12'>12 Meses</option>
                                </Input>
                            </Col>
                            <Col md='6'>

                                <Label>Produto sem estoque</Label>
                                <Input type='select'
                                    name='estoque'
                                    id='estoque'
                                >
                                    <option value='1'>Permitir vender</option>
                                    <option value='2'>Não permitir</option>
                                </Input>

                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}
