import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomSpinner } from '../../../components/CustomSpinner';

const ListarValorVenda = () => {
  const { listSalePrices, deleteSalePrice, updateSalePrice, loading } = useProduct();
  const [valorVenda, setValorVenda] = useState([]);
  const [modal, setModal] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [id, setId] = useState('');

  const loadSalePrices = async () => {
    const response = await listSalePrices();

    setValorVenda(response);
  };

  useEffect(() => {
    loadSalePrices();
  }, []);

  const handleDelete = async (id) => {
    await deleteSalePrice(id);
    loadSalePrices();
  };


  const columns = ['Cód', 'Nome', 'Lucro sugerido'];

  const value = valorVenda?.map((salePrice) => {
    return {
      id: salePrice.id_lucro_sugerido,
      nome: salePrice.descricao,
      lucro: salePrice.valor
    };
  });

  const handleUpdate = (salePrice) => {
    setId(salePrice.id);
    setDescricao(salePrice.nome);
    setValor(salePrice.lucro);
    setModal(true);

  };
  const handleModalCancel = () => {
    setModal(false);
  };
  const handleModalSave = async () => {
    const data = {
      id: id,
      descricao: descricao,
      valor: valor
    };
    await updateSalePrice(data);
    setModal(false);
    loadSalePrices();
  };

  const actions = [
    {
      label: 'Editar',
      icon: faEdit,
      color: 'orange',
      onClick: (salePrice) => {
        handleUpdate(salePrice);
      }
    },
  ]
  return (
    <>
      <SearchBar
        urlNavigate={'/produto/valores/cadastrar'}
        columns={columns}
        rows={value}
        msgDelete={'Valor Venda'}
        handleDeleteData={handleDelete}
        actions={actions}
      />
      {modal && (

        <Modal isOpen={modal} toggle={handleModalCancel}>
          <ModalHeader toggle={handleModalCancel}>Editar valor de venda</ModalHeader>
          <ModalBody>
            <Label for='descricao'>Descrição</Label>
            <Input
              type='text'
              name='descricao'
              id='descricao'
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <Label for='valor'>Valor (%)</Label>
            <Input
              type='number'
              name='valor'
              id='valor'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleModalSave}>
              {loading ? (
                <CustomSpinner />
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} size='xl' style={{ marginRight: 3 }} />
                  Salvar
                </>
              )

              }
            </Button>
            <Button color='danger' onClick={handleModalCancel} style={{ marginLeft: 3 }}>
              <FontAwesomeIcon icon={faTimes} size='xl' style={{ marginRight: 3 }} />
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default ListarValorVenda;
