import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from 'reactstrap'
import { CustomSpinner } from '../../../components/CustomSpinner'
import { useReport } from '../../../context/ReportContext/useReport'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useOrder } from '../../../context/OrderContext/useOrder'
import { RelatorioVenda } from '../../../reports/Venda/RelatorioVenda'

export const Orcamento = () => {
    const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user')
    const id = JSON.parse(idEmpresa).id_empresa
    const { getReportBudgets, loading } = useReport()
    const { listAllCustomers } = useRegister()
    const { listSalesStatus } = useOrder()
    const [customers, setCustomers] = useState([])
    const [situacaoVenda, setSituacaoVenda] = useState([])

    const loadCustomers = async () => {
        //const id_empresa = user?.id_empresa
        const response = await listAllCustomers(id)
        const responseStatus = await listSalesStatus()
        setCustomers(response)
        setSituacaoVenda(responseStatus)

    }

    useEffect(() => {
        loadCustomers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data_inicial, data_final, cliente, situacao } = e.target
        const data = {
            "report": {
                data_inicial: data_inicial.value,
                data_final: data_final.value,
                cliente: cliente.value,
                situacao: situacao.value,
                id_empresa: id
            }
        }
        const response = await getReportBudgets(data)
        if (response) {
            //Adicionar data_inicial e data_final no relatório
            response.budgetFormatted.data_inicial = new Date(data_inicial.value).toLocaleDateString('pt-BR')
            response.budgetFormatted.data_final = new Date(data_final.value).toLocaleDateString('pt-BR')

            RelatorioVenda(response.budgetFormatted)

        }
    }

    return (
        <>
            <PageTitle
                heading={'Relatório de Orçamentos'}
                subheading="Relatório de Orçamentos "
                icon="pe-7s-note2 icon-gradient bg-amy-crisp"
            />
            <Card className="main-card mb-3">
                {loading && <CustomSpinner />}
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col sm={12} md={6} lg={6} xl={6}>
                                <Label htmlFor="data_inicial">Período</Label>
                                <Input
                                    type="date"
                                    name="data_inicial"
                                    id="data_inicial"
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6} xl={6}>
                                <Label htmlFor="data_final">Até</Label>
                                <Input
                                    type="date"
                                    name="data_final"
                                    id="data_final"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={12} md={4} lg={4} xl={4}>
                                <Label>Cliente</Label>
                                <Input
                                    type="select"
                                    name="cliente"
                                    id="cliente"

                                >
                                    <option value="">Todos</option>
                                    {customers?.map((customer) => (
                                        <option key={customer.id_cliente} value={customer.id_cliente}>
                                            {customer.nome}
                                        </option>
                                    ))}
                                </Input>
                            </Col>
                            <Col sm={12} md={4} lg={4} xl={4}>
                                <Label>Situação</Label>
                                <Input
                                    type="select"
                                    name="situacao"
                                    id="situacao"

                                >
                                    <option value="">Todas</option>
                                    {situacaoVenda.map((situacao) => (
                                        <option key={situacao.id_situacao_venda} value={situacao.id_situacao_venda}>
                                            {situacao.descricao}
                                        </option>
                                    ))}
                                </Input>
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            color="primary"
                            className="mt-2"
                        >
                            Gerar Relatório
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}
