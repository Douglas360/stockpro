import React, { useEffect, useState } from "react";

import { NumericFormat } from "react-number-format";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Col, Input, Label, Row, Table } from "reactstrap";

import { sumKeyOfObject } from "../../../functions/sumOfKeyObject";
import { cleanCurrencyMask } from "../../../functions/cleanCurrencyMask";
import { getFormatterInputPrice } from "../../../functions/getFormatterInputPrice";

const CardTotal = ({ data, handleInputChange }) => {
  const [valorTotal, setValorTotal] = useState();
  const [valorProdutos, setValorProdutos] = useState();

  useEffect(() => {
    if (data && data.produtos) {
      const keyFormated = data.produtos.map((item) => {
        return {
          ...item,
          subtotal: item.valor_total ? item.valor_total : item.subtotal,
        };
      });

      const somaTotal = sumKeyOfObject(keyFormated, "subtotal");

      const valorTotal = data.valorFrete
        ? cleanCurrencyMask(data.valorFrete) + +somaTotal
        : somaTotal;

      const valorComDesconto = data.descontoValor
        ? valorTotal - cleanCurrencyMask(data.descontoValor)
        : valorTotal;

      setValorTotal(valorComDesconto);
      setValorProdutos(valorTotal - cleanCurrencyMask(data.valorFrete));
    }
  }, [data]);

  useEffect(() => {
    handleInputChange({ target: { name: "valorTotal", value: valorTotal } });
    handleInputChange({
      target: { name: "valorProdutos", value: valorProdutos },
    });
  }, [valorTotal]);

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md="12">
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon
                icon={faSackDollar}
                style={{ fontSize: 20, marginRight: 3 }}
              />
              Total
            </Label>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Produtos</th>
              <th>Frete</th>
              <th>Desconto (R$)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <NumericFormat
                  className="form-control"
                  name="valorProdutos"
                  id="valorProdutos"
                  required={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  readOnly
                  placeholder="Valor dos produtos"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  value={data.valorProdutos}
                />
              </td>
              <td>
                <NumericFormat
                  className="form-control"
                  name="valorFrete"
                  id="valorFrete"
                  required={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  readOnly
                  placeholder="Valor do frete"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  value={data.valorFrete}
                />
              </td>

              <td>
                <NumericFormat
                  className="form-control"
                  name="descontoValor"
                  id="descontoValor"
                  required={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  placeholder="Desconto (R$)"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  value={data.descontoValor}
                  onChange={handleInputChange}
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
