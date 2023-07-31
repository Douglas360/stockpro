import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
    Table,
} from 'reactstrap';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { useDashboard } from '../../../context/DashboardContext/useDashboard';
import { dateFormatWithHours } from '../../../functions/getFomatter';
import { CustomSpinner } from '../../../components/CustomSpinner';
import { useAuth } from '../../../context/AuthContext/useAuth';

const InventoryTable = ({ data }) => {
    return (
        <Table striped>
            <thead>
                <tr className='text-center'>
                    <th>Produto</th>
                    <th>Qnt. min</th>
                    <th>Qnt. max</th>
                    <th>Qnt. atual</th>
                    <th>% Estoque</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((product, index) => {
                    const minThreshold = product.quantidade_minima; // Limiar mínimo para acionar a cor amarela
                    const percentage = (product.quantidade / product.quantidade_maxima) * 100;
                    let color;

                    if (product.quantidade <= 1) {
                        color = 'warning'; // Amarelo quando em 20% do mínimo (ou abaixo do mínimo)
                    } else if (product.quantidade <= product.quantidade_minima) {
                        color = 'danger'; // Vermelho quando abaixo do mínimo
                    } else {
                        color = 'success'; // Verde padrão
                    }

                    return (
                        <tr key={index} className='text-center'>
                            <td>{product.nome}</td>
                            <td>{product.quantidade_minima}</td>
                            <td>{product.quantidade_maxima}</td>
                            <td>{product.quantidade}</td>
                            <td>
                                <Progress
                                    className="progress-bar-lg progress-bar-animated-alt"
                                    value={percentage}
                                    color={color}
                                >
                                    {`${percentage.toFixed(0)}%`}
                                </Progress>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const InventoryMovementTable = ({ data }) => {
    return (
        <Table striped>
            <thead>
                <tr className='text-center' style={{ fontSize: 13 }}>
                    <th>Produto</th>
                    <th>Data movimentação</th>
                    <th>Tipo movimentação</th>
                    <th>Quantidade</th>
                    <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((product, index) => {
                    return (
                        <tr key={index}
                            className={`text-center ${product.tipo_movimentacao === 'Entrada' ? 'text-success' : 'text-danger'}`}
                            style={{ fontSize: 13 }}>
                            <td>{product.nome}</td>
                            <td>{dateFormatWithHours(product.movimentacao_estoque)}</td>
                            <td>{product.tipo_movimentacao}</td>
                            <td>{product.quantidade}</td>
                            <td>{product.descricao}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const SalesTable = ({ data }) => {
    return (
        <Table striped>
            <thead>
                <tr className='text-center' style={{ fontSize: 13 }}>
                    <th>Nº</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Situação</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((sale, index) => {
                    return (
                        <tr key={index} className='text-center' style={{ fontSize: 13 }}>
                            <td>{sale.id}</td>
                            <td>{dateFormatWithHours(sale?.data_venda) || dateFormatWithHours(sale?.data_orcamento)}</td>
                            <td>{sale.nome_cliente}</td>
                            <td >
                                <div className="ms-auto badge" style={{ backgroundColor: sale.cor }}>
                                    {sale.situacao_venda}
                                </div>
                            </td>

                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const AnalyticsDashboard1 = () => {
    const { listInventory, listInventoryMovement, listSales, listBudget, loading } = useDashboard();
    const [inventory, setInventory] = useState([]);
    const [inventoryMovement, setInventoryMovement] = useState([]);
    const [sales, setSales] = useState([]);
    const [budget, setBudget] = useState([]);
    const [activeTab1, setActiveTab1] = useState('11');
    const [activeTab2, setActiveTab2] = useState('12');
    const { user } = useAuth();
    const idCompany = user?.id_empresa;

    const fetchData = async () => {
        const response = await listInventory(idCompany);
        const responseMovement = await listInventoryMovement(idCompany);
        const responseSales = await listSales(idCompany);
        const responseBudget = await listBudget(idCompany);

        setInventory(response);
        setInventoryMovement(responseMovement);
        setSales(responseSales);
        setBudget(responseBudget);

    };

    useEffect(() => {
        if (idCompany) {
            fetchData();
        }


    }, [idCompany]);

    const toggle1 = (tab) => {
        if (activeTab1 !== tab) {
            setActiveTab1(tab);
        }
    };
    const toggle2 = (tab) => {
        if (activeTab2 !== tab) {
            setActiveTab2(tab);
        }
    };

    return (
        <Fragment>
            <TransitionGroup>
                <CSSTransition
                    component="div"
                    className="TabsAnimation"
                    appear={true}
                    timeout={0}
                    enter={false}
                    exit={false}
                >
                    <div>
                        {loading && <CustomSpinner />}


                        <PageTitle
                            heading="Olá, seja bem vindo(a) ao sistema de gestão da sua empresa!"
                            subheading="Aqui você pode acompanhar o desempenho da sua empresa."
                            //icon="pe-7s-car icon-gradient bg-mean-fruit"
                            icon="pe-7s-graph icon-gradient bg-mean-fruit"
                        />
                        {/* Other JSX content goes here */}
                        <Row>
                            <Col md="12" lg="6">
                                <Card className="mb-3 ">
                                    <CardHeader className="card-header-tab">
                                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                            <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                            Estoque
                                        </div>

                                        <div className="btn-actions-pane-right">
                                            <Button outline
                                                className={"border-0 btn-pill btn-wide btn-transition " + classnames({ active: activeTab1 === '11' })}
                                                color="primary" onClick={() => {
                                                    toggle1('11');
                                                }}>Quantidades</Button>
                                            <Button outline
                                                className={"ms-1 btn-pill btn-wide border-0 btn-transition " + classnames({ active: activeTab1 === '22' })}
                                                color="primary" onClick={() => {
                                                    toggle1('22');
                                                }}>Movimentações</Button>
                                        </div>
                                    </CardHeader>
                                    <TabContent activeTab={activeTab1}>

                                        {/* Tab 1 */}
                                        <TabPane tabId="11">
                                            <CardBody className='pt-2'>
                                                <Row className="mt-3">
                                                    <div className="table-responsive"> {/* Adicionando a classe table-responsive para gerar scroll na tabela */}
                                                        <InventoryTable data={inventory} />
                                                    </div>

                                                </Row>

                                            </CardBody>

                                        </TabPane>

                                        {/* Tab 2 */}
                                        <TabPane tabId="22">
                                            <CardBody className="pt-2">
                                                <Row className="mt-3">
                                                    <div className="table-responsive"> {/* Adicionando a classe table-responsive para gerar scroll na tabela */}
                                                        <InventoryMovementTable data={inventoryMovement} />
                                                    </div>
                                                </Row>
                                            </CardBody>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </Col>
                            {/*Column 2 */}
                            <Col md="12" lg="6">
                                <CardHeader className="card-header-tab">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                        Vendas
                                    </div>

                                    <div className="btn-actions-pane-right">
                                        <Button outline
                                            className={"border-0 btn-pill btn-wide btn-transition " + classnames({ active: activeTab2 === '12' })}
                                            color="primary" onClick={() => {
                                                toggle2('12');
                                            }}>Vendas</Button>
                                        <Button outline
                                            className={"ms-1 btn-pill btn-wide border-0 btn-transition " + classnames({ active: activeTab2 === '23' })}
                                            color="primary" onClick={() => {
                                                toggle2('23');
                                            }}>Orçamentos</Button>
                                    </div>
                                </CardHeader>
                                <TabContent activeTab={activeTab2}>
                                    {/* Tab 1 */}
                                    <TabPane tabId="12">
                                        <CardBody className='pt-2 h-50' >
                                            <Row className="mt-3">
                                                <Col md="12">
                                                    <div className="table-responsive"> {/* Adicionando a classe table-responsive para gerar scroll na tabela */}
                                                        <SalesTable data={sales} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </TabPane>

                                    {/* Tab 2 */}
                                    <TabPane tabId="23">
                                        <CardBody className='pt-2 h-50' >
                                            <Row className="mt-3">
                                                <Col md="12">
                                                    <div className="table-responsive"> {/* Adicionando a classe table-responsive para gerar scroll na tabela */}
                                                        <SalesTable data={budget} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </Fragment>
    );
};
export default AnalyticsDashboard1;
