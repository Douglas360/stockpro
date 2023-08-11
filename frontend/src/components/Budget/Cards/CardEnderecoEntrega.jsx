import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const CardEnderecoEntrega = ({ data, handleInputChange }) => {


  // const handleAddressCheck = () => {
  //   setChecked(!checked);
  //   if (!checked) {
  //     data.cep = null;
  //     data.logradouro = null;
  //     data.numero = null;
  //     data.complemento = null;
  //     data.bairro = null;
  //     data.cidade = null;
  //     data.estado = null;
  //   }
  // };

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md="12">
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon
                icon={faMapLocationDot}
                style={{ fontSize: 20, marginRight: 3 }}
              />
              Endereço de entrega
            </Label>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <Input
              type="checkbox"
              name="exibeEnderecoEntrega"
              id="exibeEnderecoEntrega"
              onChange={handleAddressCheck}
              value={checked}
              style={{ marginRight: 5 }}
            />
            <Label for="enderecoEntrega">Informar endereço de entrega </Label>
          </Col>
        </Row> */}

        {/* {checked && ( */}
          <>
            <Row>
              <Col md="2">
                <Label>CEP</Label>
                <Input
                  type="text"
                  name="cep"
                  id="cep"
                  placeholder="CEP"
                  onChange={handleInputChange}
                  value={data.cep}
                />
              </Col>
              <Col md="4">
                <Label>Logradouro</Label>
                <Input
                  type="text"
                  name="logradouro"
                  id="logradouro"
                  placeholder="Logradouro"
                  onChange={handleInputChange}
                  value={data.logradouro}
                />
              </Col>
              <Col md="2">
                <Label>Número</Label>
                <Input
                  type="text"
                  name="numero"
                  id="numero"
                  placeholder="Número"
                  onChange={handleInputChange}
                  value={data.numero}
                />
              </Col>
              <Col md="4">
                <Label>Complemento</Label>
                <Input
                  type="text"
                  name="complemento"
                  id="complemento"
                  placeholder="Complemento"
                  onChange={handleInputChange}
                  value={data.complemento}
                />
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <Label>Bairro</Label>
                <Input
                  type="text"
                  name="bairro"
                  id="bairro"
                  placeholder="Bairro"
                  onChange={handleInputChange}
                  value={data.bairro}
                />
              </Col>
              <Col md="4">
                <Label>Cidade</Label>
                <Input
                  type="text"
                  name="cidade"
                  id="cidade"
                  placeholder="Cidade"
                  onChange={handleInputChange}
                  value={data.cidade}
                />
              </Col>
              <Col md="4">
                <Label>Estado</Label>
                <Input
                  type="text"
                  name="estado"
                  id="estado"
                  placeholder="Estado"
                  onChange={handleInputChange}
                  value={data.estado}
                />
              </Col>
            </Row>
          </>
        {/* )} */}
      </CardBody>
    </Card>
  );
};

export default CardEnderecoEntrega;
