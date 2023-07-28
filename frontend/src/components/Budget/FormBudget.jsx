import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'reactstrap'

import CardDadosGerais from './Cards/CardDadosGerais'
import CardTransporte from './Cards/CardTransporte'
import CardTotal from './Cards/CardTotal'
import CardProduto from './Cards/CardProduto'
import CardEnderecoEntrega from './Cards/CardEnderecoEntrega'
import CardPagamento from './Cards/CardPagamento'
import CardObservacao from './Cards/CardObservacao'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomSpinner } from '../CustomSpinner'
import CardProdutoTeste from './Cards/CardProdutoTeste'

const FormBudget = ({ url, handleFormSubmit, loading, initialValues, typeForm }) => {
    //console.log(initialValues)

    // const { createOrder, loading } = useOrder()
    const navigate = useNavigate()
    const idOrder = sessionStorage?.getItem('user') || localStorage?.getItem('user')
    const id = JSON.parse(idOrder).id_empresa
    const id_user = JSON.parse(idOrder).id
    //const [data, setData] = useState([]);
    const [data, setData] = useState(initialValues || {});

    useEffect(() => {
        setData(initialValues)
    }, [initialValues])


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        data.id_empresa = id
        data.id_user = id_user

        await handleFormSubmit(data)
        navigate(url)
    };

    const handleCancel = () => {
        navigate(url)
    }
    return (
        <Form onSubmit={handleSubmit}>
            {
                loading && <CustomSpinner />

            }

            <CardDadosGerais data={data} handleInputChange={handleInputChange} typeForm={typeForm} />

            <CardProduto data={data} handleInputChange={handleInputChange} />
            {/*<CardProdutoTeste data={data} handleInputChange={handleInputChange} />*/}

            <CardTransporte data={data} handleInputChange={handleInputChange} />

            <CardTotal data={data} handleInputChange={handleInputChange} />

            <CardEnderecoEntrega data={data} handleInputChange={handleInputChange} />

            <CardPagamento data={data} handleInputChange={handleInputChange} />

            <CardObservacao data={data} handleInputChange={handleInputChange} />

            <Row className='mb-2'>
                <Col md={12}>
                    <Button color='primary' type='submit'

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
    )
}

export default FormBudget