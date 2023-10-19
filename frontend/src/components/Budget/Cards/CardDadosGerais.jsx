import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRandom } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardBody, Col, FormText, Input, InputGroup, Label, Row } from 'reactstrap'

import { useAuth } from '../../../context/AuthContext/useAuth'
import { useOrder } from '../../../context/OrderContext/useOrder'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import Select from "react-select"

const CardDadosGerais = ({ data, handleInputChange, typeForm }) => {
  const { user } = useAuth()
  const { listSalesStatus } = useOrder()
  const { listAllCustomers } = useRegister()
  const [clientSelected, setClienteSelected] = useState([])
  const [customers, setCustomers] = useState([])
  const [situacaoVenda, setSituacaoVenda] = useState([])
  const [inputErrors, setInputErrors] = useState({
    codigoError: false,
    customerError: false,
    dateError: false,
    situacaoError: false,
  });

  const idCompany = user?.id_empresa

  const loadCustomers = async () => {
    const response = await listAllCustomers(idCompany)
    const responseStatus = await listSalesStatus()
    setCustomers(response)
    setSituacaoVenda(responseStatus)
  }

  useEffect(() => {
    if (idCompany) {
      loadCustomers()
    }
  }, [idCompany])

  const handleInputBlur = (name, value) => {
    if (value.trim() === '') {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    } else {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000)

    const updatedData = { ...data }
    updatedData.numeroVenda = randomCode.toString()
    handleInputChange({ target: { name: 'numeroVenda', value: randomCode.toString() } })

    if (inputErrors.codigoError) {
      setInputErrors((prevErrors) => ({ ...prevErrors, codigoError: false }));
    }
  }

  const handleCodigoChange = (e) => {
    const { value } = e.target
    const updatedData = { ...data }
    updatedData.numeroVenda = value
    handleInputChange({ target: { name: 'numeroVenda', value: value } })
  }

  const handleClientChange = (client) => {
    setClienteSelected(client)
    const updatedData = { ...data }
    updatedData.clienteOrcamento = client.value
    handleInputChange({ target: { name: 'clienteOrcamento', value: client.value } })
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
            <Label style={{ fontWeight: 'bold' }}>Número {typeForm === 'venda' ? 'da venda' : 'do orçamento'} </Label><span className='text-danger'>*</span>

            <InputGroup>
              <Input
                required
                type='number'
                name='numeroVenda'
                id='numeroVenda'
                placeholder='Numero Venda'
                defaultValue={data?.numeroVenda || ''}
                value={data.numeroVenda}
                onChange={handleCodigoChange}
                onBlur={(e) => handleInputBlur('codigoError', e.target.value)}
                invalid={inputErrors.codigoError}
                valid={inputErrors.codigoError}
              />
              <Button color='secondary' onClick={generateCode}>
                <FontAwesomeIcon icon={faRandom} size='sm' style={{ marginRight: 3 }} />
                Gerar</Button>
            </InputGroup>
          </Col>
          <Col md='5'>
            <Label style={{ fontWeight: 'bold' }}>Cliente</Label><span className='text-danger'>*</span>
            {/*<Input type='select'
              name='clienteOrcamento'
              id='clienteOrcamento'
              value={data?.clienteOrcamento || ''}
              onChange={handleInputChange}
              onBlur={(e) => handleInputBlur('customerError', e.target.value)}
              invalid={inputErrors.customerError}
              valid={inputErrors.customerError}
              required
            >
              <option value=''>Selecione um cliente</option>
              {customers?.map((customer, index) => (
                <option key={index} value={customer.id_cliente}>
                  {customer.nome}
                </option>
              ))}
            </Input>*/}
            <Select
              value={clientSelected}
              onChange={(selectedOption) => handleClientChange(selectedOption)}
              options={customers.map(clients => ({ value: clients.id_cliente, label: clients.nome }))}
              noOptionsMessage={() => "Nenhum registro encontrado"}
              placeholder="Selecione o cliente"
              required
            />
          </Col>
          <Col md='4'>
            <Label style={{ fontWeight: 'bold' }}>Data</Label><span className='text-danger'>*</span>
            <Input
              type='date'
              name='dataInclusao'
              id='dataInclusao'
              //min={new Date().toISOString().split('T')[0]}
              value={data?.dataInclusao}
              onChange={handleInputChange}
              invalid={inputErrors.dateError}
              valid={inputErrors.dateError}
              required
            />
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col md='4'>
            <Label style={{ fontWeight: 'bold' }}>Situação</Label><span className='text-danger'>*</span>
            <Input type='select'
              name='situacaoVendaOrcamento'
              id='situacaoVendaOrcamento'
              value={data?.situacaoVendaOrcamento || ''}
              defaultValue={1}
              onChange={handleInputChange}
              onBlur={(e) => handleInputBlur('situacaoError', e.target.value)}
              invalid={inputErrors.situacaoError}
              valid={inputErrors.situacaoError}
              required
            >
              <option value=''>Selecione</option>
              {situacaoVenda?.map((situacao, index) => (
                <option key={index} value={situacao.id_situacao_venda}>
                  {situacao.descricao}
                </option>
              ))}
            </Input>


          </Col>

          {typeForm !== 'venda' && (
            <Col md='4'>
              <Label>Validade</Label>
              <Input type='text' name='validadeOrcamento' id='validadeOrcamento' placeholder='Ex: 10 dias' value={data?.validadeOrcamento || ''} onChange={handleInputChange} />
            </Col>
          )}

          <Col md='4'>
            <Label>Canal de venda</Label>
            <Input type='select'
              name='canalVendaOrcamento'
              id='canalVendaOrcamento'
              value={data?.canalVendaOrcamento || ''}
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
        {typeForm !== 'venda' && (
          <Row className='mt-2'>
            <Col md='12'>
              <Label>Introdução</Label>
              <Input type='textarea' name='introducaoOrcamento' id='introducaoOrcamento' value={data?.introducaoOrcamento || ''} onChange={handleInputChange} />
              <FormText color='muted' style={{ fontStyle: 'italic' }}>
                Este texto irá aparecer no início da proposta enviada para o cliente, caso não queira inserir uma introdução basta deixar este espaço em branco.
              </FormText>
            </Col>
          </Row>
        )}

      </CardBody>
    </Card>
  )
}
export default CardDadosGerais