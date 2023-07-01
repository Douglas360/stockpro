import React from 'react'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, Col, FormText, Input, Label, Row } from 'reactstrap'

const CardObservacao = ({ data, handleInputChange }) => {
  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md='12'>
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 20, marginRight: 3 }} />
              Observações</Label>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Label style={{ fontSize: 16 }}>Observações</Label><br />
            <FormText color='muted' style={{ fontStyle: 'italic' }}>
              Observações que serão impressas no orçamento
            </FormText>

            <Input type='textarea' name='observacaoOrcamento' id='observacaoOrcamento' rows='5' value={data.observacaoOrcamento} onChange={handleInputChange} />
          </Col>
          <Col md='6'>
            <Label style={{ fontSize: 16 }}>Observações internas</Label><br />
            <FormText color='muted' style={{ fontStyle: 'italic' }}>
              Esta observação é de uso interno, portanto não será impressa no pedido.
            </FormText>
            <Input type='textarea' name='observacaoInternaOrcamento' id='observacaoInternaOrcamento' rows='5' value={data.observacaoInternaOrcamento} onChange={handleInputChange} />

          </Col>
        </Row>
      </CardBody>

    </Card>
  )
}

export default CardObservacao