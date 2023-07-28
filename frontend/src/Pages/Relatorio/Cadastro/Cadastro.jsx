import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom'; // Import useHistory hook
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

export const RelatorioCadastroJSX = () => {
    const navigate = useNavigate()

    // Function to handle the click event and navigate to the filter screen
    const handleCardClick = (reportName) => {
        navigate(`/relatorio/cadastros/${reportName}`);
     
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
                                title="CLIENTES"
                                description="Gerar relatório de clientes cadastrados"
                                onClick={() => handleCardClick('clientes')}
                                background="lightblue"
                            />
                            
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="PRODUTOS"
                                description="Gerar relatório de produtos cadastrados"
                                onClick={() => handleCardClick('produtos')}
                                background="lightgreen"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="FORNECEDORES"
                                description="Gerar relatório de fornecedores cadastrados"
                                onClick={() => handleCardClick('fornecedores')}
                                background="lightyellow"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={6}>
                            <CardComponent
                                title="TRANSPORTADORAS"
                                description="Gerar relatório de transportadoras cadastradas"
                                onClick={() => handleCardClick('transportadoras')}
                                background="lightpink"
                            />                        
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};
