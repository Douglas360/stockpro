import React, { useCallback, useState } from 'react';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Card, CardBody, Col, Form, FormFeedback, Input, Label, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

// Função de envio simulada (substitua por uma chamada real à API)
const submitForm = async (data) => {
  try {
    // Simulação de chamada à API para salvar os dados no backend
    console.log('Dados enviados:', data);
    alert('Dados enviados com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    alert('Erro ao enviar dados, tente novamente mais tarde.');
  }
};

export const EmpresaJSX = () => {
  const [formValues, setFormValues] = useState({
    tipoCliente: '',
    tipoClienteError: false,
    nameError: false,
    razaoSocialError: false,
    nomeFantasia: '',
    razaoSocial: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    inscrEstadual: '',
    inscrMunicipal: '',
    cnpj: '',
    email: '',
    telefone: '',
    avatar: '',
    ativo: true,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    if (value.trim().length === 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [`${name}Error`]: true,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [`${name}Error`]: false,
      }));
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Verificar se há erros antes de enviar os dados
    const hasErrors = Object.keys(formValues).some((key) => key.endsWith('Error') && formValues[key]);
    if (hasErrors) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    // Enviar os dados para a API (simulação)
    submitForm(formValues);
  }, [formValues]);

  return (
    <>
      <PageTitle
        heading="Dados da Empresa"
        subheading="Dados da empresa cadastrados no sistema."
        icon="lnr lnr-briefcase icon-gradient bg-amy-crisp"
      />
      <Card className="main-card mb-3">
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Col md='12'>
                <Label for='codigo' style={{ fontSize: 20 }}>
                  <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20, marginRight: 3 }} />
                  Dados gerais
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md='4'>
                <Label style={{ fontWeight: 'bold' }}>Tipo </Label><span className='text-danger'>*</span>
                <Input
                  required
                  type='select'
                  name='tipoCliente'
                  id='tipo_cliente'
                  value={formValues.tipoCliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={formValues.tipoClienteError}
                  valid={!formValues.tipoClienteError}
                >
                  <option value=''>Selecione</option>
                  <option value='Pessoa Fisica'>Pessoa Física</option>
                  <option value='Pessoa Juridica' >Pessoa Jurídica</option>
                </Input>
                <FormFeedback>
                  {formValues.tipoClienteError && `Tipo é obrigatório`}
                </FormFeedback>
              </Col>
              <Col md='4'>
                <Label for='nomeFantasia' style={{ fontWeight: 'bold' }}>Nome fantasia</Label><span className='text-danger'>*</span>
                <Input
                  required
                  type='text'
                  name='nomeFantasia'
                  id='nome'
                  value={formValues.nomeFantasia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={formValues.nameError}
                  valid={!formValues.nameError}
                />
                <FormFeedback>
                  {formValues.nameError && `Nome fantasia é obrigatório`}
                </FormFeedback>
              </Col>
              <Col md='4'>
                <Label for='razaoSocial' style={{ fontWeight: 'bold' }}>Razão social</Label><span className='text-danger'>*</span>
                <Input
                  required
                  type='text'
                  name='razaoSocial'
                  id='nome'
                  value={formValues.razaoSocial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={formValues.razaoSocialError}
                  valid={!formValues.razaoSocialError}
                />
                <FormFeedback>
                  {formValues.razaoSocialError && `Razão social é obrigatório`}
                </FormFeedback>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md='4'>
                <Label for='cnpj' style={{ fontWeight: 'bold' }}>CNPJ</Label><span className='text-danger'>*</span>
                <Input
                  required
                  type='text'
                  name='cnpj'
                  id='cnpj'
                  value={formValues.cnpj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={formValues.cnpjError}
                  valid={!formValues.cnpjError}
                />
                <FormFeedback>
                  {formValues.cnpjError && `CNPJ é obrigatório`}
                </FormFeedback>
              </Col>
              <Col md='4'>
                <Label for='inscrEstadual' style={{ fontWeight: 'bold' }}>Inscrição Estadual</Label>
                <Input
                  type='text'
                  name='inscrEstadual'
                  id='inscr_estadual'
                  value={formValues.inscrEstadual}
                  onChange={handleChange}
                />
              </Col>
              <Col md='4'>
                <Label for='inscrMunicipal' style={{ fontWeight: 'bold' }}>Inscrição Municipal</Label>
                <Input
                  type='text'
                  name='inscrMunicipal'
                  id='inscr_Municipal'
                  value={formValues.inscrMunicipal}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {/* Endereço */}
            <Row className='mb-3'>
              <Col md='12'>
                <Label for='codigo' style={{ fontSize: 20 }}>
                  <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20, marginRight: 3 }} />
                  Endereço
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md='3'>
                <Label for='cep' style={{ fontWeight: 'bold' }}>CEP</Label>
                <Input
                  type='text'
                  name='cep'
                  id='cep'
                  value={formValues.cep}
                  onChange={handleChange}
                />
              </Col>
              <Col md='4'>
                <Label for='logradouro' style={{ fontWeight: 'bold' }}>Logradouro</Label>
                <Input
                  type='text'
                  name='logradouro'
                  id='logradouro'
                  value={formValues.logradouro}
                  onChange={handleChange}
                />
              </Col>
              <Col md='2'>
                <Label for='numero' style={{ fontWeight: 'bold' }}>Número</Label>
                <Input
                  type='text'
                  name='numero'
                  id='numero'
                  value={formValues.numero}
                  onChange={handleChange}
                />
              </Col>
              <Col md='3'>
                <Label for='complemento' style={{ fontWeight: 'bold' }}>Complemento</Label>
                <Input
                  type='text'
                  name='complemento'
                  id='complemento'
                  value={formValues.complemento}
                  onChange={handleChange}
                />
              </Col>

            </Row>
            <Row className='mb-3'>

              <Col md='4'>
                <Label for='bairro' style={{ fontWeight: 'bold' }}>Bairro</Label>
                <Input
                  type='text'
                  name='bairro'
                  id='bairro'
                  value={formValues.bairro}
                  onChange={handleChange}
                />
              </Col>
              <Col md='4'>
                <Label for='cidade' style={{ fontWeight: 'bold' }}>Cidade</Label>
                <Input
                  type='text'
                  name='cidade'
                  id='cidade'
                  value={formValues.cidade}
                  onChange={handleChange}
                />
              </Col>
              <Col md='4'>
                <Label for='estado' style={{ fontWeight: 'bold' }}>Estado</Label>
                <Input
                  type='text'
                  name='estado'
                  id='estado'
                  value={formValues.estado}
                  onChange={handleChange}
                />
              </Col>

            </Row>

            {/* Contato */}
            <Row className='mb-3'>
              <Col md='12'>

                <Label style={{ fontSize: 20 }}>
                  <FontAwesomeIcon icon={faPhone} style={{ fontSize: 20, marginRight: 3 }} />
                  Contato</Label>

              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label for='email' style={{ fontWeight: 'bold' }}>Email</Label><span className='text-danger'>*</span>
                <Input
                  required
                  type='email'
                  name='email'
                  id='email'
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={formValues.emailError}
                  valid={!formValues.emailError}
                />
                <FormFeedback>
                  {formValues.emailError && `Email é obrigatório`}
                </FormFeedback>
              </Col>
              <Col md='6'>
                <Label for='telefone' style={{ fontWeight: 'bold' }}>Telefone</Label>
                <Input
                  type='text'
                  name='telefone'
                  id='telefone'
                  value={formValues.telefone}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>

              <Col md='4'>
                <Label for='avatar' style={{ fontWeight: 'bold' }}>Avatar</Label>
                <Input
                  type='text'
                  name='avatar'
                  id='avatar'
                  value={formValues.avatar}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col md='12'>
                <Button color='primary' type='submit'>Salvar</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}
