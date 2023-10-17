import {
  faArrowDown,
  faPlusCircle,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

import { searchArrayOfObjects } from "../functions/searchArrayOfObjects";

import { useNavigate } from "react-router-dom";
import { AdvancedSearch } from "./AdvancedSearch";
import TableView from "./TableView";
import { CustomSpinner } from "./CustomSpinner";

const DeleteModal = ({ isOpen, toggleModal, handleConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
        <ModalHeader toggle={toggleModal} className="text-lg font-medium mb-4">
          Confirmação de exclusão
        </ModalHeader>
        <ModalBody className="text-gray-600 mb-6">
          Tem certeza que deseja excluir?
        </ModalBody>
        <ModalFooter className="flex justify-end">
          <Button
            color="secondary"
            outline
            className="mr-2"
            onClick={toggleModal}
          >
            Cancelar
          </Button>
          <Button color="danger" outline onClick={handleConfirm}>
            Excluir
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export const SearchBar = ({
  urlNavigate,
  columns,
  rows,
  msgDelete,
  handleDeleteData,
  loading,
  actions,
  ActionsDropdown,
  noActions,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);
  const toggleAdvancedSearch = () =>
    setIsAdvancedSearchVisible(!isAdvancedSearchVisible);

  const navigate = useNavigate();

  const handleAddClient = () => {
    navigate(urlNavigate);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdvancedSearch = () => {
    // Advanced search logic here
  };

  const filteredData = searchArrayOfObjects(rows, searchTerm, [
    "nome",
    "id",
    "date",
    "valor",
    "status",
  ]);

  const newActions = noActions
    ? actions
    : [
        ...(actions ? actions : []),
        {
          label: "Excluir",
          icon: faTrashCan,
          color: "red",
          onClick: (client) => {
            setSelectedItem(client.id);
            setDeleteModalOpen(true);
          },
        },
      ];

  const renderActions = (client) => {
    return (
      <>
        {newActions.map((action, index) => (
          <React.Fragment key={index}>
            <UncontrolledTooltip
              placement="top"
              target={`${action.label}-${client.id}`}
              style={{ fontSize: ".6rem", padding: "4px 8px" }}
            >
              {action.label}
            </UncontrolledTooltip>

            <FontAwesomeIcon
              icon={action.icon}
              id={`${action.label}-${client.id}`}
              className="me-1 btn-transition"
              size="xl"
              style={{
                cursor: action.cursor || "pointer",
                color: action.color,
              }}
              onClick={() => action.onClick(client)}
            />
          </React.Fragment>
        ))}

        {ActionsDropdown && <ActionsDropdown client={client} />}
      </>
    );
  };
  const handleConfirm = () => {
    handleDeleteData(selectedItem);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Row className="mb-1">
        {loading && <CustomSpinner />}
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
          <Button color="primary" onClick={handleAddClient}>
            <FontAwesomeIcon icon={faPlusCircle} size="xl" />
            <span> Adicionar</span>
          </Button>
        </Col>        
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={7}
          className="d-flex align-items-center"
        >
          <div className="d-flex align-items-center justify-content-between flex-grow-1">
            <div className="flex-grow-1">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Buscar por nome"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroupText addonType="append">
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="xl"
                    onClick={handleSearch}
                  />
                </InputGroupText>
              </InputGroup>
            </div>
            <div
              className="d-flex  align-items-center"
              style={{ marginLeft: "1rem" }}
            >
              <Button color="secondary" onClick={toggleAdvancedSearch} disabled>
                Busca Avançada <FontAwesomeIcon icon={faArrowDown} />
              </Button>
            </div>
          </div>
        </Col>
        {isAdvancedSearchVisible && (
          <Col xs={12} className="mt-3">
            <AdvancedSearch advancedSearch={handleAdvancedSearch} />
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <TableView
            columns={columns}
            rows={filteredData}
            handleDeleteData={handleDeleteData}
            renderActions={renderActions}
          />
        </Col>
      </Row>
      <DeleteModal
        isOpen={deleteModalOpen}
        toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
