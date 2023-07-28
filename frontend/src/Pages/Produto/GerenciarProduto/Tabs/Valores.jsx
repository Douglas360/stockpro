import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faInfoCircle,
  faPlusCircle,
  faQuestionCircle,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Tooltip
} from 'reactstrap';
import { useProduct } from '../../../../context/ProductContext/useProduct';
import { CustomSpinner } from '../../../../components/CustomSpinner';

export const Valores = ({ data, handleInputChange, handleSubmit, Loading }) => {

  const navigate = useNavigate();
  const { createSalePrice, listSalePrices, loading } = useProduct();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const [lucroSugerido, setLucroSugerido] = useState([]);
  const [valorVendaSugerido, setValorVendaSugerido] = useState('0,000');


  const loadSalePrices = useCallback(async () => {
    const salePrices = await listSalePrices();
    setLucroSugerido(salePrices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array, the function will remain constant


  useEffect(() => {
    loadSalePrices();
  }, [loadSalePrices]); // Add loadSalePrices to the dependency array


  const alertToggle = () => {
    setAlertOpen(false);
  };
  const toggle = (id) => {
    setTooltipOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const handleModalSave = async () => {
    const salePrice = {
      descricao: descricao,
      valor: valor
    };
    await createSalePrice(salePrice);
    setDescricao('');
    setValor('');
    loadSalePrices();
    // Close the modal
    setModal(false);
  };
  const handleModalCancel = () => {
    // Reset the input values
    setDescricao('');
    setValor('');    // Close the modal
    setModal(false);
  };
  const handleCancel = () => {
    navigate('/produto/gerenciar');
  };
  const handleSumPrice = () => {
    let valorCusto = data?.valorCusto
    if (typeof valorCusto === 'string') {
      valorCusto = valorCusto.replace(',', '.')
    }
   
    let despesasAcessorias = data.despesasAcessorias
    if (typeof despesasAcessorias === 'string') {
      despesasAcessorias = despesasAcessorias.replace(',', '.')
    }
    
    let outrasDespesas = data.outrasDespesas
    if (typeof outrasDespesas === 'string') {
      outrasDespesas = outrasDespesas.replace(',', '.')
    }

    valorCusto = valorCusto ? parseFloat(valorCusto) : 0;
    despesasAcessorias = despesasAcessorias ? parseFloat(despesasAcessorias) : 0;
    outrasDespesas = outrasDespesas ? parseFloat(outrasDespesas) : 0;

    const custoFinal = valorCusto + despesasAcessorias + outrasDespesas;
    data.custoFinal = custoFinal.toFixed(2);
    return custoFinal.toFixed(2);
  };
  const handleAddSalePrice = () => {
    setModal(true);

  };

  const handleCalculateSalePrice = () => {
    const custoFinal = handleSumPrice();   
    const lucroSug = parseFloat(lucroSugerido?.[0]?.valor);
    const valorVendaSugerido = custoFinal * (1 + lucroSug / 100);
    setValorVendaSugerido(valorVendaSugerido.toFixed(2));

    const valorVendaUtil = custoFinal * (1 + data.lucroUtilizado / 100);
    console.log(valorVendaUtil)

    data.valorVendaUtilizado = valorVendaUtil.toFixed(2)

  }

  return (
    <Card className='main-card mb-3'>
      <CardBody>
        <Loading />
        <Form onSubmit={handleSubmit}>
          <Row className='mb-1'>
            <Col md={5}>
              <Label for='valorCusto' style={{ fontWeight: 'bold' }}>
                Valor de custo{' '}
                <span className='text-danger'>*</span>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size='sm'
                  style={{ marginLeft: 3, cursor: 'pointer' }}
                  id='infValorCusto'
                  name='infValorCusto'
                />
                <Tooltip
                  placement='top'
                  isOpen={tooltipOpen['infValorCusto']}
                  toggle={() => toggle('infValorCusto')}
                  target='infValorCusto'
                  style={{ fontSize: 12 }}
                >
                  O valor de custo é o preço pago pela mercadoria para aquisição da mesma.
                </Tooltip>
              </Label>
              <Input
                required
                type='number'
                name='valorCusto'
                id='valorCusto'
                value={data.valorCusto}
                onChange={handleInputChange}
                placeholder='0,0000'
              />
              <Label for='despesasAcessorias' style={{ fontWeight: 'bold' }}>
                Despesas acessórias
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size='sm'
                  style={{ marginLeft: 3, cursor: 'pointer' }}
                  id='infDespesasAcessorias'
                  name='infDespesasAcessorias'
                />
                <Tooltip
                  placement='top'
                  isOpen={tooltipOpen['infDespesasAcessorias']}
                  toggle={() => toggle('infDespesasAcessorias')}
                  target='infDespesasAcessorias'
                  style={{ fontSize: 12 }}
                >
                  Despesas acessórias são os gastos adicionais que ocorrem na compra de um produto, como por exemplo, frete, seguro, impostos, etc.
                </Tooltip>
              </Label>
              <Input
                type='number'
                name='despesasAcessorias'
                id='despesasAcessorias'
                value={data.despesasAcessorias}
                onChange={handleInputChange}
                placeholder='0,0000'
              />
              <Label for='outrasDespesas' style={{ fontWeight: 'bold' }}>
                Outras despesas
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size='sm'
                  style={{ marginLeft: 3, cursor: 'pointer' }}
                  id='infOutrasDespesas'
                  name='infOutrasDespesas'
                />
                <Tooltip
                  placement='top'
                  isOpen={tooltipOpen['infOutrasDespesas']}
                  toggle={() => toggle('infOutrasDespesas')}
                  target='infOutrasDespesas'
                  style={{ fontSize: 12 }}
                >
                  Outras despesas são os gastos adicionais que ocorrem na compra de um produto, como por exemplo, frete, seguro, impostos, etc.
                </Tooltip>
              </Label>
              <Input
                type='number'
                name='outrasDespesas'
                id='outrasDespesas'
                value={data.outrasDespesas}
                onChange={handleInputChange}
                placeholder='0,0000'
              />
              <Label for='custoFinal' style={{ fontWeight: 'bold' }}>
                Custo final
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size='sm'
                  style={{ marginLeft: 3, cursor: 'pointer' }}
                  id='infCustoFinal'
                  name='infCustoFinal'
                />
                <Tooltip
                  placement='top'
                  isOpen={tooltipOpen['infCustoFinal']}
                  toggle={() => toggle('infCustoFinal')}
                  target='infCustoFinal'
                  style={{ fontSize: 12 }}
                >
                  O custo final é o valor total pago pela mercadoria, incluindo o valor de custo, despesas acessórias e outras despesas.
                </Tooltip>
              </Label>
              <Input
                type='number'
                name='custoFinal'
                id='custoFinal'
                value={handleSumPrice()}
                placeholder='0,0000'
                disabled
              />

            </Col>
            <Col md={7}>
              <Alert color='info' isOpen={alertOpen} toggle={alertToggle}>
                <p style={{ fontSize: 12 }}>
                  <FontAwesomeIcon icon={faInfoCircle} size='xl' style={{ marginRight: 3 }} />
                  O valor de venda é a valoração monetária dos produtos comercializados pelo estabelecimento. Ele pode ser calculado ou indicado livremente.
                </p>
              </Alert>
              <Button color='success' className='mb-2' onClick={handleCalculateSalePrice}>
                <FontAwesomeIcon icon={faCalculator} size='xl' style={{ marginRight: 3 }} />
                Calcular valor de venda
              </Button>
              <Table bordered striped hover responsive>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Lucro sugerido (%)</th>
                    <th>Lucro utilizado (%)</th>
                    <th>Valor de venda sugerido (R$)</th>
                    <th>Valor de venda utilizado (R$)<span className='text-danger'>*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {lucroSugerido.map((item, index) => (
                    <tr className='text-center'>
                      <td key={index}>{item.descricao}</td>
                      <td key={index}>{item.valor}</td>
                      <td>
                        <Input
                          type='number'
                          name='lucroUtilizado'
                          id='lucroUtilizado'
                          //value={lucroUtilizado}
                          //onChange={(e) => setLucroUtilizado(e.target.value)}
                          value={data.lucroUtilizado}
                          onChange={handleInputChange}
                          placeholder='0,0000'
                        />
                      </td>
                      <td>
                        <Input
                          type='number'
                          name='valorVendaSugerido'
                          id='valorVendaSugerido'
                          value={valorVendaSugerido}
                          placeholder='0,0000'
                          disabled
                        />
                      </td>
                      <td>
                        <Input
                          required
                          type='number'
                          name='valorVendaUtilizado'
                          id='valorVendaUtilizado'
                          value={data.valorVendaUtilizado}
                          onChange={handleInputChange}
                          //value={valorVendaUtilizado}
                          //onChange={(e) => setValorVendaUtilizado(e.target.value)}
                          placeholder='0,0000'

                        />
                      </td>
                    </tr>

                  ))}
                </tbody>
              </Table>
              <div className='d-flex justify-content-end items-end'>
                <Button color='info' className='mb-2' onClick={handleAddSalePrice}>
                  <FontAwesomeIcon icon={faPlusCircle} size='xl' style={{ marginRight: 3 }} />
                  Cadastrar novo valor de venda
                </Button>

              </div>
            </Col>
          </Row>
          {/* Buttons Add and Cancel*/}
          <Row className='mb-2'>
            <Col md={12}>
              <Button color='primary' type='submit'>
                <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                Salvar
              </Button>
              <Button color='danger' onClick={handleCancel} style={{ marginLeft: 3 }}>
                <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
                Cancelar
              </Button>
            </Col>
          </Row>

          {modal && (

            <Modal isOpen={modal} toggle={handleModalCancel}>
              <ModalHeader toggle={handleModalCancel}>Cadastrar novo valor de venda</ModalHeader>
              <ModalBody>
                <Label for='descricao'>Descrição</Label>
                <Input
                  type='text'
                  name='descricao'
                  id='descricao'
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                <Label for='valor'>Valor (%)</Label>
                <Input
                  type='number'
                  name='valor'
                  id='valor'
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={handleModalSave}>
                  {loading ? (
                    <CustomSpinner />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                      Salvar
                    </>
                  )

                  }
                </Button>
                <Button color='danger' onClick={handleModalCancel} style={{ marginLeft: 3 }}>
                  <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </Form>
      </CardBody>
    </Card>
  );



};

