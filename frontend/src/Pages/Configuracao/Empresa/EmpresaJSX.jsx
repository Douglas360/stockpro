import React, { useCallback, useEffect, useState } from 'react';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { Card, CardBody, Col, Form, FormFeedback, Input, Label, Row, Button, Progress } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { CustomSpinner } from '../../../components/CustomSpinner';
import { useAuth } from '../../../context/AuthContext/useAuth';


export const EmpresaJSX = () => {
  const { listCompany, updateCompany, loading } = useRegister();
  const { user } = useAuth();
  const [company, setCompany] = useState();
  const idCompany = user?.id_empresa
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(-1);


  const loadCompany = async () => {
    const response = await listCompany(idCompany);
    setCompany(response);

    // Set the initial form values here after fetching the company data
    setFormValues({

      tipoCliente: 'Pessoa Fisica',
      tipoClienteError: false,
      nameError: false,
      razaoSocialError: false,
      nomeFantasia: response?.nome_fantasia,
      razaoSocial: response?.nome,
      logradouro: response?.logradouro,
      numero: response?.numero,
      complemento: response?.complemento,
      bairro: response?.bairro,
      cidade: response?.cidade,
      estado: response?.estado,
      cep: response?.cep,
      inscrEstadual: response.inscr_estadual,
      inscrMunicipal: '',
      cnpj: response?.cnpj,
      email: response?.email,
      telefone: response?.telefone,
      avatar: response?.avatar,
      ativo: true,
    });
  };
  useEffect(() => {
    if (idCompany) {
      loadCompany();
    }

  }, [idCompany]);

  const [formValues, setFormValues] = useState({

    tipoCliente: '',
    tipoClienteError: false,
    nameError: false,
    razaoSocialError: false,
    nomeFantasia: company?.nome_fantasia,
    razaoSocial: company?.nome,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: company?.estado,
    cep: '',
    inscrEstadual: '',
    inscrMunicipal: '',
    cnpj: '',
    email: '',
    telefone: '',
    file: null,
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    // Verificar se há erros antes de enviar os dados
    const hasErrors = Object.keys(formValues).some((key) => key.endsWith('Error') && formValues[key]);
    if (hasErrors) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }
    form.append('nome', form.get('razaoSocial'));
    form.append('nome_fantasia', form.get('nomeFantasia'));
    form.append('inscr_estadual', form.get('inscrEstadual'));
    form.append('file', formValues.file);

    // Enviar os dados para a API 
    await updateCompany(idCompany, form)

  }, [formValues]);

  const handleFileChange = useCallback((e) => {
    setAvatarUrl(null)
    setUploadProgress(-1);
    const file = e.target.files[0];
    setAvatarUrl(URL.createObjectURL(file));

    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      };
      reader.onloadend = () => setUploadProgress(100);
      reader.readAsDataURL(file);
      setFormValues((prevValues) => ({
        ...prevValues,
        file: file, // Set the 'file' property to the selected file
      }));
    } else {
      setUploadProgress(0);
      setFormValues((prevValues) => ({
        ...prevValues,
        file: null, // If no file is selected, set the 'avatar' property to null
      }));
    }

    e.target.value = '';
  }, []);

  return (
    <>
      {loading && <CustomSpinner />}
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
                  <option value='Pessoa Fisica' selected>Pessoa Física</option>
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
            <Row className='mb-3'>
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
                <Label for='file' style={{ fontWeight: 'bold' }}>Logo da empresa</Label>
                <Label style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft: 20, marginTop: 20 }}>
                  <span style={{ position: 'absolute', opacity: '0.5', ':hover': { opacity: '1' } }}>
                    <i className="pe-7s-cloud-upload" style={{ fontSize: '3rem' }}></i>
                  </span>
                  <Input
                    type='file'
                    name='file'
                    accept="image/png, image/jpeg"
                    id='file'

                    onChange={handleFileChange}
                    hidden
                  />
                  <Input type="file" name="file" hidden />
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    company?.avatar ? (
                      <img src={company.avatar} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      <span></span>
                    )
                  )}
                </Label>
                {uploadProgress >= 0 && (
                  <div className="mt-1 w-3/4">
                    <Progress animated color='success' value={uploadProgress}>
                      {uploadProgress}%
                    </Progress>

                  </div>
                )}

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
