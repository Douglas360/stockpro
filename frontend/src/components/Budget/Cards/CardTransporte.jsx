import React, { useEffect, useState } from "react";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Col, Input, Label, Row, Table } from "reactstrap";
import { useRegister } from "../../../context/RegisterContext/useRegister";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { NumericFormat } from "react-number-format";

const CardTransporte = ({ data, handleInputChange }) => {
  const { user } = useAuth();

  const { listAllCarriers } = useRegister();
  const [carriers, setCarriers] = useState([]);

  const loadCarriers = async () => {
    if (user && user.id_empresa) {
      const response = await listAllCarriers(user.id_empresa);
      setCarriers(response);
    }
  };

  useEffect(() => {
    loadCarriers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md="12">
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon
                icon={faTruckFast}
                style={{ fontSize: 20, marginRight: 3 }}
              />
              Transporte
            </Label>
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
                <NumericFormat
                  className="form-control"
                  name="valorFrete"
                  id="valorFrete"
                  required={false}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  placeholder="Valor do frete"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  value={data.valorFrete}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <Input
                  type="select"
                  name="id_transportadora"
                  id="id_transportadora"
                  onChange={handleInputChange}
                  value={data.id_transportadora}
                >
                  <option value="">Selecione uma transportadora</option>
                  {carriers?.map((carrier) => (
                    <option
                      key={carrier.id_transportadora}
                      value={carrier.id_transportadora}
                    >
                      {carrier.nome}
                    </option>
                  ))}
                </Input>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default CardTransporte;
