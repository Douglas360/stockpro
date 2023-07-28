import React, { useCallback, useEffect, useState } from 'react'
import { useProduct } from '../../../context/ProductContext/useProduct'

import { Input, InputGroup, Table } from 'reactstrap'
import { getFormatterInputPrice } from '../../../functions/getFormatterInputPrice'

const CardProdutoTeste = ({ data }) => {
    //console.log(data.produtos)

    const [produtos, setProdutos] = useState([{ numero_item: 1, produto: '', quantidade: '', tipo: '1', valor: '', desconto: '', subtotal: '' }])
    const [products, setProducts] = useState([])
    const { listProducts } = useProduct()
    const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user')
    const id = JSON.parse(idEmpresa).id_empresa

    const loadProducts = useCallback(async () => {
        const response = await listProducts(id)
        setProducts(response.map((product) => (
            <option key={product.id_produto} value={product.id_produto}>{product.nome}</option>
        )))

    }, [id, listProducts])


    useEffect(() => {
        loadProducts()
        if (data?.produtos?.length) {
            setProdutos(
                data.produtos.map((produto, index) => ({
                    numero_item: index + 1,
                    produto: produto.produto,
                    quantidade: produto.quantidade,
                    tipo: produto.tipo,
                    valor: produto.valor_unitario,
                    desconto: produto.desconto,
                    subtotal: produto.valor_total,
                }))
            );

        }
    }, [data?.produtos]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th style={{ width: '20%' }}>Produto <span className='text-danger'>*</span></th>
                    <th style={{ width: '8%' }}>Quant. <span className='text-danger'>*</span></th>
                    <th>Tipo <span className='text-danger'>*</span></th>
                    <th>Valor <span className='text-danger'>*</span></th>
                    <th>Desconto</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto, index) => (
                    <tr key={index}>
                        <td>
                            <Input
                                required
                                type='select'
                                name='produto'
                                value={produto.produto.nome}
                            >
                                <option key={produto.produto.id_produto} value={produto.produto.id_produto}>{produto.produto.nome}</option>
                                {products}

                            </Input>


                        </td>
                        <td>
                            <Input
                                required
                                type='number'
                                name='quantidade'
                                value={produto.quantidade}
                                //onChange={(e) => handleQuantityChange(index, e.target.value)}
                                id={`quantidade-${index}`}
                            />


                        </td>
                        <td>
                            <Input
                                required
                                type='select'
                                name='tipo'
                                value={produto.tipo}
                            //onChange={(e) => handleFieldChange(index, 'tipo', e.target.value)}
                            >
                                <option value=''>Selecione</option>
                                <option value='1'>Venda</option>
                                <option value='2'>Orçamento</option>

                            </Input>
                        </td>
                        <td>
                            <Input
                                required
                                type='text'
                                name='valor'
                                value={getFormatterInputPrice(produto.valor)}

                            //onChange={(e) => handleValueChange(index, e.target.value)}
                            />
                        </td>
                        <td>
                            <InputGroup>
                                <Input
                                    type='number'
                                    name='desconto'
                                    value={produto.desconto}
                                    placeholder='0,00'
                                    //onChange={(e) => handleDiscountChange(index, e.target.value)}
                                    style={{ width: '58%' }}
                                />
                                <Input
                                    type='select'
                                    name='tipo_desconto'
                                    //value={typeDiscount[index]}
                                    //onChange={(e) => handleDiscountTypeChange(index, e.target.value)}
                                    style={{ width: '42%' }}
                                >
                                    <option value='R$'>R$</option>
                                    <option value='%'>%</option>
                                </Input>
                            </InputGroup>
                        </td>
                        <td>
                            <Input
                                type='text'
                                name='subtotal'
                                value={getFormatterInputPrice(produto.subtotal)}
                            //onChange={(e) => handleFieldChange(index, 'subtotal', e.target.value)}
                            />
                        </td>

                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default CardProdutoTeste