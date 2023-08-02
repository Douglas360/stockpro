import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Spinner, UncontrolledAlert, UncontrolledTooltip } from 'reactstrap'
import { faIdCard, faMapMarkerAlt, faPenToSquare, faPhone, faPlusCircle, faSave, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { GetCep } from '../functions/getCep'
import { GetCnpj } from '../functions/getCnpj'
import InputMask from 'react-input-mask';
import { useAuth } from '../context/AuthContext/useAuth'

const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const FormRegister = ({ title, handleFormSubmit, loading, initialValues }) => {

    const { user } = useAuth()
    const [tipoCliente, setTipoCliente] = useState(initialValues?.tipo_cliente || 'Pessoa Juridica')
    const [checked, setChecked] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [tipoClienteError, setTipoClienteError] = useState(false)
    const [inscricaoEstadual, setInscricaoEstadual] = useState()
    const [cnpj, setCnpj] = useState(initialValues?.cnpj || '')
    const [enderecosCliente, setEnderecosCliente] = useState(
        initialValues?.enderecos?.map((endereco) => ({ ...endereco })) || [
            {
                tipo_endereco: '',
                cep: '',
                rua: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
            },
        ]
    );
    const [tipoContribuinte, setTipoContribuinte] = useState(initialValues?.tipo_contribuinte || '0')


    const [contatosCliente, setContatosCliente] = useState(initialValues?.contatos || [
        { tipo_contato: '', nome: '', observacao: '' }
    ])
    useEffect(() => {
        if (initialValues) {
            setEnderecosCliente(initialValues?.enderecos?.map((endereco) => ({ ...endereco })))
            setContatosCliente(initialValues?.contatos?.map((contato) => ({ ...contato })))
            setTipoContribuinte(initialValues?.tipo_contribuinte)
        }
    }, [initialValues])


    const navigate = useNavigate()
    const handleCancel = useCallback(() => {
        navigate(`/cadastro/${title}`);
    }, [navigate, title]);

    const handleAddEndereco = useCallback(() => {
        setEnderecosCliente((enderecos) => [...enderecos, { cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' }]);
    }, []);

    const handleRemoveEndereco = useCallback((index) => {
        setEnderecosCliente((enderecos) => {
            const updatedEnderecos = [...enderecos];
            updatedEnderecos.splice(index, 1);
            return updatedEnderecos;
        });
    }, []);

    const handleEnderecoChange = useCallback((index, field, value) => {
        setEnderecosCliente((enderecos) => {
            const updatedEnderecos = [...enderecos];
            updatedEnderecos[index][field] = value;
            return updatedEnderecos;
        });
    }, []);

    const handleAddContato = useCallback(() => {
        setContatosCliente((contatos) => [...contatos, { tipo_contato: '', nome: '', observacao: '' }]);
    }, []);

    const handleRemoveContato = useCallback((index) => {
        setContatosCliente((contatos) => {
            const updatedContatos = [...contatos];
            updatedContatos.splice(index, 1);
            return updatedContatos;
        });
    }, []);

    const handleContatoChange = useCallback((index, field, value) => {
        setContatosCliente((contatos) => {
            const updatedContatos = [...contatos];
            updatedContatos[index][field] = value;
            return updatedContatos;
        });
    }, []);

    const handleChecked = useCallback(() => {
        setChecked((prevState) => !prevState);
        setInscricaoEstadual("ISENTO");
    }, []);

    const handleTipoClienteChange = useCallback((e) => {
        setTipoCliente(e.target.value);
    }, []);

    const handleSearchCep = useCallback(async () => {
        const cep = enderecosCliente[0].cep;
        if (cep.length > 0) {
            try {
                const updatedEnderecos = [...enderecosCliente];

                for (let i = 0; i < updatedEnderecos.length; i++) {
                    const cep = updatedEnderecos[i].cep;
                    const response = await GetCep(cep);

                    if (response) {
                        const { logradouro, bairro, localidade, uf } = response;

                        updatedEnderecos[i].rua = logradouro || '';
                        updatedEnderecos[i].bairro = bairro || '';
                        updatedEnderecos[i].cidade = localidade || '';
                        updatedEnderecos[i].estado = uf || '';
                    } else {
                        updatedEnderecos[i].rua = '';
                        updatedEnderecos[i].bairro = '';
                        updatedEnderecos[i].cidade = '';
                        updatedEnderecos[i].estado = '';
                    }
                }

                setEnderecosCliente(updatedEnderecos);
            } catch (error) {
                console.error('Erro ao buscar os CEPs:', error);
            }
        }
    }, [enderecosCliente]);

    const handleSearchCnpj = useCallback(async (cnpj) => {
        if (cnpj?.length > 0) {
            try {
                const updatedEnderecos = [...enderecosCliente];
                const response = await GetCnpj(cnpj);

                if (response) {

                    const { razao_social, nome_fantasia, ddd_telefone_1, logradouro, municipio, bairro, uf, cep, numero } = response;
                    document.getElementById('razaoSocialCliente').value = razao_social || '';
                    document.getElementById('nomeCliente').value = nome_fantasia || '';
                    document.getElementById('telefoneCliente').value = ddd_telefone_1 || '';

                    updatedEnderecos[0].tipo_endereco = '2' || '';
                    updatedEnderecos[0].cep = cep || '';
                    updatedEnderecos[0].rua = logradouro || '';
                    updatedEnderecos[0].bairro = bairro || '';
                    updatedEnderecos[0].cidade = municipio || '';
                    updatedEnderecos[0].estado = uf || '';
                    updatedEnderecos[0].numero = numero || '';
                }

                setEnderecosCliente(updatedEnderecos);
            } catch (error) {
                console.error('Erro ao buscar os CNPJ:', error);
            }
        }
    }, [enderecosCliente]);

    const handleSubmit = useCallback((event) => {
        const idEmpresa = user?.id_empresa;
        event.preventDefault();
        const form = new FormData(event.target);
        const value = Object.fromEntries(form.entries());

        value.enderecos = enderecosCliente;
        value.contatos = contatosCliente;
        value.id_empresa = idEmpresa;
        value.tipo_contribuinte = tipoContribuinte;
        if (inscricaoEstadual) {
            value.inscricaoEstadualCliente = inscricaoEstadual;
        }
        handleFormSubmit(value);
    }, [user, enderecosCliente, contatosCliente, handleFormSubmit]);

    const handleNameBlur = useCallback((e) => {
        const { value } = e.target;
        if (value.length < 1) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }, []);

    const handleTipoClienteBlur = useCallback((e) => {
        const { value } = e.target;
        if (value.length < 1) {
            setTipoClienteError(true);
        } else {
            setTipoClienteError(false);
        }
    }, []);

    useMemo(() => {
        return enderecosCliente.map((endereco, index) => (
            <div key={index}>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="cep">CEP</Label>
                            <InputGroup>
                                <InputMask
                                    mask="99999-999"
                                    maskPlaceholder={null}
                                    type="text"
                                    name={`enderecos[${index}].cep`}
                                    id={`cep-${index}`}
                                    value={endereco.cep}
                                    onChange={(e) => handleEnderecoChange(index, 'cep', e.target.value)}
                                />
                                <InputGroupText addonType="append">
                                    <Button color="secondary" onClick={handleSearchCep}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={9}>
                        <FormGroup>
                            <Label for="rua">Rua</Label>
                            <Input type="text" name={`enderecos[${index}].rua`} id={`rua-${index}`} value={endereco.rua} onChange={(e) => handleEnderecoChange(index, 'rua', e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                {/* ...rest of the fields */}
            </div>
        ));
    }, [enderecosCliente, handleEnderecoChange, handleSearchCep]);

    useMemo(() => {
        return contatosCliente.map((contato, index) => (
            <div key={index}>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="tipoContato">Tipo de Contato</Label>
                            <Input type="select" name={`contatos[${index}].tipo_contato`} id={`tipoContato-${index}`} value={contato.tipo_contato} onChange={(e) => handleContatoChange(index, 'tipo_contato', e.target.value)}>
                                <option value="" disabled>Selecione...</option>
                                <option value="1">Telefone</option>
                                <option value="2">E-mail</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="nomeContato">Nome</Label>
                            <Input type="text" name={`contatos[${index}].nome`} id={`nomeContato-${index}`} value={contato.nome} onChange={(e) => handleContatoChange(index, 'nome', e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="observacaoContato">Observação</Label>
                            <Input type="text" name={`contatos[${index}].observacao`} id={`observacaoContato-${index}`} value={contato.observacao} onChange={(e) => handleContatoChange(index, 'observacao', e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col md={1}>
                        <FormGroup>
                            <Button color="danger" onClick={() => handleRemoveContato(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        ));
    }, [contatosCliente, handleContatoChange, handleRemoveContato]);

    return (
        <Card className='main-card mb-3'>
            <CardBody>
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50
                        }}
                    >
                        <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                        <UncontrolledAlert color="warning">
                            <strong>Atenção!</strong> Preencha todos os campos obrigatórios.
                        </UncontrolledAlert>
                        <Col md='12'>
                            <Label for='codigo' style={{ fontSize: 20 }}>
                                <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20, marginRight: 3 }} />
                                Dados gerais</Label>
                        </Col>
                        <Col md='3'>
                            <Label for='tipoCliente' style={{ fontWeight: 'bold' }}>Tipo de {title} </Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type='select'
                                name='tipoCliente'
                                id='tipoCliente'
                                value={tipoCliente}
                                onChange={handleTipoClienteChange}
                                onBlur={handleTipoClienteBlur}
                                invalid={tipoClienteError}
                                valid={!tipoClienteError}

                            >
                                <option value='0'>Selecione</option>
                                <option value='Pessoa Fisica'>Pessoa Física</option>
                                <option value='Pessoa Juridica' >Pessoa Jurídica</option>
                            </Input>
                            <FormFeedback>
                                {tipoClienteError && `Tipo de ${title} é obrigatório`}
                            </FormFeedback>
                        </Col>
                        <Col md='3'>
                            <Label for='situacaoCliente' style={{ fontWeight: 'bold' }}>Situação do {title} </Label><span className='text-danger'>*</span>
                            <Input type='select' name='situacaoCliente' id='situacaoCliente' required>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </Input>
                        </Col>
                        <Col md='3'>
                            <Label for='nomeCliente' style={{ fontWeight: 'bold' }}>Nome {tipoCliente === 'Pessoa Juridica' ? 'fantasia' : ''} </Label><span className='text-danger'>*</span>
                            <Input
                                required
                                type='text'
                                name='nomeCliente'
                                id='nomeCliente'
                                defaultValue={initialValues?.nome}
                                onBlur={handleNameBlur}
                                invalid={nameError}
                                valid={!nameError}
                            />
                            <FormFeedback>
                                {nameError && `Nome do ${title} é obrigatório`}
                            </FormFeedback>
                        </Col>
                        <Col md='3'>
                            <Label for='emailCliente' style={{ fontWeight: 'bold' }}>E-mail </Label>
                            <Input type='email' name='emailCliente' id='emailCliente' defaultValue={initialValues?.email} />
                        </Col>
                    </Row>
                    {tipoCliente === 'Pessoa Fisica' &&
                        <Row className='mb-3'>
                            <Col md='3'>
                                <Label for='cpfCliente' style={{ fontWeight: 'bold' }}>CPF </Label>
                                {/*<Input type='text' name='cpfCliente' id='cpfCliente' />*/}
                                <InputMask
                                    mask="999.999.999-99"
                                    maskPlaceholder=""
                                >
                                    {inputProps => (
                                        <Input
                                            defaultValue={initialValues?.cpf}
                                            type="text"
                                            name="cpfCliente"
                                            id="cpfCliente"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>
                            </Col>
                            <Col md='3'>
                                <Label for='rgCliente' style={{ fontWeight: 'bold' }}>RG </Label>
                                <Input type='text' name='rgCliente' id='rgCliente' />
                            </Col>
                            <Col md='3'>
                                <Label for='dataNascimentoCliente' style={{ fontWeight: 'bold' }}>Data de nascimento </Label>
                                <Input type='date' name='dataNascimentoCliente' id='dataNascimentoCliente' />
                            </Col>
                            <Col md='3'>
                                <Label for='telefoneCliente' style={{ fontWeight: 'bold' }}>Telefone </Label>
                                <Input type='text' name='telefoneCliente' id='telefoneCliente' />
                            </Col>

                        </Row>
                    }
                    {tipoCliente === 'Pessoa Juridica' &&
                        <>
                            <Row className='mb-3'>
                                <Col md='4'>
                                    <Label for='cnpjCliente' style={{ fontWeight: 'bold' }} >CNPJ </Label><span className='text-danger'>*</span>
                                    <InputGroup>
                                        <InputMask
                                            mask="99.999.999/9999-99"
                                            value={initialValues?.cnpj || cnpj}
                                            maskPlaceholder=""
                                            onBlur={(e) => { handleSearchCnpj(e.target.value) }}
                                            onChange={(e) => { initialValues?.cnpj ? setCnpj(initialValues?.cnpj) : setCnpj(e.target.value) }}
                                        >
                                            {inputProps => (
                                                <Input
                                                    required
                                                    type="text"
                                                    name="cnpjCliente"
                                                    id="cnpjCliente"

                                                    {...inputProps}
                                                />
                                            )}
                                        </InputMask>
                                        <InputGroupText addonType="append">
                                            <FontAwesomeIcon icon={faSearch} size="xl" onClick={() => handleSearchCnpj()} id='searchCnpj' name='searchCnpj'
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </InputGroupText>

                                    </InputGroup>
                                    <UncontrolledTooltip placement="top" target="searchCnpj" style={{ fontSize: 12 }}>
                                        Buscar CNPJ
                                    </UncontrolledTooltip>
                                </Col>
                                <Col md='4'>
                                    <Label for='razaoSocialCliente' style={{ fontWeight: 'bold' }}>Razão social </Label><span className='text-danger'>*</span>
                                    <Input required type='text' name='razaoSocialCliente' id='razaoSocialCliente' defaultValue={initialValues?.razao_social} />
                                </Col>
                                <Col md='4'>
                                    <Label for='inscricaoEstadualCliente' style={{ fontWeight: 'bold' }}>Inscrição estadual </Label> <span className='text-danger'>*</span>
                                    <InputGroup>
                                        <Input required type='text' name='inscricaoEstadualCliente' id='inscricaoEstadualCliente'
                                            disabled={checked}
                                            defaultValue={initialValues?.inscricao_estadual || ''}
                                            value={checked ? 'ISENTO' : inscricaoEstadual}
                                            onChange={(e) => { setInscricaoEstadual(e.target.value) }}
                                        />
                                        <InputGroupText addonType="append">
                                            <Input
                                                type='checkbox'
                                                name='isentoInscricaoEstadualCliente'
                                                id='isentoInscricaoEstadualCliente'
                                                style={{ marginRight: 3 }}
                                                onChange={handleChecked}
                                            />
                                            ISENTO
                                        </InputGroupText>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='3'>
                                    <Label for='tipoContribuinteCliente' style={{ fontWeight: 'bold' }}>Tipo de contribuinte </Label>
                                    <Input
                                        type='select'
                                        name='tipoContribuinteCliente'
                                        id='tipoContribuinteCliente'
                                        value={tipoContribuinte}
                                        onChange={(e) => { setTipoContribuinte(e.target.value) }}
                                    >

                                        <option value={0}>Selecione</option>
                                        <option value={1}>Contribuinte ICMS</option>
                                        <option value={2}>Contribuinte ISENTO</option>
                                        <option value={3}>Não contribuinte</option>
                                    </Input>
                                </Col>
                                <Col md='3'>
                                    <Label for='inscricaoMunicipalCliente' style={{ fontWeight: 'bold' }}>Inscrição municipal </Label>
                                    <Input type='text' name='inscricaoMunicipalCliente' id='inscricaoMunicipalCliente' defaultValue={initialValues?.inscricao_municipal} />
                                </Col>
                                <Col md='3'>
                                    <Label for='inscricaoSuframaCliente' style={{ fontWeight: 'bold' }}>Inscrição SUFRAMA </Label>
                                    <Input type='text' name='inscricaoSuframaCliente' id='inscricaoSuframaCliente' defaultValue={initialValues?.inscricao_suframa} />
                                </Col>
                                <Col md='3'>
                                    <Label for='telefoneCliente' style={{ fontWeight: 'bold' }}>Telefone </Label>
                                    <Input type='text' name='telefoneCliente' id='telefoneCliente' defaultValue={initialValues?.telefone} />
                                </Col>
                            </Row>
                        </>
                    }
                    {enderecosCliente?.map((endereco, index) => (
                        <>
                            <Row className='mb-2' key={index}>
                                <Col md='12'>

                                    <Label style={{ fontSize: 20 }}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 20, marginRight: 3 }} />
                                        Endereço</Label>
                                    <Button color='danger' size='sm' onClick={() => handleRemoveEndereco(index)} style={{ float: 'right' }}>
                                        <FontAwesomeIcon icon={faTrash} size="lg" />
                                    </Button>
                                </Col>
                                <Col md='2'>
                                    <Label for='tipoEnderecoCliente' style={{ fontWeight: 'bold' }}>Tipo de endereço </Label><span className='text-danger'>*</span>
                                    <Input required type='select' name='tipoEnderecoCliente' id='tipoEnderecoCliente'
                                        value={endereco.tipo_endereco}
                                        onChange={e => handleEnderecoChange(index, 'tipo_endereco', e.target.value)}
                                    >
                                        <option value='0'>Selecione</option>
                                        <option value='1'>Residencial</option>
                                        <option value='2'>Comercial</option>
                                        <option value='3'>Entrega</option>
                                    </Input>
                                </Col>
                                <Col md='2'>
                                    <Label for='cepCliente' style={{ fontWeight: 'bold' }}>CEP </Label> <span className='text-danger'>*</span>
                                    <InputGroup>

                                        <InputMask
                                            mask="99.999-999"
                                            maskPlaceholder=""
                                            value={endereco.cep}
                                            onChange={e => handleEnderecoChange(index, 'cep', e.target.value)}
                                            onBlur={() => { handleSearchCep() }}
                                        >
                                            {inputProps => (
                                                <Input
                                                    required
                                                    type="text"
                                                    name="cepCliente"
                                                    id="cepCliente"
                                                    {...inputProps}
                                                />
                                            )}
                                        </InputMask>
                                        <InputGroupText addonType="append">
                                            <FontAwesomeIcon icon={faSearch} size="xl" onClick={handleSearchCep} id='searchCep' name='searchCep'
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </InputGroupText>

                                    </InputGroup>
                                    <UncontrolledTooltip placement="top" target="searchCep" style={{ fontSize: 12 }}>
                                        Buscar CEP
                                    </UncontrolledTooltip>
                                </Col>
                                <Col md='6'>
                                    <Label for='logradouroCliente' style={{ fontWeight: 'bold' }}>Logradouro </Label><span className='text-danger'>*</span>
                                    <Input required type='text' name='logradouroCliente' id='logradouroCliente'
                                        value={endereco.rua}
                                        onChange={e => handleEnderecoChange(index, 'rua', e.target.value)}
                                    />
                                </Col>
                                <Col md='2'>
                                    <Label for='numeroCliente' style={{ fontWeight: 'bold' }}>Número </Label><span className='text-danger'>*</span>
                                    <Input required type='text' name='numeroCliente' id='numeroCliente'
                                        value={endereco.numero}
                                        onChange={e => handleEnderecoChange(index, 'numero', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col md='3'>
                                    <Label for='complementoCliente' style={{ fontWeight: 'bold' }}>Complemento </Label>
                                    <Input type='text' name='complementoCliente' id='complementoCliente'
                                        value={endereco.complemento}
                                        onChange={e => handleEnderecoChange(index, 'complemento', e.target.value)}
                                    />
                                </Col>

                                <Col md='3'>
                                    <Label for='bairroCliente' style={{ fontWeight: 'bold' }}>Bairro </Label><span className='text-danger'>*</span>
                                    <Input required type='text' name='bairroCliente' id='bairroCliente'
                                        value={endereco.bairro}
                                        onChange={e => handleEnderecoChange(index, 'bairro', e.target.value)}
                                    />
                                </Col>
                                <Col md='3'>
                                    <Label for='cidadeCliente' style={{ fontWeight: 'bold' }}>Cidade </Label> <span className='text-danger'>*</span>
                                    <Input required type='text' name='cidadeCliente' id='cidadeCliente'
                                        value={endereco.cidade}
                                        onChange={e => handleEnderecoChange(index, 'cidade', e.target.value)}
                                    />
                                </Col>
                                <Col md='3'>
                                    <Label for='estadoCliente' style={{ fontWeight: 'bold' }}>Estado </Label> <span className='text-danger'>*</span>

                                    <Input required type='select' name='estadoCliente' id='estadoCliente'
                                        value={endereco.estado}
                                        onChange={e => handleEnderecoChange(index, 'estado', e.target.value)}
                                    >
                                        <option value='0'>Selecione</option>
                                        {estados.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}

                                    </Input>


                                </Col>


                            </Row>
                        </>

                    ))}
                    <Button color='dark' onClick={handleAddEndereco} className='mb-3'>
                        <FontAwesomeIcon icon={faPlusCircle} size="xl" style={{ marginRight: 3 }} />
                        Adicionar endereço</Button>

                    {contatosCliente.map((contato, index) => (
                        <Row className='mb-2' key={index}>
                            <Col md='12'>
                                <Label style={{ fontSize: 20 }}>
                                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: 20, marginRight: 3 }} />
                                    Contatos</Label>
                                <Button color='danger' size='sm' onClick={() => handleRemoveContato(index)} style={{ float: 'right' }}>
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </Button>
                            </Col>
                            <Col md='4'>
                                <Label for='tipoContatoCliente' style={{ fontWeight: 'bold' }}>Tipo de contato </Label>
                                <Input type='select' name='tipoContatoCliente' id='tipoContatoCliente'
                                    value={contato.tipo_contato}
                                    onChange={e => handleContatoChange(index, 'tipo_contato', e.target.value)}
                                >
                                    <option value='0'>Selecione</option>
                                    <option value='1'>Telefone</option>
                                    <option value='2'>E-mail</option>
                                    <option value='3'>WhatsApp</option>
                                    <option value='4'>Outros</option>
                                </Input>
                            </Col>
                            <Col md='4'>
                                <Label for='nomeContatoCliente' style={{ fontWeight: 'bold' }}>Nome </Label>
                                <Input type='text' name='nomeContatoCliente' id='nomeContatoCliente'
                                    value={contato.nome}
                                    onChange={e => handleContatoChange(index, 'nome', e.target.value)}
                                />
                            </Col>
                            <Col md='4'>
                                <Label for='observacaoContatoCliente' style={{ fontWeight: 'bold' }}>Observação </Label>
                                <Input type='text' name='observacaoContatoCliente' id='observacaoContatoCliente'
                                    value={contato.observacao}
                                    onChange={e => handleContatoChange(index, 'observacao', e.target.value)}
                                />
                            </Col>
                        </Row>
                    ))}
                    <Button color='dark' onClick={handleAddContato} className='mb-3'>
                        <FontAwesomeIcon icon={faPlusCircle} size="xl" style={{ marginRight: 3 }} />
                        Adicionar contato</Button>
                    <Row className='mb-1'>
                        <Col md='12'>
                            <Label style={{ fontSize: 20 }}>
                                <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 20, marginRight: 3 }} />
                                Observações</Label>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md='12'>
                            <Input type='textarea' name='observacaoCliente' id='observacaoCliente'
                                defaultValue={initialValues?.observacao}
                            />

                        </Col>
                    </Row>
                    {/* Buttons Add and Cancel*/}
                    <Row className='mb-2'>
                        <Col md={12}>
                            <Button color='primary' type='submit'
                                {...nameError || tipoClienteError ? { disabled: true } : null}
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
    )
}

export default FormRegister


