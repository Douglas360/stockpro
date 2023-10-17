import React, { useEffect, useState } from "react";

import {
  faMoneyBill1Wave,
  faPlus,
  faRefresh,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { toast } from "react-toastify";
import { addDays } from "../../../functions/addDays";
import { cleanCurrencyMask } from "../../../functions/cleanCurrencyMask";
import { NumericFormat } from "react-number-format";
import { useOrder } from "../../../context/OrderContext/useOrder";

const CardPagamento = ({ data, handleInputChange }) => {
  const { listTypePayment } = useOrder();

  const [dataPagamento, setDataPagamento] = useState([]);
  const [pagamentoParcelado, setPagamentoParcelado] = useState([]);
  const [checkExibePagamento, setCheckExibePagamento] = useState(false);
  const [checkPagamentoAvista, setCheckPagamentoAvista] = useState(true);
  const [checkPagamentoParcelado, setCheckPagamentoParcelado] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    formaPagamentoAvistaError: false,
    formaPagamentoParceladoError: false,
    vencimentoAvistaError: false,
    valorAvistaError: false,
    intervaloParcelasError: false,
    quantidadeParcelasError: false,
    dataPrimeiraParcelaError: false,
  });

  const handleInputBlur = (name, value) => {
    if (value.trim() === "") {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    } else {
      setInputErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };

  useEffect(() => {
    if (data && data.pagamento && data.pagamento.length > 0) {
      setCheckExibePagamento(data.exibePagamento);

      setCheckPagamentoAvista(!data.pagamento[0]?.parcelado);
      setCheckPagamentoParcelado(data.pagamento[0]?.parcelado);
    }
  }, [data]);

  useEffect(() => {
    if (pagamentoParcelado?.length > 0) {
      const formatedObject = pagamentoParcelado.map((item) => {
        return {
          id_forma_pagamento: +item?.formaPagamentoParcela,
          observacao: item.observacaoParcela,
          parcelado: checkPagamentoParcelado,
          valor: item.valorParcela,
          vencimento: new Date(item.vencimentoParcela).toISOString(),
          venda: true,
        };
      });

      handleInputChange({
        target: { name: "pagamentoParcelado", value: formatedObject },
      });
    } else {
      handleInputChange({
        target: { name: "pagamentoParcelado", value: pagamentoParcelado },
      });
    }
  }, [pagamentoParcelado]);

  useEffect(() => {
    const loadFormaPagamento = async () => {
      const response = await listTypePayment();
      setDataPagamento(response);
    };
    loadFormaPagamento();
  }, []);

  const handleAddField = () => {
    setPagamentoParcelado([
      ...pagamentoParcelado,
      {
        vencimento: new Date(),
        valor: "",
        formaPagamentoParcela: "",
        observacao: "",
      },
    ]);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...pagamentoParcelado];
    updatedFields[index][field] = value;
    setPagamentoParcelado(updatedFields);

    // Update the data object with the updated array
    const updatedData = { ...data };
    updatedData.pagamentoParcelado = updatedFields;

    handleInputChange({
      target: { name: "pagamentoParcelado", value: updatedFields },
    });
  };

  const handleRemoveField = (index) => {
    const list = [...pagamentoParcelado];
    list.splice(index, 1);
    setPagamentoParcelado(list);
  };
 
  const handleCheck = (checkboxName, value) => {
    if (checkboxName === 'exibePagamento') {
      setCheckExibePagamento(value)
    } else if (checkboxName === 'pagamentoAvista') {
      setCheckPagamentoAvista(value)
      setCheckPagamentoParcelado(!value)
    } else if (checkboxName === 'pagamentoParcelado') {
      setCheckPagamentoParcelado(value)
      setCheckPagamentoAvista(!value)
    }
  }

  const handleRefresh = () => {
    setPagamentoParcelado([]);

    if (data.intervaloParcelas && data.intervaloParcelas > 0 && data.dataPrimeiraParcela) {
      const valorParcela = data.valorTotal / +data.quantidadeParcelas;
      const list = [];

      for (let index = 0; index < +data.quantidadeParcelas; index++) {
        list.push({
          vencimentoParcela:
            index === 0
              ? data.dataPrimeiraParcela
              : addDays(
                  data.dataPrimeiraParcela,
                  data.intervaloParcelas * index
                ),
          valorParcela: +valorParcela.toFixed(2),
          formaPagamentoParcela: +data?.formaPagamentoParcela,
          observacaoParcela: "",
        });
      }

      setPagamentoParcelado(list);
    } else {
      toast.error(
        "Não e possível gerar parcelamento sem o intervalo de parcelas"
      );
    }
  };

  useEffect(() => {
    if (
      data &&
      data.pagamento &&
      data.pagamento.length > 0 &&
      pagamentoParcelado?.length === 0
    ) {
      setPagamentoParcelado(
        data.pagamento.map((item) => {
          return {
            vencimentoParcela: item.vencimento.slice(0, 10),
            valorParcela: item.valor,
            formaPagamentoParcela: item.id_forma_pagamento,
            observacaoParcela: item.observacao,
          };
        })
      );
    }
  }, [data]);

  return (
    <Card className="main-card mb-1">
      <CardBody>
        <Row>
          <Col md="12">
            <Label style={{ fontSize: 20 }}>
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                style={{ fontSize: 20, marginRight: 3 }}
              />
              Pagamento
            </Label>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Input
              type="checkbox"
              name="exibePagamento"
              id="exibePagamento"
              onChange={(e) => handleCheck("exibePagamento", e.target.checked)}
              checked={checkExibePagamento}
              style={{ marginRight: 5 }}
              required
            />
            <Label for="exibePagamento" style={{ fontWeight: "bold" }}>
              Gerar condições de pagamento
            </Label>
            <span className="text-danger">*</span>
          </Col>
        </Row>
        {checkExibePagamento && (
          <>
            <Row>
              <Col md="12">
                <Input
                  type="checkbox"
                  name="pagamentoAvista"
                  id="pagamentoAvista"
                  onChange={(e) =>
                    handleCheck("pagamentoAvista", e.target.checked)
                  }
                  checked={checkPagamentoAvista}
                  style={{ marginRight: 5 }}
                />
                <Label for="pagamentoAvista">
                  Pagamento à vista <span className="text-danger">*</span>
                </Label>
                <Input
                  type="checkbox"
                  name="pagamentoParcelado"
                  id="pagamentoParcelado"
                  onChange={(e) =>
                    handleCheck("pagamentoParcelado", e.target.checked)
                  }
                  checked={checkPagamentoParcelado}
                  style={{ marginRight: 5, marginLeft: 10 }}
                />
                <Label for="pagamentoParcelado">
                  Pagamento parcelado <span className="text-danger">*</span>
                </Label>
              </Col>
            </Row>

            {checkPagamentoAvista && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Vencimento</th>
                    <th>Valor</th>
                    <th>Forma de pagamento</th>
                    <th>Observação</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        type="date"
                        //min={new Date().toISOString().split("T")[0]}
                        name="vencimentoAvista"
                        id="vencimentoAvista"
                        placeholder="Vencimento"
                        onChange={handleInputChange}
                        value={data.vencimentoAvista}
                        invalid={inputErrors.vencimentoAvistaError}
                        valid={!inputErrors.vencimentoAvistaError}
                        required
                      />
                    </td>
                    <td>
                      <NumericFormat
                        className="form-control"
                        name="valorTotal"
                        id="valorTotal"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        placeholder="Valor"
                        decimalScale={2}
                        fixedDecimalScale={true}
                        disabled
                        allowNegative={false}
                        onChange={(e) =>
                          setPagamentoParcelado({
                            ...pagamentoParcelado,
                            valor: cleanCurrencyMask(e.target.value),
                            parcelado: false,
                          })
                        }
                        value={data.valorTotal}
                        required
                      />
                    </td>

                    <td>
                      <Input
                        type="select"
                        name="formaPagamentoAvista"
                        id="formaPagamentoAvista"
                        // onChange={(e) =>
                        //   setPagamentoParcelado({
                        //     ...pagamentoParcelado,
                        //     formaPagamentoParcela: +e.target.value,
                        //     parcelado: false,
                        //   })
                        // }
                        onChange={handleInputChange}
                        value={data.formaPagamentoAvista}
                        invalid={inputErrors.formaPagamentoAvistaError}
                        valid={!inputErrors.formaPagamentoAvistaError}
                        required
                      >
                        <option value="">Selecione</option>
                        {dataPagamento.map((item) => (
                          <option
                            key={item.id_forma_pagamento}
                            value={item.id_forma_pagamento}
                          >
                            {item.descricao}
                          </option>
                        ))}
                      </Input>
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="observacaoAvista"
                        id="observacaoAvista"
                        placeholder="Observação"
                        /*onChange={(e) =>
                          setPagamentoParcelado({
                            ...pagamentoParcelado,
                            observacao: e.target.value,
                            parcelado: false,
                          })
                        }   value={data.observacao}*/
                        onChange={handleInputChange}
                        value={data.observacaoAvista}
                      />
                    </td>
                    <td>
                      <Button color="danger" size="sm">
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}

            {checkPagamentoParcelado && (
              <>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Forma de pagamento</th>
                      <th>Intervalo de parcelas (dias)</th>
                      <th>Quantidade de parcelas</th>
                      <th>Data 1ª parcela</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          type="select"
                          name="formaPagamentoParcela"
                          id="formaPagamentoParcela"
                          onChange={handleInputChange}
                          value={data?.formaPagamentoParcela}
                        >
                          <option value="">Selecione</option>
                          {dataPagamento.map((item) => (
                            <option
                              key={item.id_forma_pagamento}
                              value={item.id_forma_pagamento}
                            >
                              {item.descricao}
                            </option>
                          ))}
                        </Input>
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="intervaloParcelas"
                          id="intervaloParcelas"
                          placeholder="Intervalo de parcelas"
                          onChange={handleInputChange}
                          value={data.intervaloParcelas}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="quantidadeParcelas"
                          id="quantidadeParcelas"
                          placeholder="Quantidade de parcelas"
                          onChange={handleInputChange}
                          value={data.quantidadeParcelas}
                        />
                      </td>
                      <td>
                        <Input
                          type="date"
                          //min={new Date().toISOString().split("T")[0]}
                          name="dataPrimeiraParcela"
                          id="dataPrimeiraParcela"
                          placeholder="Data 1ª parcela"
                          onChange={handleInputChange}
                          value={data.dataPrimeiraParcela}
                          required
                        />
                      </td>
                      <td>
                        <Button color="dark" size="sm" onClick={handleRefresh}>
                          <FontAwesomeIcon
                            icon={faRefresh}
                            style={{ marginRight: 3 }}
                          />
                          Gerar
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Vencimento</th>
                      <th>Valor</th>
                      <th>Forma de pagamento</th>
                      <th>Observação</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagamentoParcelado?.length > 0 &&
                      pagamentoParcelado.map((parcela, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <Input
                                type="date"
                                disabled
                                min={new Date().toISOString().split("T")[0]}
                                name="vencimentoParcela"
                                id="vencimentoParcela"
                                placeholder="Vencimento"
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "vencimentoParcela",
                                    e.target.value
                                  )
                                }
                                value={parcela.vencimentoParcela}
                              />
                            </td>
                            <td>
                              <NumericFormat
                                className="form-control"
                                name="valorParcela"
                                id="valorParcela"
                                required={false}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                readOnly
                                placeholder="Valor da Parcela"
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "valorParcela",
                                    cleanCurrencyMask(e.target.value)
                                  )
                                }
                                value={parcela.valorParcela}
                              />
                            </td>
                            <td>
                              <Input
                                type="select"
                                name="formaPagamentoParcela"
                                id="formaPagamentoParcela"
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "formaPagamentoParcela",
                                    e.target.value
                                  )
                                }
                                value={parcela?.formaPagamentoParcela}
                              >
                                <option value="">Selecione</option>

                                {dataPagamento.map((item) => (
                                  <option
                                    key={item.id_forma_pagamento}
                                    value={item.id_forma_pagamento}
                                  >
                                    {item.descricao}
                                  </option>
                                ))}
                              </Input>
                            </td>
                            <td>
                              <Input
                                type="text"
                                name="observacaoParcela"
                                id="observacaoParcela"
                                placeholder="Observação"
                                onChange={(e) =>
                                  handleFieldChange(
                                    index,
                                    "observacaoParcela",
                                    e.target.value
                                  )
                                }
                                value={parcela.observacaoParcela}
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
                {pagamentoParcelado?.length > 0 && (
                  <Button color="dark" size="sm" onClick={handleAddField}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 3 }} />
                    Adicionar parcela
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CardPagamento;
