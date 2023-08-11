import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

import CardTotal from './Cards/CardTotal';
import CardProduto from './Cards/CardProduto';
import { CustomSpinner } from '../CustomSpinner';
import CardPagamento from './Cards/CardPagamento';
import CardTransporte from './Cards/CardTransporte';
import CardObservacao from './Cards/CardObservacao';
import CardDadosGerais from './Cards/CardDadosGerais';
import CardEnderecoEntrega from './Cards/CardEnderecoEntrega';

const FormBudget = ({
  url,
  handleFormSubmit,
  loading,
  initialValues,
  setInitialValues,
  typeForm,
  isEditMode,
  gerarVenda,
}) => {
  const navigate = useNavigate();
  const idOrder =
    sessionStorage?.getItem('user') || localStorage?.getItem('user');

  const id = JSON.parse(idOrder).id_empresa;
  const id_user = JSON.parse(idOrder).id;

  const handleInputChange = e => {
    const { name, value } = e.target;
    
    setInitialValues(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async e => {
    e.preventDefault();
    initialValues.id_empresa = id;
    initialValues.id_user = id_user;

    await handleFormSubmit(initialValues);
    navigate(url);
  };

  const handleCancel = () => {
    navigate(url);
  };

  if(!initialValues) {
    return <CustomSpinner />
  }

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <CustomSpinner />}

      <CardDadosGerais
        data={initialValues}
        handleInputChange={handleInputChange}
        typeForm={typeForm}
      />

      <CardProduto
        data={initialValues}
        isEditMode={isEditMode}
        gerarVenda={gerarVenda}
        handleInputChange={handleInputChange}
      />
      {/*<CardProdutoTeste initialValues={initialValues} handleInputChange={handleInputChange} />*/}

      <CardTransporte data={initialValues} handleInputChange={handleInputChange} />

      <CardTotal data={initialValues} handleInputChange={handleInputChange} />

      <CardEnderecoEntrega data={initialValues} handleInputChange={handleInputChange} />

      <CardPagamento data={initialValues} handleInputChange={handleInputChange} />

      <CardObservacao data={initialValues} handleInputChange={handleInputChange} />

      <Row className="mb-2">
        <Col md={12}>
          <Button color="primary" type="submit">
            <FontAwesomeIcon
              icon={faSave}
              size="xl"
              style={{ marginRight: 3 }}
            />
            Salvar
          </Button>
          <Button
            color="danger"
            onClick={handleCancel}
            style={{ marginLeft: 3 }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="xl"
              style={{ marginRight: 3 }}
            />
            Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormBudget;
