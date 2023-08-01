import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
//import { FilterToReport } from './Form'
import { useReport } from '../../../context/ReportContext/useReport'
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from 'reactstrap'

import { CustomSpinner } from '../../../components/CustomSpinner'
import { useAuth } from '../../../context/AuthContext/useAuth'
import { RelatorioFornecedor } from '../../../reports/Cadastro/RelatorioFornecedor'

export const Fornecedor = () => {
    const { user } = useAuth()
    const { getReportSuppliers, loading } = useReport()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { situacao, nome, email } = e.target
        const data = {
            "report": {
                ativo: situacao.value,
                nome: nome.value,
                email: email.value,
                id_empresa: user?.id_empresa
            }
        }
        const response = await getReportSuppliers(data)
        if (response) {
            RelatorioFornecedor(response)
        }
    }
    return (
        <>
            <PageTitle
                heading={'Relatório de Fornecedores'}
                subheading="Relatório de Fornecedores"
                icon="pe-7s-note2 icon-gradient bg-amy-crisp"
            />
            <Card className="main-card mb-3">
                {loading && <CustomSpinner />}
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col sm={12} md={4} lg={4} xl={4}>
                                <Label>Situação</Label>
                                <Input
                                    type="select"
                                    name="situacao"
                                    id="situacao"
                                    placeholder="Selecione a situação"
                                >
                                    <option value="">Todas</option>
                                    <option value={true}>Ativo</option>
                                    <option value={false}>Inativo</option>
                                </Input>
                            </Col>
                            <Col sm={12} md={4} lg={4} xl={4}>
                                <Label>Nome</Label>
                                <Input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    placeholder="Digite o nome"
                                />
                            </Col>
                            <Col sm={12} md={4} lg={4} xl={4}>
                                <Label>Email</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Digite o email"
                                />
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
