import React, { useEffect, useState } from 'react'
import { faPenToSquare, faRandom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, Col, FormText, Input, InputGroup, Label, Row } from 'reactstrap'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useAuth } from '../../../context/AuthContext/useAuth'


const CardDadosGerais = ({ data, handleInputChange }) => {
  const { listAllCustomers } = useRegister()
  const { user } = useAuth()
  const [customers, setCustomers] = useState([])
  const [numeroVenda, setNumeroVenda] = useState('')
  const [codigoError, setCodigoError] = useState(false)
  const [customerError, setCustomerError] = useState(false)


  const loadCustomers = async () => {
    //const id_empresa = user?.id_empresa
    const response = await listAllCustomers(1)

    setCustomers(response)

  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const situacaoVenda = [
    { id: 1, name: 'Concretizada' },
    { id: 2, name: 'Em aberto' },
    { id: 3, name: 'Em andamento' },
    { id: 4, name: 'Cancelada' },
  ]


  const handleCodigoBlur = (e) => {
    const { value } = e.target
    if (value.length < 1) {
      setCodigoError(true)
    } else {
      setCodigoError(false)
    }
  }
  const handleCustomerBlur = (e) => {
    const { value } = e.target
    if (value.length < 1) {
      setCustomerError(true)
    } else {
      setCustomerError(false)
    }
  }

  const generateCode = () => {

    const randomCode = Math.floor(100000 + Math.random() * 900000)

    setNumeroVenda(randomCode.toString())

    //update the data object
    const updatedData = { ...data }
    updatedData.numeroVenda = randomCode.toString()
    handleInputChange({ target: { name: 'numeroVenda', value: randomCode.toString() } })

  }

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
          <Col md='3'>
            <Label style={{ fontWeight: 'bold' }}>Número da venda</Label><span className='text-danger'>*</span>

            <InputGroup>
              <Input
                required
                type='text'
                name='numeroVenda'
                id='numeroVenda'
                placeholder='Numero da Venda'
                value={numeroVenda}
                onChange={(e) => setNumeroVenda(e.target.value)}
                onBlur={handleCodigoBlur}
                invalid={codigoError}
                valid={!codigoError}
              />
              <Button color='secondary' onClick={generateCode}>
                <FontAwesomeIcon icon={faRandom} size='sm' style={{ marginRight: 3 }} />
                Gerar</Button>
            </InputGroup>
          </Col>
          <Col md='5'>
            <Label style={{ fontWeight: 'bold' }}>Cliente</Label><span className='text-danger'>*</span>
            <Input type='select'
              name='clienteOrcamento'
              id='clienteOrcamento'
              value={data.clienteOrcamento}
              onChange={handleInputChange}
              onBlur={handleCustomerBlur}
              invalid={customerError}
              valid={!customerError}
              required
            >
              <option value=''>Selecione um cliente</option>
              {customers.map((customer) => (
                <option key={customer.id_cliente} value={customer.id_cliente}>
                  {customer.nome}
                </option>
              ))}
            </Input>
          </Col>
          <Col md='4'>
            <Label style={{ fontWeight: 'bold' }}>Data</Label><span className='text-danger'>*</span>
            <Input type='date' name='dataOrcamento' id='dataOrcamento' value={data.dataOrcamento} onChange={handleInputChange} />
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col md='4'>
            <Label>Situação</Label>
            <Input type='select'
              name='situacaoVendaOrcamento'
              id='situacaoVendaOrcamento'
              value={data.situacaoVendaOrcamento}
              defaultValue={1}
              onChange={handleInputChange}
            >
              <option value=''>Selecione</option>
              {situacaoVenda.map((situacao) => (
                <option key={situacao.id} value={situacao.id}>
                  {situacao.name}
                </option>
              ))}
            </Input>


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