import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

export const RelatorioVendaJSX = () => {
    const navigate = useNavigate()

    // Function to handle the click event and navigate to the filter screen
    const handleCardClick = (reportName) => {
        navigate(`/relatorio/vendas/${reportName}`);

    };

    const CardComponent = ({ title, description, onClick, background }) => {
        return (
            <Card className="main-card mb-3" style={{ cursor: 'pointer', backgroundColor: background }} onClick={onClick}>
                <CardBody>
                    <h3>{title}</h3>
                    <span>{description}</span>
                </CardBody>
            </Card>
        )
    }

    return (
        <>
            <Card>
                <CardHeader className="card-header-tab z-index-6" style={{ backgroundColor: '#f8f9fa', cursor: 'default' }}>
                    <h4>
                        <FontAwesomeIcon icon={faSquarePollVertical} />
                        <span className="ml-2">Relatórios de Cadastros</span>
                    </h4>
                </CardHeader>
                <CardBody>
                    <Row className="mb-3">
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="ORÇAMENTOS"
                                description="Gerar relatório de orçamentos cadastrados"
                                onClick={() => handleCardClick('orcamentos')}
                                background="lightblue"
                            />

                        </Col>
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="VENDAS"
                                description="Gerar relatório de vendas cadastradas"
                                onClick={() => handleCardClick('vendas')}
                                background="lightgreen"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="PRODUTOS VENDIDOS"
                                description="Gerar relatório de produtos vendidos"
                                onClick={() => handleCardClick('produtos-vendidos')}
                                background="lightyellow"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="CLIENTES QUE MAIS COMPRARAM"
                                description="Gerar relatório de clientes que mais compraram"
                                onClick={() => handleCardClick('clientes-que-mais-compraram')}
                                background="lightpink"
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};
