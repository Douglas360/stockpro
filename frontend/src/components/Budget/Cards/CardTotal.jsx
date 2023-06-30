import React from 'react'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Col, Input, Label, Row, Table } from 'reactstrap'

const CardTotal = ({data, handleInputChange}) => {
  return (
    <Card className="main-card mb-1">
    <CardBody>

        <Row>
            <Col md='12'>
                <Label style={{ fontSize: 20 }}>
                    <FontAwesomeIcon icon={faSackDollar} style={{ fontSize: 20, marginRight: 3 }} />
                    Total</Label>
            </Col>
        </Row>
        <Row>
            <Col md='12'>
              <Input
                type='checkbox'
                name='exibeValor'
                id='exibeValor'               
                onChange={handleInputChange}
                value={data.exibeValor}
                style={{marginRight: 5}}
              />
              
              <Label for='exibeValor'>Exibe valor total na impressão</Label>
            </Col>
        </Row>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Produtos</th>
                    <th>Frete</th>
                    <th>Desconto (R$)</th>
                    <th>Desconto (%$)</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Input
                            type='text'
                            name='valorProdutos'
                            id='valorProdutos'
                            placeholder='Valor dos produtos'
                         readOnly
                         defaultValue={data.valorProdutos}
                        />
                    </td>
                    <td>

                        <Input
                            type='text'
                            name='valorFrete'
                            id='valorFrete'
                            placeholder='Valor do frete'
                            readOnly
                            defaultValue={data.valorFrete}

                        />

                    </td>
                    <td>
                        <Input
                            type='text'
                            name='descontoValor'
                            id='descontoValor'
                            placeholder='Desconto (R$)'
                            onChange={handleInputChange}
                            value={data.descontoValor}
                        />
                    </td>
                    <td>

                        <Input
                            type='text'
                            name='descontoPorcentagem'
                            id='descontoPorcentagem'
                            placeholder='Desconto (%)'
                            onChange={handleInputChange}
                            value={data.descontoPorcentagem}
                        />

                    </td>
                    <td>
                        <Input
                            type='text'
                            name='valorTotal'
                            id='valorTotal'
                            placeholder='Valor total' 
                            readOnly
                            defaultValue={data.valorTotal}
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
        




    </CardBody>

</Card>
  )
}

export default CardTotal