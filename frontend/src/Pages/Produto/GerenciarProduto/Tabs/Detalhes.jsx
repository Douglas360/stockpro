import { faArrowsUpDownLeftRight, faCircleInfo, faFileEdit, faFileLines, faInfoCircle, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, Col, Form, Input, Label, Row, Table, Alert } from 'reactstrap'

export const Detalhes = ({ data, handleInputChange, handleSubmit, Loading }) => {

  const navigate = useNavigate()
  const [extraFields, setExtraFields] = useState(data?.camposExtras || [])
  const [alert, setAlert] = useState(true)

  const handleAlert = () => {
    setAlert(false)
  }


  const handleCancel = () => {
    navigate('/produto/gerenciar')
  }

  const handleAddField = () => {
    setExtraFields([...extraFields, { descricao: '', conteudo: '' }])
  }

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...extraFields]
    updatedFields[index][field] = value
    setExtraFields(updatedFields)

    //update the data object
    const updatedData = { ...data }
    updatedData.camposExtras = updatedFields
    handleInputChange({ target: { name: 'camposExtras', value: updatedFields } })

  }

  const handleRemoveField = (index) => {
    const list = [...extraFields]
    list.splice(index, 1)
    setExtraFields(list)
  }


  return (
    <Card className='main-card mb-3'>
      <Loading />
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-1'>
            <Col md='5'>
              <Label for='codigo' style={{ fontSize: 20 }}>
                <FontAwesomeIcon icon={faArrowsUpDownLeftRight} style={{ fontSize: 20, marginRight: 3 }} />
                Pesos e Dimensões</Label>
            </Col>

            <Col md='7'>
              <Label for='codigo' style={{ fontSize: 20 }}>
                <FontAwesomeIcon icon={faFileLines} style={{ fontSize: 20, marginRight: 3 }} />
                Campos extras</Label>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='5'>

              <Label for='pesoProduto' style={{ fontWeight: 'bold' }}>Peso (kg)</Label>
              <Input
                type='number'
                name='pesoProduto'
                id='pesoProduto'
                placeholder='0,000'
                value={data.pesoProduto}
                onChange={handleInputChange}
                className='mb-2'
              />
              <Label for='alturaProduto' style={{ fontWeight: 'bold' }}>Altura (cm)</Label>
              <Input
                type='number'
                name='alturaProduto'
                id='alturaProduto'
                placeholder='0,000'
                value={data.alturaProduto}
                onChange={handleInputChange}
                className='mb-2'
              />
              <Label for='larguraProduto' style={{ fontWeight: 'bold' }}>Largura (cm)</Label>
              <Input
                type='number'
                name='larguraProduto'
                id='larguraProduto'
                placeholder='0,000'
                value={data.larguraProduto}
                onChange={handleInputChange}
                className='mb-2'
              />
              <Label for='comprimentoProduto' style={{ fontWeight: 'bold' }}>Comprimento (cm)</Label>
              <Input
                type='number'
                name='comprimentoProduto'
                id='comprimentoProduto'
                placeholder='0,000'
                value={data.comprimentoProduto}
                onChange={handleInputChange}
                className='mb-2'
              />
            </Col>

            <Col md='7'>
              <Alert color='info' isOpen={alert} toggle={handleAlert}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: 20, marginRight: 3 }} />
                Você pode definir alguns campos extras para este produto como uma marca, modelo e etc... Ex: Marca - Adidas.
              </Alert>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Conteúdo</th>
                    <th className='text-center'>Deletar</th>
                  </tr>
                </thead>
                <tbody >
                  {extraFields.map((field, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          type='text'
                          name='descricao'
                          id='descricao'
                          placeholder='Descrição'
                          value={field.descricao}
                          onChange={(e) => handleFieldChange(index, 'descricao', e.target.value)}

                        />
                      </td>
                      <td>
                        <Input
                          type='text'
                          name='conteudo'
                          id='conteudo'
                          placeholder='Conteúdo'
                          value={field.conteudo}
                          onChange={(e) => handleFieldChange(index, 'conteudo', e.target.value)}
                        />
                      </td>
                      <td className='d-flex justify-content-center'>
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
                Adicionar campo extra
              </Button>
              <br />
              <br />
              <Label for='descricaoProduto' style={{ fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faFileEdit} style={{ fontSize: 20, marginRight: 3 }} />
                Descrição do produto</Label>
              <Input
                type='textarea'
                name='descricaoProduto'
                id='descricaoProduto'
                placeholder='Descrição do produto'
                value={data.descricaoProduto}
                onChange={handleInputChange}
                className='mb-3'
              />
              <Label for='detalheProduto' style={{ fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: 20, marginRight: 3 }} />
                Detalhes do produto</Label><br />
              <Input
                type='checkbox'
                name='produtoAtivo'
                id='produtoAtivo'
                value={data.produtoAtivo}
                checked={data?.produtoAtivo}
                onChange={handleInputChange}
                className='mb-2'
              /> Produto Ativo

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
