import React, { useState } from 'react'
import { faBox, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, Col, Input, InputGroup, Label, Row, Table } from 'reactstrap'

const CardProduto = ({ data, handleInputChange }) => {
  const [produtos, setProdutos] = useState([
    { produto: '', quantidade: '', tipo: '', valor: '', desconto: '', subtotal: '' }
  ])

  const tipoVenda = [
    { id: 1, tipo: 'Venda' },
    { id: 2, tipo: 'Troca' },
    { id: 3, tipo: 'Devolução' },
    { id: 4, tipo: 'Bonificação' },
    { id: 5, tipo: 'Amostra' },
    { id: 6, tipo: 'Outros' }
  ]

  const handleAddField = () => {
    setProdutos([...produtos, { produto: '', quantidade: '', tipo: '', valor: '', desconto: '', subtotal: '' }])
  }

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...produtos]
    updatedFields[index][field] = value
    setProdutos(updatedFields)

    //update the data object
    const updatedData = { ...data }
    updatedData.produtos = updatedFields
    handleInputChange({ target: { name: 'produtos', value: updatedFields } })

  }

  const handleRemoveField = (index) => {
    const list = [...produtos]
    list.splice(index, 1)
    setProdutos(list)
  }
  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md='12'>
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon icon={faBox} style={{ fontSize: 20, marginRight: 3 }} />
              Produtos</Label>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Produto <span className='text-danger'>*</span></th>
              <th>Quant. <span className='text-danger'>*</span></th>
              <th>Tipo <span className='text-danger'>*</span></th>
              <th>Valor <span className='text-danger'>*</span></th>
              <th>Desconto</th>
              <th>Subtotal</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {produtos?.map((produto, index) => (
              <tr key={index}>
                <td>
                  <Input
                    required
                    type='text'
                    name='produto'
                    value={produto.produto}
                    onChange={(e) => handleFieldChange(index, 'produto', e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    required
                    type='text'
                    name='quantidade'
                    value={produto.quantidade}
                    onChange={(e) => handleFieldChange(index, 'quantidade', e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    required
                    type='select'
                    name='tipo'
                    value={produto.tipo}
                    onChange={(e) => handleFieldChange(index, 'tipo', e.target.value)}
                  >
                    <option value=''>Selecione</option>
                    {tipoVenda?.map((tipo, index) => (
                      <option key={index} value={tipo.tipo}>{tipo.tipo}</option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    required
                    type='text'
                    name='valor'
                    value={produto.valor}
                    onChange={(e) => handleFieldChange(index, 'valor', e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup>
                    <Input
                      type='text'
                      name='desconto'
                      value={produto.desconto}
                      onChange={(e) => handleFieldChange(index, 'desconto', e.target.value)}
                      style={{ width: '58%'} }
                    />
                    <Input type="select" name="select" id="exampleSelect"
                    
                    >                    
                      <option>R$</option>
                      <option>%</option>
                    </Input>
                  </InputGroup>

                </td>
                <td>
                  <Input
                    type='text'
                    name='subtotal'
                    value={produto.subtotal}
                    onChange={(e) => handleFieldChange(index, 'subtotal', e.target.value)}
                  />
                </td>
                <td>
                  <Button color='danger' onClick={() => handleRemoveField(index)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color='primary' onClick={handleAddField}>
          <FontAwesomeIcon icon={faPlus} size='xl' style={{ marginRight: 3 }} />
          Adicionar produto
        </Button>
        <br />
        <br />


      </CardBody>

    </Card>
  )
}

export default CardProduto