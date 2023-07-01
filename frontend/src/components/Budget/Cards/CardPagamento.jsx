import React, { useState } from 'react'
import { faMoneyBill1Wave, faPlus, faRefresh, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, Col, Input, Label, Row, Table } from 'reactstrap'

const CardPagamento = ({ data, handleInputChange }) => {
  const [checkExibePagamento, setCheckExibePagamento] = useState(false)
  const [checkPagamentoAvista, setCheckPagamentoAvista] = useState(false)
  const [checkPagamentoParcelado, setCheckPagamentoParcelado] = useState(false)
  const [pagamentoParcelado, setPagamentoParcelado] = useState([])

  const formaPagamento = [
    { id: 1, nome: 'Dinheiro' },
    { id: 2, nome: 'Cartão de crédito' },
    { id: 3, nome: 'Cartão de débito' },
    { id: 4, nome: 'Cheque' },
    { id: 5, nome: 'Boleto' },
    { id: 6, nome: 'Depósito' },
    { id: 7, nome: 'Transferência' },
    { id: 8, nome: 'Pix' },
    { id: 9, nome: 'Outros' }
  ]

  const handleAddField = () => {
    setPagamentoParcelado([...pagamentoParcelado, {
      vencimento: '',
      valor: '',
      formaPagamentoParcelado: '',
      observacao: ''
    }])
  }

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...pagamentoParcelado]
    updatedFields[index][field] = value
    setPagamentoParcelado(updatedFields)

    // Update the data object with the updated array
    const updatedData = { ...data }
    updatedData.pagamentoParcelado = updatedFields
    handleInputChange({ target: { name: 'pagamentoParcelado', value: updatedFields } })
    
  }


  const handleRemoveField = (index) => {
    const list = [...pagamentoParcelado]
    list.splice(index, 1)
    setPagamentoParcelado(list)
  }


  const handleCheck = (checkboxName, value) => {
    if (checkboxName === 'exibePagamento') {
      setCheckExibePagamento(value)
    } else if (checkboxName === 'pagamentoAvista') {
      setCheckPagamentoAvista(value)
      setCheckPagamentoParcelado(false)
    } else if (checkboxName === 'pagamentoParcelado') {
      setCheckPagamentoParcelado(value)
      setCheckPagamentoAvista(false)
    }
  }

  const handleRefresh = () => {
    if (data.quantidadeParcelas > pagamentoParcelado.length) {
      const intervaloDias = data.intervaloParcelas
      const currentDate = new Date(data.dataPrimeiraParcela);



      const list = [...pagamentoParcelado];
      const fieldsToAdd = data.quantidadeParcelas - pagamentoParcelado.length;

      for (let i = 0; i < fieldsToAdd; i++) {
        currentDate.setDate(currentDate.getDate() + intervaloDias * i);


        list.push({
          formaPagamentoParcelado: Number(data.formaPagamentoParcelado),
          vencimentoParcela: currentDate.toISOString().substr(0, 10),
        });
      }

      setPagamentoParcelado(list);
    } else if (data.quantidadeParcelas < pagamentoParcelado.length) {
      const list = [...pagamentoParcelado];
      list.splice(data.quantidadeParcelas, pagamentoParcelado.length);
      setPagamentoParcelado(list);
    }
  };



  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md='12'>
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon icon={faMoneyBill1Wave} style={{ fontSize: 20, marginRight: 3 }} />
              Pagamento</Label>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <Input
              type='checkbox'
              name='exibePagamento'
              id='exibePagamento'
              onChange={(e) => handleCheck('exibePagamento', e.target.checked)}
              checked={checkExibePagamento}
              style={{ marginRight: 5 }}
            />
            <Label for='exibePagamento'>Gerar condições de pagamento</Label>
          </Col>
        </Row>
        {checkExibePagamento && (
          <>
            <Row>
              <Col md='12'>
                <Input
                  type='checkbox'
                  name='pagamentoAvista'
                  id='pagamentoAvista'
                  onChange={(e) => handleCheck('pagamentoAvista', e.target.checked)}
                  checked={checkPagamentoAvista}
                  style={{ marginRight: 5 }}
                />
                <Label for='pagamentoAvista'>Pagamento à vista <span className='text-danger'>*</span></Label>
                <Input
                  type='checkbox'
                  name='pagamentoParcelado'
                  id='pagamentoParcelado'
                  onChange={(e) => handleCheck('pagamentoParcelado', e.target.checked)}
                  checked={checkPagamentoParcelado}
                  style={{ marginRight: 5, marginLeft: 10 }}
                />
                <Label for='pagamentoParcelado'>Pagamento parcelado <span className='text-danger'>*</span></Label>
              </Col>
            </Row>

            {checkPagamentoAvista && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Forma de pagamento</th>
                    <th>Observação</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        type='date'
                        name='vencimentoAvista'
                        id='vencimentoAvista'
                        placeholder='Vencimento'
                        onChange={handleInputChange}
                        value={data.vencimentoAvista}
                        defaultValue={new Date().toISOString().substr(0, 10)}
                      />
                    </td>
                    <td>
                      <Input
                        type='text'
                        name='valorAvista'
                        id='valorAvista'
                        placeholder='Valor'
                        onChange={handleInputChange}
                        value={data.valorAvista}
                      />
                    </td>
                    <td>
                      <Input
                        type='select'
                        name='formaPagamentoAvista'
                        id='formaPagamentoAvista'
                        onChange={handleInputChange}
                        value={data.formaPagamentoAvista}
                      >
                        <option value=''>Selecione</option>
                        {formaPagamento.map((item) => (
                          <option key={item.id} value={item.id}>{item.nome}</option>
                        ))}

                      </Input>
                    </td>
                    <td>
                      <Input
                        type='text'
                        name='observacaoAvista'
                        id='observacaoAvista'
                        placeholder='Observação'
                        onChange={handleInputChange}
                        value={data.observacaoAvista}
                      />
                    </td>
                    <td>
                      <Button color='danger' size='sm'>
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}

            {checkPagamentoParcelado && (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Forma de pagamento</th>
                      <th>Intervalo de parcelas (dias)</th>
                      <th>Quantidade de parcelas</th>
                      <th>Data 1ª parcela</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          type='select'
                          name='formaPagamentoParcelado'
                          id='formaPagamentoParcelado'
                          onChange={handleInputChange}
                          value={data.formaPagamentoParcelado}
                        >
                          <option value=''>Selecione</option>
                          {formaPagamento.map((item) => (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                          ))}

                        </Input>
                      </td>
                      <td>
                        <Input
                          type='text'
                          name='intervaloParcelas'
                          id='intervaloParcelas'
                          placeholder='Intervalo de parcelas'
                          onChange={handleInputChange}
                          value={data.intervaloParcelas}
                        />
                      </td>
                      <td>
                        <Input
                          type='text'
                          name='quantidadeParcelas'
                          id='quantidadeParcelas'
                          placeholder='Quantidade de parcelas'
                          onChange={handleInputChange}
                          value={data.quantidadeParcelas}
                        />
                      </td>
                      <td>
                        <Input
                          type='date'
                          name='dataPrimeiraParcela'
                          id='dataPrimeiraParcela'
                          placeholder='Data 1ª parcela'
                          onChange={handleInputChange}
                          value={data.dataPrimeiraParcela}
                        />

                      </td>
                      <td>
                        <Button color='dark' size='sm' onClick={handleRefresh}>
                          <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 3 }} />
                          Gerar
                        </Button>
                      </td>

                    </tr>
                  </tbody>
                </Table>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Vencimento</th>
                      <th>Valor</th>
                      <th>Forma de pagamento</th>
                      <th>Observação</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>

                    {pagamentoParcelado.map((parcela, index) => (
                      <tr key={index}>
                        <td>
                          <Input
                            type='date'
                            name='vencimentoParcela'
                            id='vencimentoParcela'
                            placeholder='Vencimento'
                            onChange={(e) => handleFieldChange(index, 'vencimentoParcela', e.target.value)}
                            value={parcela.vencimentoParcela}
                          />
                        </td>
                        <td>
                          <Input
                            type='text'
                            name='valorParcela'
                            id='valorParcela'
                            placeholder='Valor'
                            onChange={(e) => handleFieldChange(index, 'valorParcela', e.target.value)}
                            value={parcela.valorParcela}
                          />
                        </td>
                        <td>
                          <Input
                            type='select'
                            name='formaPagamentoParcela'
                            id='formaPagamentoParcela'
                            onChange={(e) => handleFieldChange(index, 'formaPagamentoParcela', e.target.value)}
                            value={parcela.formaPagamentoParcelado}

                          >
                            <option value=''>Selecione</option>

                            {formaPagamento.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.nome}
                              </option>
                            ))}
                          </Input>
                        </td>
                        <td>
                          <Input
                            type='text'
                            name='observacaoParcela'
                            id='observacaoParcela'
                            placeholder='Observação'
                            onChange={(e) => handleFieldChange(index, 'observacaoParcela', e.target.value)}
                            value={parcela.observacaoParcela}
                          />
                        </td>
                        <td>
                          <Button color='danger' onClick={() => handleRemoveField(index)}>
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>
                        </td>

                      </tr>
                    ))
                    }




                  </tbody>
                </Table>
                {pagamentoParcelado.length > 0 && (
                  <Button color='dark' size='sm' onClick={handleAddField}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 3 }} />
                    Adicionar parcela
                  </Button>
                )}

              </>
            )}


          </>
        )}

      </CardBody>

    </Card >
  )
}

export default CardPagamento