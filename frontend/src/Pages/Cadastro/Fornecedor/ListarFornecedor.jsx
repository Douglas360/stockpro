import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { dateFormatWithHours } from '../../../functions/getFomatter';

const ListarFornecedor = () => {
  const { listAllSuppliers, deleteSupplier } = useRegister();
  const [suppliers, setSuppliers] = useState([]);

  const loadSuppliers = async () => {
    const response = await listAllSuppliers(1);
    setSuppliers(response);
  };
  useEffect(() => {

    loadSuppliers();


  }, []);

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    await loadSuppliers();
  };

  const columns = ['Código', 'Nome', 'Tipo', 'Ativo', 'Telefone', 'Cadastrado em'];

  const clients = suppliers?.map((supplier) => {
    const dataCadastro = dateFormatWithHours(supplier.createdAt);
    return {
      id: supplier.id_fornecedor,
      nome: supplier.nome,
      tipo: supplier.tipo_fornecedor,
      ativo: supplier.ativo ? 'Sim' : 'Não',
      telefone: supplier.telefone,
      cadastrado: dataCadastro
    };
  });

  return (
    <>
      <SearchBar
        urlNavigate={'/cadastro/fornecedor/cadastrar'}
        columns={columns}
        rows={clients}
        handleDeleteData={handleDelete}
        msgDelete={'Fornecedor'}
      />


    </>
  );
};

export default ListarFornecedor;
