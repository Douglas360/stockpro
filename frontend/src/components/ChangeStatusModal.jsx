import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
  Label,
  Input,
  Table,
} from "reactstrap";
import { CustomSpinner } from "./CustomSpinner";

export const ChangeStatusModal = ({
  isOpen,
  toggleModal,
  data,
  loadOrders,
  listSalesStatus,
  updateOrderStatus,
  loading,
}) => {
  //const { listSalesStatus, updateOrderStatus, loading } = useOrder()
  const [situacaoVenda, setSituacaoVenda] = useState([]);
  const [newSituacaoVenda, setNewSituacaoVenda] = useState(
    data[0]?.id_situacao_venda
  );

  const loadSalesStatus = async () => {
    const response = await listSalesStatus();
    setSituacaoVenda(response);
  };

  useEffect(() => {
    loadSalesStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //get data from form
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);
    const id = data[0].id;

    const response = await updateOrderStatus(newData, id);
    if (response) {
      loadOrders();
      toggleModal();
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} style={{ maxWidth: "80%" }}>
      {loading && <CustomSpinner />}
      <ModalHeader toggle={toggleModal}>Alterar status da venda</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md="3">
                  <Label style={{ fontWeight: "bold" }}>Situação</Label>
                  <span className="text-danger">*</span>
                  <Input
                    required
                    type="select"
                    //value={data[0]?.id_situacao_venda}
                    value={newSituacaoVenda}
                    onChange={(e) => setNewSituacaoVenda(e.target.value)}
                    name="statusId"
                    id="statusId"
                  >
                    <option value="">Selecione</option>
                    {situacaoVenda.map((situacao) => (
                      <option
                        key={situacao.id_situacao_venda}
                        value={situacao.id_situacao_venda}
                      >
                        {situacao.descricao}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md="9">
                  <Label style={{ fontWeight: "bold" }}>Observação</Label>
                  <Input type="text" name="descricao" id="descricao" />
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Salvar
              </Button>
            </Form>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr className="text-center">
                  <th>Data</th>
                  <th>Observação</th>
                  <th>Situação</th>
                  <th>Usuário</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{new Date(item.data).toLocaleString("pt-br")}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <div
                        className="ms-auto badge"
                        style={{ backgroundColor: item.cor }}
                      >
                        {item.situacao_venda}
                      </div>
                    </td>
                    <td>{item.usuario}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
