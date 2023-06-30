import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { dateFormatWithHours } from '../../../functions/getFomatter';

const ListarTransportadora = () => {
  const { listAllCarriers, deleteCarrier } = useRegister();
  const [carrier, setCarrier] = useState([]);

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
      />


    </>
  );
};

export default ListarTransportadora;
