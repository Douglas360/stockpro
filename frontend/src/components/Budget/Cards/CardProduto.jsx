import { useCallback, useEffect, useState } from "react";
import { faBox, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useProduct } from "../../../context/ProductContext/useProduct";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { NumericFormat } from "react-number-format";
import Select from "react-select"
import { cleanCurrencyMask } from "../../../functions/cleanCurrencyMask";
import { useOrder } from "../../../context/OrderContext/useOrder";

const CardProduto = ({ data, handleInputChange, isEditMode }) => {
  const { listProducts } = useProduct();
  const { user } = useAuth();

  const { listTypeSale } = useOrder()


  const [tipoVenda, setTipoVenda] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProdutos, setSelectedProdutos] = useState([]);
  const [produtos, setProdutos] = useState([
    {
      numero_item: 1,
      produto: '',
      nome: '',
      quantidade: '',
      id_tipo_venda: '',
      valor_unitario: '',
      tipo_desconto: "R$",
      desconto: '',
      subtotal: '',
    },
  ]);
  const [totalValue, setTotalValue] = useState()
  const [stockQuantities, setStockQuantities] = useState({});

  const idCompany = user?.id_empresa;

  const loadProducts = useCallback(async () => {
    const response = await listProducts(idCompany);
    const responseTypeSale = await listTypeSale();
    setProducts(response);
    setTipoVenda(responseTypeSale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]);

  useEffect(() => {
    if (idCompany) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]); // Add loadProducts to the dependency <array></array>

  const handleAddField = () => {
    setProdutos((prevProdutos) => [
      ...prevProdutos,
      {
        //numero_item: prevProdutos.length + 1,
        numero_item: prevProdutos.length > 0 ? prevProdutos[prevProdutos.length - 1].numero_item + 1 : 1,
        produto: '',
        nome: '',
        quantidade: '',
        id_tipo_venda: '',
        valor_unitario: '',
        tipo_desconto: "R$",
        desconto: '',
        subtotal: '',
      },
    ]);
  };

  const handleFieldChange = (index, field, value) => {


    setProdutos((prevProdutos) => {
      const updatedFields = [...prevProdutos];
      updatedFields[index][field] = value;

      if (field === "id_produto") {
        const selectedProduct = products.find(
          (product) => product.id_produto === parseInt(value, 10)
        );

        if (selectedProduct) {


          updatedFields[index].nome = selectedProduct.nome

          updatedFields[index].valor_unitario = selectedProduct.valor_venda || 0;

          updatedFields[index].quantidade = 1;

          updatedFields[index].subtotal = selectedProduct.valor_venda;

          updatedFields[index].id_tipo_venda = "1";

          setStockQuantities((prevStockQuantities) => ({
            ...prevStockQuantities,
            [index]: selectedProduct.estoque[0]?.quantidade || 0,
          }));
        }
      }


      handleInputChange({ target: { name: "produtos", value: produtos } });

      return produtos;
    });

  };


  /*const handleRemoveField = (index) => {
    setProdutos((prevProdutos) => {
      /*const updatedFields = [...prevProdutos];
      updatedFields.splice(index, 1);
      return updatedFields;

      // Remove the product at the specified index
      const updatedFields = [...prevProdutos];
      const removedProduct = updatedFields.splice(index, 1)[0];

      // Calculate the new total value
      const newTotalValue = calculateTotalValue(updatedFields);

      // Update the data object with the updated products
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;

      // Update the state with the new products and total value
      handleInputChange({ target: { name: "produtos", value: updatedFields } });
      setTotalValue(newTotalValue); // You need to define and update the total value state

      return updatedFields;
    });
  };*/

  const handleRemoveField = (index) => {
   
    setProdutos((prevProdutos) => {
      // Remove the product at the specified index
      const updatedFields = prevProdutos.filter((_, i) => i !== index);

      // Update the numbers of items
      const updatedFieldsWithNumbers = updatedFields.map((item, i) => ({
        ...item,
        numero_item: i + 1,
      }));

      // Calculate the new total value
      const newTotalValue = calculateTotalValue(updatedFieldsWithNumbers);

      // Update the state with the new products and total value
      handleInputChange({ target: { name: 'produtos', value: updatedFieldsWithNumbers } });
      setTotalValue(newTotalValue); // You need to define and update the total value state
    
      return updatedFieldsWithNumbers;
    });
  };
  const calculateTotalValue = (produtos) => {
    let totalValue = 0;
    for (const produto of produtos) {
      // Calculate the subtotal for each product and add it to the total
      totalValue += calculaDesconto(produto);
    }
    return totalValue;
  };

  const handleQuantityChange = (index, value) => {
    setProdutos((produtos) => {
      const produtoAtualizado = {
        ...produtos[index],
        subtotal: +produtos[index].valor_unitario * +value,
        quantidade: value,
      };

      const produtosAtualizados = [...produtos];
      produtosAtualizados.splice(index, 1, produtoAtualizado);

      handleInputChange({
        target: { name: "produtos", value: produtosAtualizados },
      });
      return produtosAtualizados;
    });
  };

  const handleDiscountChange = (index, originValue) => {
    const value = cleanCurrencyMask(originValue);

    setProdutos((prevProdutos) => {
      const updatedFields = [...prevProdutos];
      updatedFields[index].desconto = value;

      if (
        !produtos[index].tipo_desconto ||
        produtos[index].tipo_desconto === "R$"
      ) {
        updatedFields[index].subtotal =
          updatedFields[index].quantidade *
          updatedFields[index].valor_unitario -
          value;
      } else if (produtos[index].tipo_desconto === "%") {
        // Apply discount as a percentage of the total
        const discount =
          (updatedFields[index].quantidade *
            updatedFields[index].valor_unitario *
            originValue) /
          100;
        updatedFields[index].subtotal =
          updatedFields[index].quantidade *
          updatedFields[index].valor_unitario -
          discount;
      }

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;
      handleInputChange({ target: { name: "produtos", value: updatedFields } });

      return updatedFields;
    });
  };

  const handleValueChange = (index, value) => {
    const formatedValue = cleanCurrencyMask(value);
    setProdutos((prevProdutos) => {
      const updatedFields = [...prevProdutos];
      updatedFields[index].valor_unitario = formatedValue;
      updatedFields[index].subtotal =
        updatedFields[index].quantidade * formatedValue -
        updatedFields[index].desconto;

      // Update the data object
      const updatedData = { ...data };
      updatedData.produtos = updatedFields;

      handleInputChange({
        target: { name: "produtos", value: updatedFields },
      });

      // handleInputChange({ target: { name: "produtos", value: produtos } });

      return updatedFields;
    });
  };

  const handleDiscountTypeChange = (index, value) => {
    setProdutos((prevProdutos) => {
      const updatedFields = [...prevProdutos];

      updatedFields[index].tipo_desconto = value;

      handleDiscountChange(index, produtos[index].desconto);
      return updatedFields;
    });
  };

  // Function to change the background color of the tooltip based on the stock quantity of the product selected
  const getTooltipColor = (stockQuantity) => {
    if (stockQuantity <= 1) {
      return "red";
    } else if (stockQuantity > 1 && stockQuantity <= 3) {
      return "orange";
    } else {
      return "green";
    }
  };

  const calculaDesconto = (item) => {
    if (item.tipo_desconto === "R$") {
      return item.valor_unitario * item.quantidade - (item.desconto || 0);
    } else {
      return (
        item.valor_unitario * item.quantidade -
        (item.valor_unitario * item.quantidade * item.desconto) / 100
      );
    }
  };

  useEffect(() => {
    if (isEditMode) {
      if (data && data.produtos && data.produtos.length > 0) {
        const formatedProducts = data.produtos.map((item) => {
          return {
            nome: item.produto?.nome ? item.produto.nome : item.nome,
            numero_item: item.numero_item,
            id_produto: item.id_produto,
            quantidade: item.quantidade,
            id_tipo_venda: +item.id_tipo_venda,
            desconto: item.desconto || 0,
            tipo_desconto: item.tipo_desconto || "R$",
            valor_unitario: item.valor_unitario,
            subtotal: calculaDesconto(item),
          };
        });
        setProdutos(formatedProducts);
      }
    }
  }, [data]);



  const handleProdutoChange = (selectedOption, index) => {
    const updatedSelectedProdutos = [...selectedProdutos];
    updatedSelectedProdutos[index] = selectedOption;
    setSelectedProdutos(updatedSelectedProdutos);
    handleFieldChange(index, "id_produto", selectedOption.value);
  };

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md="12">
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon
                icon={faBox}
                style={{ fontSize: 20, marginRight: 3 }}
              />
              Produtos
            </Label>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "6%" }}>
                Item
              </th>
              <th style={{ width: "25%" }}>
                Produto <span className="text-danger">*</span>
              </th>
              <th style={{ width: "8%" }}>
                Quant. <span className="text-danger">*</span>
              </th>
              <th>
                Tipo <span className="text-danger">*</span>
              </th>
              <th>
                Valor <span className="text-danger">*</span>
              </th>
              <th>Desconto</th>
              <th>Subtotal</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {produtos?.map((produto, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Input
                      disabled
                      value={produto.numero_item}
                    />

                  </td>
                  <td>
                    <Select
                      value={isEditMode ? [{ value: produto.numero_item, label: produto.nome }]
                        : selectedProdutos[index]}
                      onChange={(selectedOption) => handleProdutoChange(selectedOption, index)}
                      options={products?.map(product => ({ value: product.id_produto, label: product.nome }))}
                      noOptionsMessage={() => "Nenhum registro encontrado"}
                      placeholder="Selecione o produto"
                    />
                  </td>
                  <td>
                    <Input
                      required
                      type="number"
                      name="quantidade"
                      value={produto.quantidade}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      id={`quantidade-${index}`}
                    />
                    {produto && (
                      <UncontrolledTooltip
                        placement="bottom"
                        target={`quantidade-${index}`}
                        style={{
                          backgroundColor: getTooltipColor(
                            stockQuantities[index]
                          ),
                          color: "white",
                          fontSize: "12px",
                        }}
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
                      type="select"
                      name="id_tipo_venda"
                      value={produto.id_tipo_venda}
                      onChange={(e) =>
                        handleFieldChange(index, "id_tipo_venda", e.target.value)
                      }
                    >
                      <option value="">Selecione</option>
                      {tipoVenda.map((tipo, innerIndex) => (
                        <option key={innerIndex} value={tipo.id_tipo_venda}>
                          {tipo.descricao}
                        </option>
                      ))}
                    </Input>
                  </td>
                  <td>
                    <NumericFormat
                      className="form-control"
                      name="valor"
                      required={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowNegative={false}
                      value={produto.valor_unitario}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                    />
                  </td>

                  <td>
                    <InputGroup>
                      {produto.tipo_desconto === "R$" ? (
                        <NumericFormat
                          style={{ width: "50%" }}
                          className="form-control"
                          name="desconto"
                          required={false}
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="R$ "
                          decimalScale={2}
                          fixedDecimalScale={true}
                          allowNegative={false}
                          value={produto.desconto}
                          onChange={(e) =>
                            handleDiscountChange(index, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          type="number"
                          name="desconto"
                          value={produto.desconto}
                          placeholder="0,00"
                          onChange={(e) =>
                            handleDiscountChange(index, e.target.value)
                          }
                          style={{ width: "50%" }}
                        />
                      )}

                      <Input
                        type="select"
                        name="tipo_desconto"
                        value={produto.tipo_desconto}
                        onChange={(e) =>
                          handleDiscountTypeChange(index, e.target.value)
                        }
                        style={{ width: "42%" }}
                      >
                        <option value="R$">R$</option>
                        <option value="%">%</option>
                      </Input>
                    </InputGroup>
                  </td>
                  <td>
                    <NumericFormat
                      className="form-control"
                      name="subtotal"
                      required={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      decimalScale={2}
                      fixedDecimalScale={true}
                      allowNegative={false}
                      value={produto?.subtotal}
                      onChange={(e) =>
                        handleFieldChange(index, "subtotal", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleRemoveField(index)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button color="primary" onClick={handleAddField}>
          <FontAwesomeIcon icon={faPlus} size="xl" style={{ marginRight: 3 }} />
          Adicionar produto
        </Button>
        <br />
        <br />
      </CardBody>
    </Card>
  );
};

export default CardProduto;
