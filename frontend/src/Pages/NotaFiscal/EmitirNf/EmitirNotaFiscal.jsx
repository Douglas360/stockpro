import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { Button, Card, CardBody, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomSpinner } from '../../../components/CustomSpinner'
import { useInvoice } from '../../../context/InvoiceContext/useInvoice'
import { useOrder } from '../../../context/OrderContext/useOrder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faListCheck, faUsers } from '@fortawesome/free-solid-svg-icons'
import { getFormatterInputPrice } from '../../../functions/getFormatterInputPrice'
import { useAuth } from '../../../context/AuthContext/useAuth'


export const EmitirNotaFiscal = () => {
    const { createInvoice, invoiceLoading } = useInvoice()
    const { getOrderById, loading } = useOrder()
    const { user } = useAuth()

    const [data, setData] = useState([])
    const [orderData, setOrderData] = useState([])

    const loadOrder = async () => {
        const response = await getOrderById(id)
        setOrderData(response)
    }

    const idCompany = user?.id_empresa

    useEffect(() => {
        loadOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const navigate = useNavigate()

    //get OrderId in the URL params and set in the state to use in the request to the API 
    const { id } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
            orderId: id,
            id_empresa: idCompany,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createInvoice(data)
        navigate(`/nota-fiscal/gerenciar`)
    };

    return (
        <div>
            <PageTitle
                heading="Emitir Nota Fiscal"
                subheading="Relizar uma nova emissão de nota fiscal."
                icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
            />
            {loading && <CustomSpinner />}
            {invoiceLoading && <CustomSpinner />}
            <Card className='main-card mb-3'>
                <CardBody>
                    <CardTitle>
                        <h3 className='mb-3'>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Dados do Destinatario </span>
                        </h3>
                    </CardTitle>
                    <Row className='mb-3'>
                        <Col md={2}>
                            <Label style={{ fontWeight: 'bold' }}>Cód. cliente</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.id_cliente}
                                onChange={handleInputChange}
                                name="codigo_cliente"
                                id="codigo_cliente"
                                disabled
                            />
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Nome</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.nome}
                                onChange={handleInputChange}
                                name="nome"
                                id="nome"
                                disabled
                            />
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>CPF/CNPJ</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.cnpj}
                                onChange={handleInputChange}
                                name="cnpj"
                                id="cnpj"
                                disabled
                            />
                        </Col>

                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Inscrição Estadual</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.inscricao_estadual}
                                onChange={handleInputChange}
                                name="inscricao_estadual"
                                id="inscricao_estadual"
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={5}>
                            <Label style={{ fontWeight: 'bold' }}>Endereço</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.rua}
                                onChange={handleInputChange}
                                name="logradouro"
                                id="logradouro"
                                disabled
                            />
                        </Col>

                        <Col md={2}>
                            <Label style={{ fontWeight: 'bold' }}>Número</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.numero}
                                onChange={handleInputChange}
                                name="numero"
                                id="numero"
                                disabled
                            />
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Complemento</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.complemento}
                                onChange={handleInputChange}
                                name="complemento"
                                id="complemento"
                                disabled
                            />
                        </Col>
                        <Col md={2}>
                            <Label style={{ fontWeight: 'bold' }}>CEP</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.cep}
                                onChange={handleInputChange}
                                name="cep"
                                id="cep"
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Bairro</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.bairro}
                                onChange={handleInputChange}
                                name="bairro"
                                id="bairro"
                                disabled
                            />
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Cidade</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.cidade}
                                onChange={handleInputChange}
                                name="cidade"
                                id="cidade"
                                disabled
                            />
                        </Col>

                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Estado</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.enderecos[0]?.estado}
                                onChange={handleInputChange}
                                name="estado"
                                id="estado"
                                disabled
                            />
                        </Col>
                        <Col md={3}>
                            <Label style={{ fontWeight: 'bold' }}>Telefone</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="text"
                                value={orderData?.cliente?.telefone}
                                onChange={handleInputChange}
                                name="telefone"
                                id="telefone"
                                disabled
                            />
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            <Card className='main-card mb-3'>
                <CardBody>
                    <CardTitle>
                        <h3 className='mb-3'>
                            <FontAwesomeIcon icon={faBox} />
                            <span>Produtos</span>
                        </h3>
                    </CardTitle>
                    <Table bordered striped responsive>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Valor Unitário</th>
                                <th>Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.itens?.map((item) => (
                                <tr key={item.id_item_venda}>
                                    <td>{item.produto?.id_produto}</td>
                                    <td>{item.produto?.nome}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{getFormatterInputPrice(item.valor_unitario)}</td>
                                    <td>{getFormatterInputPrice(item.valor_total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </CardBody>
            </Card>




            <Card className='main-card mb-3'>
                <CardBody>
                    <CardTitle>
                        <h3 className='mb-3'>
                            <FontAwesomeIcon icon={faListCheck} />
                            <span>Dados Gerais </span>
                        </h3>
                    </CardTitle>
                    <Row className='mb-3'>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Nº NFe</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="number"
                                value={data.numero_nota}
                                onChange={handleInputChange}
                                name="numero_nota"
                                id="numero_nota"
                            />
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Natureza da oper.</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.natureza_operacao}
                                onChange={handleInputChange}
                                name="natureza_operacao"
                                id="natureza_operacao"
                            >
                                <option value={0}>Natureza da oper.</option>
                                <option value={'Venda'}>1-Venda</option>
                                <option value={'Devolução'}>2-Devolução</option>
                            </Input>
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Tipo da oper.</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.tipo_documento}
                                onChange={handleInputChange}
                                name="tipo_documento"
                                id="tipo_documento"
                            >
                                <option value="0">Tipo da operação</option>
                                <option value={0}>0-Entrada</option>
                                <option value={1}>1-Saída</option>
                            </Input>
                        </Col>

                    </Row>
                    <Row className='mb-3'>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>CFOP</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type='select'
                                name='cfop'
                                id='cfop'
                                value={data.cfop}
                                onChange={handleInputChange}
                            >
                                <option value=''>Selecione</option>
                                <option value={5100}>5100 - VENDAS DE PRODUÇÃO PRÓPRIA OU DE TERCEIROS</option>
                                <option value={5101}>5101 - Venda de produção do estabelecimento</option>
                                <option value={5102}>5102 - Venda de mercadoria adquirida ou recebida de terceiros</option>
                                <option value={5103}>5103 - Venda de produção do estabelecimento, efetuada fora do estabelecimento</option>
                                <option value={5104}>5104 - Venda de mercadoria adquirida ou recebida de terceiros, efetuada fora do estabelecimento</option>
                                <option value={5105}>5105 - Venda de produção do estabelecimento que não deva por ele transitar</option>
                                <option value={5106}>5106 - Venda de mercadoria adquirida ou recebida de terceiros, que não deva por ele transitar</option>
                                <option value={5109}>5109 - Venda de produção do estabelecimento, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                                <option value={5110}>5110 - Venda de mercadoria adquirida ou recebida de terceiros, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                                <option value={5111}>5111 - Venda de produção do estabelecimento remetida anteriormente em consignação industrial</option>
                                <option value={5112}>5112 - Venda de mercadoria adquirida ou recebida de terceiros remetida anteriormente em consignação industrial</option>
                                <option value={5113}>5113 - Venda de produção do estabelecimento remetida anteriormente em consignação mercantil</option>
                                <option value={5114}>5114 - Venda de mercadoria adquirida ou recebida de terceiros remetida anteriormente em consignação mercantil</option>
                                <option value={5115}>5115 - Venda de mercadoria adquirida ou recebida de terceiros, recebida anteriormente em consignação mercantil</option>
                                <option value={5116}>5116 - Venda de produção do estabelecimento originada de encomenda para entrega futura</option>
                                <option value={5117}>5117 - Venda de mercadoria adquirida ou recebida de terceiros, originada de encomenda para entrega futura</option>
                                <option value={5118}>5118 - Venda de produção do estabelecimento entregue ao destinatário por conta e ordem do adquirente originário, em venda à ordem</option>
                                <option value={5119}>5119 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário por conta e ordem do adquirente originário, em venda à ordem</option>
                                <option value={5120}>5120 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário pelo vendedor remetente, em venda à ordem</option>
                                <option value={5122}>5122 - Venda de produção do estabelecimento remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                                <option value={5123}>5123 - Venda de mercadoria adquirida ou recebida de terceiros remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                                <option value={5124}>5124 - Industrialização efetuada para outra empresa</option>
                                <option value={5125}>5125 - Industrialização efetuada para outra empresa quando a mercadoria recebida para utilização no processo de industrialização não transitar pelo estabelecimento adquirente da mercadoria</option>
                                <option value={6100}>6100 - VENDAS DE PRODUÇÃO PRÓPRIA OU DE TERCEIROS</option>
                                <option value={6101}>6101 - Venda de produção do estabelecimento</option>
                                <option value={6102}>6102 - Venda de mercadoria adquirida ou recebida de terceiros</option>
                                <option value={6103}>6103 - Venda de produção do estabelecimento, efetuada fora do estabelecimento</option>
                                <option value={6104}>6104 - Venda de mercadoria adquirida ou recebida de terceiros, efetuada fora do estabelecimento</option>
                                <option value={6105}>6105 - Venda de produção do estabelecimento que não deva por ele transitar</option>
                                <option value={6106}>6106 - Venda de mercadoria adquirida ou recebida de terceiros, que não deva por ele transitar</option>
                                <option value={6107}>6107 - Venda de produção do estabelecimento, destinada a não contribuinte</option>
                                <option value={6108}>6108 - Venda de mercadoria adquirida ou recebida de terceiros, destinada a não contribuinte</option>
                                <option value={6109}>6109 - Venda de produção do estabelecimento, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                                <option value={6110}>6110 - Venda de mercadoria adquirida ou recebida de terceiros, destinada à Zona Franca de Manaus ou Áreas de Livre Comércio</option>
                                <option value={6111}>6111 - Venda de produção do estabelecimento remetida anteriormente em consignação industrial</option>
                                <option value={6112}>6112 - Venda de mercadoria adquirida ou recebida de Terceiros remetida anteriormente em consignação industrial</option>
                                <option value={6113}>6113 - Venda de produção do estabelecimento remetida anteriormente em consignação mercantil</option>
                                <option value={6114}>6114 - Venda de mercadoria adquirida ou recebida de terceiros remetida anteriormente em consignação mercantil</option>
                                <option value={6115}>6115 - Venda de mercadoria adquirida ou recebida de terceiros, recebida anteriormente em consignação mercantil</option>
                                <option value={6116}>6116 - Venda de produção do estabelecimento originada de encomenda para entrega futura</option>
                                <option value={6117}>6117 - Venda de mercadoria adquirida ou recebida de terceiros, originada de encomenda para entrega futura</option>
                                <option value={6118}>6118 - Venda de produção do estabelecimento entregue ao destinatário por conta e ordem do adquirente, em venda à ordem</option>
                                <option value={6119}>6119 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário por conta e ordem do adquirente originário, em venda à ordem</option>
                                <option value={6120}>6120 - Venda de mercadoria adquirida ou recebida de terceiros entregue ao destinatário pelo vendedor remetente, em venda à ordem</option>
                                <option value={6122}>6122 - Venda de produção do estabelecimento remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                                <option value={6123}>6123 - Venda de mercadoria adquirida ou recebida de terceiros remetida para industrialização, por conta e ordem do adquirente, sem transitar pelo estabelecimento do adquirente</option>
                                <option value={6124}>6124 - Industrialização efetuada para outra empresa</option>
                                <option value={6125}>6125 - Industrialização efetuada para outra empresa quando a mercadoria recebida para utilização no processo de industrialização não transitar pelo estabelecimento adquirente da mercadoria</option>
                            </Input>
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Finalidade da Emissão</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.finalidade_emissao}
                                onChange={handleInputChange}
                                name="finalidade_emissao"
                                id="finalidade_emissao"
                            >
                                <option value={0}>Finalidade da emissão</option>
                                <option value={1}>1-Normal</option>
                                <option value={2}>2-Complementar</option>
                                <option value={3}>3-Ajuste</option>
                                <option value={4}>4-Devolução</option>
                            </Input>
                        </Col>

                        <Col md={4}>
                            <Label style={{ fontWeight: 'bold' }}>Destino da operação</Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type="select"
                                value={data.local_destino}
                                onChange={handleInputChange}
                                name="local_destino"
                                id="local_destino"
                            >
                                <option value={0}>Finalidade da Emissão</option>
                                <option value={1}>1-Operação interna</option>
                                <option value={2}>2-Operação interestadual</option>
                                <option value={3}>3-Operação com exterior</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className='mb-3'> 
                    <Col md={12}>
                    <Label style={{ fontWeight: 'bold' }}>Informações adicionais</Label><span className='text-danger'>*</span>
                            <Input
                                type='text'
                                value={data.informacoes_adicionais_contribuinte}
                                onChange={handleInputChange}
                                name='informacoes_adicionais_contribuinte'
                                id='informacoes_adicionais_contribuinte'
                                />
                    </Col>

                    </Row>
                    <Row>
                        <Col md={4}>
                            <Button color='primary' type='submit' onClick={handleSubmit}>
                                Emitir Nota Fiscal
                            </Button>
                        </Col>
                    </Row>

                </CardBody>
            </Card>




        </div>
    )
}
