import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Form, Label, Row, UncontrolledAlert, Input, Button } from 'reactstrap'
import { useRegister } from '../../../../context/RegisterContext/useRegister'

export const Fornecedores = ({ data, handleSubmit, handleInputChange, Loading }) => {
  const { listAllSuppliers } = useRegister()
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    const loadSuppliers = async () => {
      const response = await listAllSuppliers(1)
      setSuppliers(response)
    }
    loadSuppliers()
  }, [])


  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/produto/gerenciar')
  }
  const handleAddSupplier = () => {
    navigate('/cadastro/fornecedor/cadastrar')
  }

  return (
    <Card className='main-card mb-3'>
      <CardBody>
        <Loading />
        <UncontrolledAlert color='primary'>
          <p>
            Sugerimos que vincule um ou mais fornecedores a este produto, pois durante o cadastro de compras e cotações é exigido que você vincule o fornecedor ao cadastro. Caso exista produtos vinculados a este fornecedor, o sistema irá importar automaticamente estes produtos facilitando o processo.
          </p>
        </UncontrolledAlert>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col md={3}>
              <Label for='fornecedor'>Fornecedor</Label>
              <Input
                type='select'
                name='fornecedor'
                id='fornecedor'
                value={data.fornecedor}
                onChange={handleInputChange}
              >
                <option value=''>Selecione</option>
                {suppliers?.map(fornecedor => (
                  <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>{fornecedor.nome}</option>
                ))}
              </Input>
            </Col>
            <Col md={3} className='mt-1' >
              <br />
              <Button color='info' onClick={handleAddSupplier}>
                <FontAwesomeIcon icon={faPlus} size='xl' style={{ marginRight: 3 }} />
                Adicionar novo fornecedor</Button>
            </Col>
          </Row>
          {/* Buttons Add and Cancel*/}
          <Row className='mb-2'>
            <Col md={12}>
              <Button color='primary' type='submit' >
                <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                Salvar
              </Button>
              <Button color='danger' onClick={handleCancel} style={{ marginLeft: 3 }}>
                <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
                Cancelar
              </Button>

            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>

  )
}
