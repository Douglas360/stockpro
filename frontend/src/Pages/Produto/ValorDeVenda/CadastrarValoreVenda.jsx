import React, { useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { Button, Card, CardBody, Col, Form, Input, Label, Row, UncontrolledTooltip } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { CustomSpinner } from '../../../components/CustomSpinner';


const CadastrarValoreVenda = () => {
    const navigate = useNavigate();
    const { createSalePrice, loading } = useProduct();
    const [data, setData] = useState([]);
    const [nomeError, setNomeError] = useState(false);
    const [lucroError, setLucroError] = useState(false);

    const handleNomeBlur = (e) => {
        if (e.target.value === '') {
            setNomeError(true);
        } else {
            setNomeError(false);
        }
    };

    const handleLucroBlur = (e) => {
        if (e.target.value === '') {
            setLucroError(true);
        } else {
            setLucroError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createSalePrice(data);
        navigate('/produto/valores');
    };

    const handleCancel = () => {
        navigate('/produto/valores');
    };

    return (
        <div>
            <PageTitle
                heading="Cadasto de valores de venda"
                subheading="Cadastro de produtos"
                icon="pe-7s-box1 icon-gradient bg-amy-crisp"
            />
            {loading && <CustomSpinner />

            }
            <Card className="main-card mb-3">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mb-2'>
                            <Col md="6">
                                <Label style={{ fontWeight: "bold" }}>Nome <span className='text-danger'>*</span>
                                    <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: "5px" }} id='infNome' name='infNome' />
                                    <UncontrolledTooltip placement='top' target='infNome' style={{ fontSize: 12 }}>
                                        Ex.: Varejo, Atacado, Distribuidor, etc.
                                    </UncontrolledTooltip>
                                </Label>
                                <Input
                                    required
                                    type="text"
                                    name="nome"
                                    placeholder="Nome"
                                    onChange={(e) => setData({ ...data, descricao: e.target.value })}
                                    onBlur={handleNomeBlur}
                                    invalid={nomeError}
                                    valid={!nomeError}
                                />
                            </Col>
                            <Col md="6">
                                <Label style={{ fontWeight: "bold" }}>Lucro (%)</Label>
                                <Input
                                    required
                                    type="text"
                                    name="lucro"
                                    placeholder="Lucro"
                                    onChange={(e) => setData({ ...data, valor: e.target.value })}
                                    onBlur={handleLucroBlur}
                                    invalid={lucroError}
                                    valid={!lucroError}

                                />
                            </Col>
                        </Row>
                        {/* Buttons Add and Cancel*/}
                        <Row className='mb-2'>
                            <Col md={12}>
                                <Button color='primary' type='submit'
                                    disabled={nomeError || lucroError}
                                >
                                    <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }}

                                    />
                                    Salvar
                                </Button>
                                <Button color='danger' onClick={handleCancel} style={{ marginLeft: 3 }}>
                                    <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
                                    Cancelar
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}

export default CadastrarValoreVenda