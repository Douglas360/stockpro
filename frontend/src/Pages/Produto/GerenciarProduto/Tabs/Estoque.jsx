import { faQuestionCircle, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, Col, Form, Input, Label, Row, UncontrolledTooltip } from 'reactstrap'

export const Estoque = ({ data, handleSubmit, handleInputChange, Loading }) => {
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/produto/gerenciar')
  }

  return (
    <Card className='main-card mb-3'>
      <CardBody>
      <Loading />
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col md={4}>
              <Label for='estoqueMinimo' style={{ fontWeight: 'bold' }}> Estoque Mínimo</Label>
              <FontAwesomeIcon icon={faQuestionCircle} size='sm' id='infEstoqueMinimo' name='infEstoqueMinimo' style={{ marginLeft: 3, cursor: 'pointer' }} />
              <UncontrolledTooltip placement='top' target='infEstoqueMinimo' style={{ fontSize: 12 }}>
                Quantidade mínima de produtos que devem estar em estoque
              </UncontrolledTooltip>
              <Input type='text' name='estoqueMinimo' id='estoqueMinimo' value={data.estoqueMinimo} onChange={handleInputChange} placeholder='0,0000' />
            </Col>
            <Col md={4}>
              <Label for='estoqueMaximo' style={{ fontWeight: 'bold' }}> Estoque Máximo</Label>
              <FontAwesomeIcon icon={faQuestionCircle} size='sm' id='infEstoqueMaximo' name='infEstoqueMaximo' style={{ marginLeft: 3, cursor: 'pointer' }} />
              <UncontrolledTooltip placement='top' target='infEstoqueMaximo' style={{ fontSize: 12 }}>
                Quantidade máxima de produtos que devem estar em estoque
              </UncontrolledTooltip>
              <Input type='text' name='estoqueMaximo' id='estoqueMaximo' value={data.estoqueMaximo} onChange={handleInputChange} placeholder='0,0000' />
            </Col>
            <Col md={4}>
              <Label for='estoqueAtual' style={{ fontWeight: 'bold' }}> Estoque Atual</Label>
              <FontAwesomeIcon icon={faQuestionCircle} size='sm' id='infEstoqueAtual' name='infEstoqueAtual' style={{ marginLeft: 3, cursor: 'pointer' }} />
              <UncontrolledTooltip placement='top' target='infEstoqueAtual' style={{ fontSize: 12 }}>
                Quantidade atual de produtos em estoque
              </UncontrolledTooltip>
              <Input type='text' name='estoqueAtual' id='estoqueAtual' value={data.estoqueAtual} onChange={handleInputChange} placeholder='0,0000' />
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
