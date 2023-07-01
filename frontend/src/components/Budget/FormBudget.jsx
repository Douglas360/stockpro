import React, { useState } from 'react'
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
import { useOrder } from '../../context/OrderContext/useOrder'
import { CustomSpinner } from '../CustomSpinner'

const FormBudget = ({ url }) => {
    const { createOrder, loading } = useOrder()
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createOrder(data)
        navigate(url)
        //console.log(data)

    };

    const handleCancel = () => {
        navigate(url)
    }
    return (
        <Form onSubmit={handleSubmit}>
          {
            loading && <CustomSpinner />
          }

            <CardDadosGerais data={data} handleInputChange={handleInputChange} />

            <CardProduto data={data} handleInputChange={handleInputChange} />

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