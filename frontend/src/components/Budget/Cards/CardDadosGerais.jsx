import React from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Col, FormText, Input, Label, Row } from 'reactstrap'

const CardDadosGerais = ({ data, handleInputChange }) => {
  return (
    <Card className="main-card mb-1">
      <CardBody>

        <Row>
          <Col md='12'>
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 20, marginRight: 3 }} />
              Dados gerais</Label>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col md='2'>
            <Label>Número</Label>
            <Input type='text' name='numeroOrcamento' id='numeroOrcamento' value={data.numeroOrcamento} onChange={handleInputChange} />
          </Col>
          <Col md='6'>
            <Label>Cliente</Label>
            <Input type='text' name='clienteOrcamento' id='clienteOrcamento' value={data.ClienteOrcamento} onChange={handleInputChange} />
          </Col>
          <Col md='4'>
            <Label>Data</Label>
            <Input type='date' name='dataOrcamento' id='dataOrcamento' value={data.dataOrcamento} onChange={handleInputChange} defaultValue={new Date().toISOString().substr(0, 10)} />
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col md='4'>
            <Label>Aos cuidados de</Label>
            <Input type='text' name='aosCuidadosDeOrcamento' id='aosCuidadosDeOrcamento' value={data.aosCuidadosDeOrcamento} onChange={handleInputChange} />
          </Col>
          <Col md='4'>
            <Label>Validade</Label>
            <Input type='text' name='validadeOrcamento' id='validadeOrcamento' placeholder='Ex: 10 dias' value={data.validadeOrcamento} onChange={handleInputChange} />
          </Col>
          <Col md='4'>
            <Label>Canal de venda</Label>
            <Input type='select'
              name='canalVendaOrcamento'
              id='canalVendaOrcamento'
              value={data.canalVendaOrcamento}
              onChange={handleInputChange}
            >
              <option value=''>Selecione</option>
              <option value='1'>Site</option>
              <option value='2'>Telefone</option>
              <option value='3'>WhatsApp</option>
              <option value='4'>E-mail</option>
              <option value='5'>Loja física</option>
              <option value='6'>Outros</option>
            </Input>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col md='12'>
            <Label>Introdução</Label>
            <Input type='textarea' name='introducaoOrcamento' id='introducaoOrcamento' value={data.introducaoOrcamento} onChange={handleInputChange} />
            <FormText color='muted' style={{ fontStyle: 'italic' }}>
              Este texto irá aparecer no início da proposta enviada para o cliente, caso não queira inserir uma introdução basta deixar este espaço em branco.
            </FormText>
          </Col>
        </Row>





      </CardBody>


    </Card>
  )
}

export default CardDadosGerais