import React, { useState } from 'react'
import { faExclamationCircle, faRandom, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, CardBody, Col, Form, Input, InputGroup, Label, Row, Spinner, Tooltip } from 'reactstrap'
import { useProduct } from '../../../../context/ProductContext/useProduct'

export const Dados = ({ data, handleInputChange, handleSubmit, Loading }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)
  const [codigoInterno, setCodigoInterno] = useState('')
  const [nameError, setNameError] = useState(false)
  const [codigoError, setCodigoError] = useState(false)
  const navigate = useNavigate()

  const toggle = (id) => {
    setTooltipOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const alertToggle = () => {
    setAlertOpen(!alertOpen)
  }

  const handleNameBlur = (e) => {
    const { value } = e.target
    if (value.length < 1) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }

  const handleCodigoBlur = (e) => {
    const { value } = e.target
    if (value.length < 1) {
      setCodigoError(true)
    } else {
      setCodigoError(false)
    }
  }

  const generateCode = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2)
    const randomCode = currentYear + Math.floor(Math.random() * 1e11).toString().padStart(11, '0')

    setCodigoInterno(randomCode.toString())

    //update the data object
    const updatedData = { ...data }
    updatedData.codigoInterno = randomCode.toString()
    handleInputChange({ target: { name: 'codigoInterno', value: randomCode.toString() } })

  }

  const handleCancel = () => {
    setCodigoInterno('')
    navigate('/produto/gerenciar')
  }

  return (
    <Card className='main-card mb-3'>
      <Loading />
      <CardBody>
        <Alert color='warning' className='mb-3' isOpen={alertOpen} toggle={alertToggle}>
          <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: 5 }} />
          Os campos marcados com  <span style={{ fontWeight: 'bold', color: 'red' }}>*</span>  são de preenchimento obrigatório.

        </Alert>

        <Form onSubmit={handleSubmit}>
          <Row className='mb-2'>
            <Col md={3}>
              <Label for='nomeProduto' style={{ fontWeight: 'bold' }}>Nome do produto</Label> <span className='text-danger'>* </span>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infProduto' name='infProduto' />
              <Tooltip placement='top' isOpen={tooltipOpen['infProduto']} target='infProduto' toggle={() => toggle('infProduto')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Nome do produto é obrigatório
              </Tooltip>
              <Input
                required
                type='text'
                name='nomeProduto'
                id='nomeProduto'
                value={data?.nomeProduto}
                onChange={handleInputChange}
                placeholder='Nome do produto'
                onBlur={handleNameBlur}
                invalid={nameError}
                valid={!nameError}
              />

            </Col>
            <Col md={3}>
              <Label for='codigoInterno' style={{ fontWeight: 'bold' }}>Código interno</Label> <span className='text-danger'>* </span>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infCodigo' name='infCodigo' />
              <Tooltip placement='top' isOpen={tooltipOpen['infCodigo']} target='infCodigo' toggle={() => toggle('infCodigo')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Informe o código do produto se tiver, ou clique em "Gerar" para obter um automaticamente.
              </Tooltip>
              <InputGroup>
                <Input
                  required
                  type='text'
                  name='codigoInter'
                  id='codigoInterno'
                  placeholder='Código do produto'
                  value={codigoInterno}
                  onChange={(e) => setCodigoInterno(e.target.value)}
                  onBlur={handleCodigoBlur}
                  invalid={codigoError}
                  valid={!codigoError}
                />
                <Button color='secondary' onClick={generateCode}>
                  <FontAwesomeIcon icon={faRandom} size='sm' style={{ marginRight: 3 }} />
                  Gerar</Button>
              </InputGroup>


            </Col>
            <Col md={3}>
              <Label for='codigoBarra' style={{ fontWeight: 'bold', marginRight: 3 }}>Código de barra </Label>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infCodigoBarra' name='infCodigoBarra' />
              <Tooltip placement='top' isOpen={tooltipOpen['infCodigoBarra']} target='infCodigoBarra' toggle={() => toggle('infCodigoBarra')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Informe o código de barra do produto, se tiver.
              </Tooltip>
              <Input type='text' name='codigoBarra' id='codigoBarra' placeholder='Código de barra' value={data.codigoBarra} onChange={handleInputChange} />
            </Col>
            <Col md={3}>
              <Label for='movimentaEstoque' style={{ fontWeight: 'bold', marginRight: 3 }}>Movimenta estoque? </Label>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infMovimentaEstoque' name='infMovimentaEstoque' />
              <Tooltip placement='top' isOpen={tooltipOpen['infMovimentaEstoque']} target='infMovimentaEstoque' toggle={() => toggle('infMovimentaEstoque')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Habilite ou não essa funcionalidade para movimentar o estoque do produto.
              </Tooltip>
              <Input type='select' name='movimentaEstoque' id='movimentaEstoque' value={data.movimentaEstoque} onChange={handleInputChange}>
                <option>{''}</option>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Input>
            </Col>
          </Row>
          <Row className='mb-2'>

            <Col md={3}>
              <Label for='habilitarNf' style={{ fontWeight: 'bold', marginRight: 3 }}>Habilitar nota fiscal? </Label>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infHabilitarNf' name='infHabilitarNf' />
              <Tooltip placement='top' isOpen={tooltipOpen['infHabilitarNf']} target='infHabilitarNf' toggle={() => toggle('infHabilitarNf')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Habilite ou não essa funcionalidade para emitir nota fiscal do produto.
              </Tooltip>
              <Input type='select' name='habilitarNf' id='habilitarNf' value={data.habilitarNf} onChange={handleInputChange}>
                <option>{''}</option>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Input>
            </Col>
            <Col md={3}>
              <Label for='validade' style={{ fontWeight: 'bold', marginRight: 3 }}>Possui validade? </Label>
              <FontAwesomeIcon icon={faExclamationCircle} size='sm' style={{ cursor: 'pointer' }} id='infValidade' name='infValidade' />
              <Tooltip placement='top' isOpen={tooltipOpen['infValidade']} target='infValidade' toggle={() => toggle('infValidade')} style={{ fontSize: '.7rem', padding: '4px 8px' }}>
                Habilite ou não essa funcionalidade para informar que o produto possui validade de 12 meses.
              </Tooltip>
              <Input type='select' name='validade' id='validade' value={data.validade} onChange={handleInputChange}>
                <option>{''}</option>
                <option value={true}>Sim</option>
                <option value={false}>Não</option>

              </Input>
            </Col>
          </Row>

          <Row className='mb-2'>
            <Col md={12}>

              {nameError || codigoError ?
                <Button color='primary' disabled><
                  FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                  Salvar
                </Button>
                : <Button color='primary' type='submit' >
                  <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                  Salvar
                </Button>}
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
