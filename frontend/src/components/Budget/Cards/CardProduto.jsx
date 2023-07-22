import React, { useCallback, useEffect, useState } from 'react'
import { faBox, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, Col, Input, InputGroup, Label, Row, Table, UncontrolledTooltip } from 'reactstrap'
import { useProduct } from '../../../context/ProductContext/useProduct'


const CardProduto = ({ data, handleInputChange }) => {

  const { listProducts } = useProduct()
  const [products, setProducts] = useState([])
  const [produtos, setProdutos] = useState([{ numero_item: 1, produto: '', quantidade: '', tipo: '1', valor: '', desconto: '', subtotal: '' }])
  const [stockQuantities, setStockQuantities] = useState({});
  const [typeDiscount, setTypeDiscount] = useState({}); // State to store the discount type (R$ or %) for each product
  const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user')
  const id = JSON.parse(idEmpresa).id_empresa

  const loadProducts = useCallback(async () => {
    const response = await listProducts(id);
    setProducts(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Include 'id' and 'listProducts' in the dependency array


  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]); // Add loadProducts to the dependency array

  /*useEffect(() => {
    setProdutos(
      data?.produtos || [{ numero_item: 1, produto: '', quantidade: '', tipo: '1', valor: '', desconto: '', subtotal: '' }]);

  }, [data?.produtos]);*/

  const tipoVenda = [
    { id: 1, tipo: 'Venda' },
    { id: 2, tipo: 'Troca' },
    { id: 3, tipo: 'Devolução' },
    { id: 4, tipo: 'Bonificação' },
    { id: 5, tipo: 'Amostra' },
    { id: 6, tipo: 'Outros' }
  ]

  const handleAddField = () => {
    setProdutos(prevProdutos => [...prevProdutos, { numero_item: prevProdutos.length + 1, produto: '', quantidade: '', tipo: '', valor: '', desconto: '', subtotal: '' }]);
  };

  /*const handleFieldChange = (index, field, value) => {
    const updatedFields = [...produtos]
    updatedFields[index][field] = value
    setProdutos(updatedFields)

    // Update the data object
    const updatedData = { ...data }
    updatedData.produtos = updatedFields
    handleInputChange({ target: { name: 'produtos', value: updatedFields } })

    if (field === 'produto') {
      const selectedProduct = products.find((product) => product.id_produto === parseInt(value, 10));
      if (selectedProduct) {
        updatedFields[index].valor = selectedProduct.valor_venda
        updatedFields[index].quantidade = '1' // Set the quantity as 1
        updatedFields[index].subtotal = selectedProduct.valor_venda // Set the subtotal
        updatedFields[index].tipo = '1' // Set the type
        setStockQuantities({ ...stockQuantities, [index]: selectedProduct.estoque[0].quantidade }); // Set the stock quantity
      }
    }
  }*/

  const handleFieldChange = (index, field, value) => {
    setProdutos(prevProdutos => {
      const updatedFields = [...prevProdutos];
      updatedFields[index][field] = value;

      if (field === 'produto') {
        const selectedProduct = products.find(product => product.id_produto === parseInt(value, 10));
        if (selectedProduct) {
          updatedFields[index].valor = selectedProduct.valor_venda;
          updatedFields[index].quantidade = '1'; // Set the quantity as 1
          updatedFields[index].subtotal = selectedProduct.valor_venda; // Set the subtotal
          updatedFields[index].tipo = '1'; // Set the type
          setStockQuantities(prevStockQuantities => ({ ...prevStockQuantities, [index]: selectedProduct.estoque[0]?.quantidade || 0 })); // Set the stock quantity
        }
      }

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;
      handleInputChange({ target: { name: 'produtos', value: updatedFields } });

      return updatedFields;
    });
  };

  /*const handleRemoveField = (index) => {
    const updatedFields = [...produtos]
    updatedFields.splice(index, 1)
    setProdutos(updatedFields)
  }*/
  const handleRemoveField = (index) => {
    setProdutos(prevProdutos => {
      const updatedFields = [...prevProdutos];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  /*const handleQuantityChange = (index, value) => {
    const updatedFields = [...produtos]
    updatedFields[index].quantidade = value
    updatedFields[index].subtotal = value * updatedFields[index].valor
    setProdutos(updatedFields)

    // Update the data object
    const updatedData = { ...data }
    updatedData.produtos = updatedFields
    handleInputChange({ target: { name: 'produtos', value: updatedFields } })
  }*/
  const handleQuantityChange = (index, value) => {
    setProdutos(prevProdutos => {
      const updatedFields = [...prevProdutos];
      updatedFields[index].quantidade = value;
      updatedFields[index].subtotal = value * updatedFields[index].valor;

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;
      handleInputChange({ target: { name: 'produtos', value: updatedFields } });

      return updatedFields;
    });
  };

  /* const handleDiscountChange = (index, value) => {
     const updatedFields = [...produtos]
     updatedFields[index].desconto = value
 
 
     if (!typeDiscount[index] || typeDiscount[index] === 'R$') { // Check if no type is selected or if the selected type is R$
       // Apply discount by subtracting the value directly
       updatedFields[index].subtotal = updatedFields[index].quantidade * updatedFields[index].valor - value
     } else if (typeDiscount[index] === '%') {
       // Apply discount as a percentage of the total
       const discount = (updatedFields[index].quantidade * updatedFields[index].valor * value) / 100
       updatedFields[index].subtotal = updatedFields[index].quantidade * updatedFields[index].valor - discount
     }
 
     setProdutos(updatedFields)
 
     // Update the data object
     const updatedData = { ...data }
     updatedData.produtos = updatedFields
     handleInputChange({ target: { name: 'produtos', value: updatedFields } })
   }*/
  const handleDiscountChange = (index, value) => {
    setProdutos(prevProdutos => {
      const updatedFields = [...prevProdutos];
      updatedFields[index].desconto = value;

      if (!typeDiscount[index] || typeDiscount[index] === 'R$') { // Check if no type is selected or if the selected type is R$
        // Apply discount by subtracting the value directly
        updatedFields[index].subtotal = updatedFields[index].quantidade * updatedFields[index].valor - value;
      } else if (typeDiscount[index] === '%') {
        // Apply discount as a percentage of the total
        const discount = (updatedFields[index].quantidade * updatedFields[index].valor * value) / 100;
        updatedFields[index].subtotal = updatedFields[index].quantidade * updatedFields[index].valor - discount;
      }

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;
      handleInputChange({ target: { name: 'produtos', value: updatedFields } });

      return updatedFields;
    });
  };

  /*  const handleValueChange = (index, value) => {
      const updatedFields = [...produtos]
      updatedFields[index].valor = value
      updatedFields[index].subtotal = updatedFields[index].quantidade * value - updatedFields[index].desconto
      setProdutos(updatedFields)
  
      // Update the data object
      const updatedData = { ...data }
      updatedData.produtos = updatedFields
      handleInputChange({ target: { name: 'produtos', value: updatedFields } })
    }*/
  const handleValueChange = (index, value) => {
    setProdutos(prevProdutos => {
      const updatedFields = [...prevProdutos];
      updatedFields[index].valor = value;
      updatedFields[index].subtotal = updatedFields[index].quantidade * value - updatedFields[index].desconto;

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;
      handleInputChange({ target: { name: 'produtos', value: updatedFields } });

      return updatedFields;
    });
  };
  /*const handleDiscountTypeChange = (index, value) => {
    const updatedTypes = { ...typeDiscount }
    updatedTypes[index] = value || 'R$'
    setTypeDiscount(updatedTypes)
    handleDiscountChange(index, produtos[index].desconto)
  }*/
  const handleDiscountTypeChange = (index, value) => {
    setTypeDiscount(prevTypeDiscount => {
      const updatedTypes = { ...prevTypeDiscount };
      updatedTypes[index] = value || 'R$';
      handleDiscountChange(index, produtos[index].desconto);
      return updatedTypes;
    });
  };

  // Function to change the background color of the tooltip based on the stock quantity of the product selected
  const getTooltipColor = (stockQuantity) => {
    if (stockQuantity <= 1) {
      return 'red'
    } else if (stockQuantity > 1 && stockQuantity <= 3) {
      return 'orange'
    } else {
      return 'green'
    }
  }

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md='12'>
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon icon={faBox} style={{ fontSize: 20, marginRight: 3 }} />
              Produtos
            </Label>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Produto <span className='text-danger'>*</span></th>
              <th style={{ width: '8%' }}>Quant. <span className='text-danger'>*</span></th>
              <th>Tipo <span className='text-danger'>*</span></th>
              <th>Valor <span className='text-danger'>*</span></th>
              <th>Desconto</th>
              <th>Subtotal</th>
              <th>Ação</th>
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
                    //value={produto.produto}                 
                    onChange={(e) => handleFieldChange(index, 'produto', e.target.value)}
                  >

                    <option value=''>Selecione</option>

                    {products?.map((product, innerIndex) => (

                      // Check if the product has in stock quantity and if it is greater than 0 to show it in the list of products to select from the dropdown list
                      <option key={product.id_produto} value={product.id_produto}>

                        {product.nome}
                      </option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    required
                    type='number'
                    name='quantidade'
                    value={produto.quantidade}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    id={`quantidade-${index}`}
                  />

                  {produto.produto && (
                    <UncontrolledTooltip
                      placement="bottom"
                      target={`quantidade-${index}`}
                      style={{ backgroundColor: getTooltipColor(stockQuantities[index]), color: 'white', fontSize: '12px' }}
                    >
                      <Label>
                        Quantidade em estoque: {stockQuantities[index]}
                      </Label>
                    </UncontrolledTooltip>
                  )}
                </td>
                <td>
                  <Input
                    required
                    type='select'
                    name='tipo'
                    value={produto.tipo}
                    onChange={(e) => handleFieldChange(index, 'tipo', e.target.value)}
                  >
                    <option value=''>Selecione</option>
                    {tipoVenda.map((tipo, innerIndex) => (
                      <option key={innerIndex} value={tipo.id}>{tipo.tipo}</option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    required
                    type='number'
                    name='valor'
                    value={produto.valor}

                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup>
                    <Input
                      type='number'
                      name='desconto'
                      value={produto.desconto}
                      placeholder='0,00'
                      onChange={(e) => handleDiscountChange(index, e.target.value)}
                      style={{ width: '58%' }}
                    />
                    <Input
                      type='select'
                      name='tipo_desconto'
                      value={typeDiscount[index]}
                      onChange={(e) => handleDiscountTypeChange(index, e.target.value)}
                      style={{ width: '42%' }}
                    >
                      <option value='R$'>R$</option>
                      <option value='%'>%</option>
                    </Input>
                  </InputGroup>
                </td>
                <td>
                  <Input
                    type='number'
                    name='subtotal'
                    value={parseFloat(produto?.subtotal).toFixed(2)}
                    onChange={(e) => handleFieldChange(index, 'subtotal', e.target.value)}
                  />
                </td>
                <td>
                  <Button color='danger' onClick={() => handleRemoveField(index)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button color='primary' onClick={handleAddField}>
          <FontAwesomeIcon icon={faPlus} size='xl' style={{ marginRight: 3 }} />
          Adicionar produto
        </Button>
        <br />
        <br />
      </CardBody>
    </Card>
  )
}

export default CardProduto
