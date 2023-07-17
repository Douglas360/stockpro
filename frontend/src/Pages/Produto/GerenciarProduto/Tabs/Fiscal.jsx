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
const handlePesoLiquidChange = (e) => {
    const { value } = e.target
    const pesoLiquido = value.replace(',','.')
    
    //Update the data object
    const updatedData = { ...data }
    updatedData.pesoLiquido = pesoLiquido
    handleInputChange({ target: { name: 'pesoLiquido', value: pesoLiquido } })

  }

const handlePesoBrutoChange = (e) => {
    const { value } = e.target
    const pesoBruto = value.replace(',','.')

    //Update the data object
    const updatedData = { ...data }
    updatedData.pesoBruto = pesoBruto
    handleInputChange({ target: { name: 'pesoBruto', value: pesoBruto } })

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
              <FontAwesomeIcon icon={faSearch} id='codigoNcm' style={{ marginLeft: 3 }} /><span className='text-danger'>*</span>
              <Input
                required
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
              <Label for='origemProduto'>Origem</Label> <span className='text-danger'>*</span>            
              <Input
                required
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
            <Col md={2}>
              <Label for='pesoLiquido'>Peso Líquido</Label>
              <Input
                type='text'
                name='pesoLiquido'
                id='pesoLiquido'
                placeholder='Peso Líquido'
                value={data.pesoLiquido}
                onChange={handlePesoLiquidChange}
              />
            </Col>
            <Col md={2}>
              <Label for='pesoBruto'>Peso Bruto</Label>
              <Input
                type='text'
                name='pesoBruto'
                id='pesoBruto'
                placeholder='Peso Bruto'
                value={data.pesoBruto}
                onChange={handlePesoBrutoChange}
              />
            </Col>
            <Col md={2}>
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
            <Col md={2}>
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
            <Col md={4}>
              <Label for='cfop'>CFOP</Label> <span className='text-danger'>*</span>
              <Input
                required
                type='select'
                name='cfop'
                id='cfop'
                value={data.cfop}
                onChange={handleInputChange}
              >
                <option value=''>Selecione</option>
                <option value='5100'>5100 - VENDAS DE PRODUÇÃO PRÓPRIA OU DE TERCEIROS</option>
                <option value='5101'>5101 - Venda de produção do estabelecimento</option>
                <option value='5102'>5102 - Venda de mercadoria adquirida ou recebida de terceiros</option>
                <option value='5103'>5103 - Venda de produção do estabelecimento, efetuada fora do estabelecimento</option>
                <option value='5104'>5104 - Venda de mercadoria adquirida ou recebida de terceiros, efetuada fora do estabelecimento</option>
                <option value='5105'>5105 - Venda de produção do estabelecimento que não deva por ele transitar</option>
                <option value='5106'>5106 - Venda de mercadoria adquirida ou recebida de terceiros, que não deva por ele transitar</option>
                <option value='5109'>5109 - Venda de produção do estabelecimento, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                <option value='5110'>5110 - Venda de mercadoria adquirida ou recebida de terceiros, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                <option value='5111'>5111 - Venda de produção do estabelecimento remetida anteriormente em consignação industrial</option>
                <option value='5112'>5112 - Venda de mercadoria adquirida ou recebida de terceiros remetida anteriormente em consignação industrial</option>
                <option value='5113'>5113 - Venda de produção do estabelecimento remetida anteriormente em consignação mercantil</option>
                <option value='5114'>5114 - Venda de mercadoria adquirida ou recebida de terceiros remetida anteriormente em consignação mercantil</option>
                <option value='5115'>5115 - Venda de mercadoria adquirida ou recebida de terceiros, recebida anteriormente em consignação mercantil</option>
                <option value='5116'>5116 - Venda de produção do estabelecimento originada de encomenda para entrega futura</option>
                <option value='5117'>5117 - Venda de mercadoria adquirida ou recebida de terceiros, originada de encomenda para entrega futura</option>
                <option value='5118'>5118 - Venda de produção do estabelecimento entregue ao destinatário por conta e ordem do adquirente originário, em venda à ordem</option>
                <option value='5119'>5119 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário por conta e ordem do adquirente originário, em venda à ordem</option>
                <option value='5120'>5120 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário pelo vendedor remetente, em venda à ordem</option>
                <option value='5122'>5122 - Venda de produção do estabelecimento remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                <option value='5123'>5123 - Venda de mercadoria adquirida ou recebida de terceiros remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                <option value='5124'>5124 - Industrialização efetuada para outra empresa</option>
                <option value='5125'>5125 - Industrialização efetuada para outra empresa quando a mercadoria recebida para utilização no processo de industrialização não transitar pelo estabelecimento adquirente da mercadoria</option>
              </Input>
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
