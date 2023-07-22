import React, { useState, useEffect } from 'react';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, Col, Input, Label, Row, Table } from 'reactstrap';
import { getFormatterInputPrice } from '../../../functions/getFormatterInputPrice';

const CardTotal = ({ data, handleInputChange }) => {
    const [valorTotalComDesconto, setValorTotalComDesconto] = useState(data.valorTotal);
    const valorProdutos = data.produtos?.map((item) => item.subtotal);
    const valorProdutosTotal = valorProdutos?.reduce((acc, item) => acc + item, 0);
    const valorFrete = data.valorFrete?.replace(',', '.');
    //const valorFrete = data.valorFrete ? data.valorFrete : 0;

    const valorTotal = valorFrete
        ? parseFloat(valorFrete, 10) + parseFloat(valorProdutosTotal, 10)
        : valorProdutosTotal;

    data.valorProdutos = valorProdutosTotal;
    data.valorTotal = valorTotalComDesconto;

    useEffect(() => {
        const descontoValor = parseFloat(data.descontoValor || 0);
        const valorComDesconto = valorTotal - descontoValor;
        setValorTotalComDesconto(valorComDesconto);

    }, [data.descontoValor, valorTotal]);

    useEffect(() => {
        const descontoPorcentagem = parseFloat(data.descontoPorcentagem || 0);
        const descontoValor = (valorTotal * descontoPorcentagem) / 100;
        const valorComDesconto = valorTotal - descontoValor;

        setValorTotalComDesconto(valorComDesconto);
    }, [data.descontoPorcentagem, valorTotal]);

    return (
        <Card className="main-card mb-1">
            <CardBody>
                <Row>
                    <Col md="12">
                        <Label style={{ fontSize: 20 }}>
                            <FontAwesomeIcon icon={faSackDollar} style={{ fontSize: 20, marginRight: 3 }} />
                            Total
                        </Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Input
                            type="checkbox"
                            name="exibeValor"
                            id="exibeValor"
                            onChange={handleInputChange}
                            value={data.exibeValor}
                            style={{ marginRight: 5 }}
                        />
                        <Label for="exibeValor">Exibe valor total na impressão</Label>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Produtos</th>
                            <th>Frete</th>
                            <th>Desconto (R$)</th>
                            <th>Desconto (%)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                                <Input
                                    type="text"
                                    name="valorProdutos"
                                    id="valorProdutos"
                                    placeholder="Valor dos produtos"
                                    readOnly
                                    defaultValue={getFormatterInputPrice(valorProdutosTotal)
                                    }
                                />
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="valorFrete"
                                    id="valorFrete"
                                    placeholder="Valor do frete"
                                    readOnly
                                    defaultValue={getFormatterInputPrice(valorFrete)}
                                />
                            </td>
                            <td>
                                <Input
                                    type="number"
                                    name="descontoValor"
                                    id="descontoValor"
                                    placeholder="Desconto (R$)"
                                    value={data.descontoValor}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="descontoPorcentagem"
                                    id="descontoPorcentagem"
                                    placeholder="Desconto (%)"
                                    onChange={handleInputChange}
                                    value={data.descontoPorcentagem}
                                />
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="valorTotal"
                                    id="valorTotal"
                                    placeholder="Valor total"
                                    readOnly
                                    value={getFormatterInputPrice(valorTotal)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default CardTotal;
