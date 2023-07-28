import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { useReport } from '../../../context/ReportContext/useReport'
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from 'reactstrap'

import { CustomSpinner } from '../../../components/CustomSpinner'
import { RelatorioCliente } from '../../../reports/Cadastro/RelatorioCliente'
import { useAuth } from '../../../context/AuthContext/useAuth'
import { RelatorioProduto } from '../../../reports/Cadastro/RelatorioProduto'

export const Produto = () => {
  const { user } = useAuth()
  const { getReportProducts, loading } = useReport()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ativo, nome } = e.target
    const data = {
      "report": {
        ativo: ativo.value,
        nome: nome.value,
        id_empresa: user?.id_empresa
      }
    }
    const response = await getReportProducts(data)
    if (response) {
      RelatorioProduto(response)
    }
  }
  return (
    <>
      <PageTitle
        heading={'Relatório de Produtos'}
        subheading="Relatório de Produtos"
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
                  name="ativo"
                  id="ativo"
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
