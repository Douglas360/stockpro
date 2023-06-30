import { faQuestionCircle, faSackDollar, faSave, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, CardBody, Col, Form, Input, Label, Row, UncontrolledAlert, UncontrolledTooltip } from 'reactstrap'

export const Fiscal = ({ data, handleSubmit, handleInputChange, Loading }) => {
  const navigate = useNavigate()
  const [alertOpen, setAlertOpen] = useState(true)

  const handleAlert = () => {
    setAlertOpen(false)
  }
  const handleCancel = () => {
    navigate('/produto/gerenciar')
  }
  return (
    <Card className='main-card mb-3'>
      <CardBody>
        <Loading />
        <Alert color='primary' isOpen={alertOpen} toggle={handleAlert}>
          <p>
            Estas informações são utilizadas para emissão de notas fiscais
            eletrônicas.
          </p>
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col md={3}>
              <Label for='codigoNcm'>Código NCM - </Label>
              <FontAwesomeIcon icon={faSearch} id='codigoNcm' style={{ marginLeft: 3 }} />
              <Input
                type='text'
                name='codigoNcm'
                id='codigoNcm'
                placeholder='Código NCM'
                value={data.codigoNcm}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='codigoCest'>Código CEST</Label>
              <FontAwesomeIcon icon={faQuestionCircle} id='infCodigoCest' style={{ marginLeft: 3, cursor: 'pointer' }} />
              <UncontrolledTooltip placement='top' target='infCodigoCest' style={{ fontSize: 12 }}>
                O código CEST deve-se ter 7 caracteres
              </UncontrolledTooltip>
              <Input
                type='text'
                name='codigoCest'
                id='codigoCest'
                placeholder='Código CEST'
                value={data.codigoCest}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='codigoBeneficio'>Código Beneficio</Label>
              <Input
                type='text'
                name='codigoBeneficio'
                id='codigoBeneficio'
                placeholder='Código Beneficio'
                value={data.codigoBeneficio}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='origemProduto'>Origem</Label>
              <Input
                type='select'
                name='origemProduto'
                id='origemProduto'
                value={data.origemProduto}
                onChange={handleInputChange}
              >
                <option value=''>Selecione</option>
                <option value='0'>0 - Nacional</option>
                <option value='1'>1 - Estrangeira - Importação direta</option>
                <option value='2'>2 - Estrangeira - Adquirida no mercado interno</option>
                <option value='3'>3 - Nacional, mercadoria ou bem com conteúdo de importação superior a 40%</option>
                <option value='4'>4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam o Decreto-Lei nº 288/67, e as Leis nºs 8.248/91, 8.387/91, 10.176/01 e 11.484/07</option>
                <option value='5'>5 - Nacional, mercadoria ou bem com conteúdo de importação inferior ou igual a 40%</option>
                <option value='6'>6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural</option>
                <option value='7'>7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural</option>
                <option value='8'>8 - Nacional, mercadoria ou bem com conteúdo de importação superior a 70%</option>
              </Input>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md={3}>
              <Label for='pesoLiquido'>Peso Líquido</Label>
              <Input
                type='text'
                name='pesoLiquido'
                id='pesoLiquido'
                placeholder='Peso Líquido'
                value={data.pesoLiquido}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='pesoBruto'>Peso Bruto</Label>
              <Input
                type='text'
                name='pesoBruto'
                id='pesoBruto'
                placeholder='Peso Bruto'
                value={data.pesoBruto}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='numeroFci'>Número FCI</Label>
              <Input
                type='text'
                name='numeroFci'
                id='numeroFci'
                placeholder='Número FCI'
                value={data.numeroFci}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='VrAproxTribut'>% Vr. aprox. tribut.</Label>
              <Input
                type='text'
                name='VrAproxTribut'
                id='VrAproxTribut'
                placeholder='% Vr. aprox. tribut.'
                value={data.VrAproxTribut}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <FontAwesomeIcon icon={faSackDollar} id='icms' size='xl' style={{ marginRight: 3 }} />
          <Label style={{ fontSize: 20 }}>PIS/COFINS</Label>
          <UncontrolledAlert color='info'>
            <p>
              Preencher somente quando possuir valor fixo por unidade
            </p>
          </UncontrolledAlert>
          <Row className='mb-3'>
            <Col md={3}>
              <Label for='valorFixoPis'>Valor fixo PIS</Label>
              <Input
                type='text'
                name='valorFixoPis'
                id='valorFixoPis'
                placeholder='Valor Fixo PIS'
                value={data.valorFixoPis}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='valorFixoCofins'>Valor fixo COFINS</Label>
              <Input
                type='text'
                name='valorFixoCofins'
                id='valorFixoCofins'
                placeholder='Valor Fixo COFINS'
                value={data.valorFixoCofins}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='valorFixoPisSt'>Valor fixo PIS ST</Label>
              <Input
                type='text'
                name='valorFixoPisSt'
                id='valorFixoPisSt'
                placeholder='Valor Fixo PIS ST'
                value={data.valorFixoPisSt}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Label for='valorFixoCofinsSt'>Valor fixo COFINS ST</Label>
              <Input
                type='text'
                name='valorFixoCofinsSt'
                id='valorFixoCofinsSt'
                placeholder='Valor Fixo COFINS ST'
                value={data.valorFixoCofinsSt}
                onChange={handleInputChange}
              />
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
