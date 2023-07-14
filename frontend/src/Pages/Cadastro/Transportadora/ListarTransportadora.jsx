import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { dateFormatWithHours } from '../../../functions/getFomatter';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ListarTransportadora = () => {
  const { listAllCarriers, deleteCarrier } = useRegister();
  const [carrier, setCarrier] = useState([]);
  const navigate = useNavigate();
  const loadCarrier = async () => {
    const response = await listAllCarriers(1);
    setCarrier(response);
  };

  useEffect(() => {
    loadCarrier();
  }, []);

  const handleDelete = async (id) => {
    await deleteCarrier(id);
    await loadCarrier();
  };



  const columns = ['Código', 'Nome', 'Tipo', 'Ativo', 'Telefone', 'Cadastrado em'];
  const actions = [
    {
      label: 'Editar',
      icon: faEdit,
      color: 'orange',
      onClick: (client) => {
        navigate(`/cadastro/transportadora/editar/${client.id}`);
      },
    },

  ];

  const clients = carrier?.map((supplier) => {
    const dataCadastro = dateFormatWithHours(supplier.createdAt);
    return {
      id: supplier.id_transportadora,
      nome: supplier.nome,
      tipo: supplier.tipo_transportadora,
      ativo: supplier.ativo ? 'Sim' : 'Não',
      telefone: supplier.telefone,
      cadastrado: dataCadastro
    };
  });


  return (
    <>
      <SearchBar
        urlNavigate={'/cadastro/transportadora/cadastrar'}
        columns={columns}
        rows={clients}
        handleDeleteData={handleDelete}
        msgDelete={'Transportadora'}
        actions={actions}
      />


    </>
  );
};

export default ListarTransportadora;
