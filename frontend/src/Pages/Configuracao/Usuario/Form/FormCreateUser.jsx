import React, { useState } from 'react';
import { Card, CardBody, Col, Form, Input, Label, Row, FormFeedback, Button, } from 'reactstrap';
import imgAvatar from '../../../../../../frontend/src/assets/utils/images/avatars/avatarBlank.png';
import { useRegister } from '../../../../context/RegisterContext/useRegister';
import { CustomSpinner } from '../../../../components/CustomSpinner';
import { useNavigate } from 'react-router-dom';

const FormCreateUserGroup = ({ initialValues }) => {
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const { createUser, updateUser, loading } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, email, login, password, ativo } = e.target;
        const data = {
            nome: nome.value,
            email: email.value,
            login: login.value,
            senha: password.value,
            id_empresa: 1,
            avatar: avatarUrl,
            ativo: ativo.checked
        };
        if (!initialValues?.isUpdate) {
            await createUser(data);
        } else {

            await updateUser({ ...data, id: initialValues.id });
        }

        navigate('/configuracao/usuario');

    };

    const handleNameBlur = (e) => {
        const { value } = e.target;
        // Check if the "nome_grupo" field has a size smaller or equal to 5
        if (value.length <= 1) {
            setNameError(true); // Set the error state to true
        } else {
            setNameError(false); // Set the error state to false if the validation passes
        }
    };

    const handleEmailBlur = (e) => {
        const { value } = e.target;
        // Check if the "email" is valid using a regular expression (regex)
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(value)) {
            setEmailError(true); // Set the error state to true
        } else {
            setEmailError(false); // Set the error state to false if the validation passes
        }
    };


    const handlePasswordBlur = (e) => {
        const { value } = e.target;
        // Valid strong password with 8 characters

        if (value.length <= 8) {
            setPasswordError(true); // Set the error state to true
        } else {
            setPasswordError(false); // Set the error state to false if the validation passes
        }
    };
    const handleLoginBlur = (e) => {
        const { value } = e.target;
        // Valid strong password with 8 characters

        if (value.length <= 1) {
            setLoginError(true); // Set the error state to true
        } else {
            setLoginError(false); // Set the error state to false if the validation passes
        }
    };

    const handleFileChange = (e) => {
        setAvatarUrl(null);
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
        } else {
            setUploadProgress(0);
        }
    };
    return (
        <Card className="main-card mb-3">
            {loading && <CustomSpinner />}
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                        <Col md={3}>
                            <Label for="nome">Nome</Label>
                            <Input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Nome"
                                defaultValue={initialValues?.nome || ''}
                                onBlur={handleNameBlur}
                                invalid={nameError}
                                valid={!nameError}
                                required
                            />
                            <FormFeedback>Nome inválido</FormFeedback>
                        </Col>
                        <Col md={3}>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                defaultValue={initialValues?.email || ''}
                                onBlur={handleEmailBlur}
                                invalid={emailError}
                                valid={!emailError}
                                required
                            />
                            <FormFeedback>Email inválido</FormFeedback>
                        </Col>
                        <Col md={3}>
                            <Label for="login">Login</Label>
                            <Input
                                type="text"
                                name="login"
                                id="login"
                                defaultValue={initialValues?.login || ''}
                                onBlur={handleLoginBlur}
                                placeholder="Login"
                                invalid={loginError}
                                valid={!loginError}
                                required
                            />
                            <FormFeedback>Login inválido</FormFeedback>
                        </Col>
                        <Col md={3}>
                            <Label for="password">Senha</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                defaultValue={initialValues?.senha || ''}
                                placeholder="Senha"
                                onBlur={handlePasswordBlur}
                                invalid={passwordError}
                                valid={!passwordError}
                                required
                            />
                            <FormFeedback>Senha inválida - mínimo 7 caracteres</FormFeedback>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={3}>
                            <Label for="cargo">Ativo</Label>
                            <Input
                                type="checkbox"
                                name="ativo"
                                id="ativo"
                                defaultChecked={initialValues?.ativo || false}
                            />

                        </Col>
                    </Row>

                    <Row className='mb-2'>
                        <Col md={3}>
                            <Label for="cargo">Foto do usuario</Label>
                            <Label style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                <span style={{ position: 'absolute', opacity: '0.5', ':hover': { opacity: '1' } }}>
                                    <i className="pe-7s-cloud-upload" style={{ fontSize: '5rem' }}></i>
                                </span>
                                <Input
                                    type="file"
                                    name="avatar"
                                    accept='image/png, image/jpeg'
                                    onChange={handleFileChange}
                                    hidden
                                />
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                ) : (

                                    <img src={imgAvatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />

                                )}
                            </Label>
                        </Col>
                    </Row>
                    <Button type="submit" color="primary">
                        Salvar
                    </Button>


                </Form>
            </CardBody>
        </Card>
    );
};

export default FormCreateUserGroup;
