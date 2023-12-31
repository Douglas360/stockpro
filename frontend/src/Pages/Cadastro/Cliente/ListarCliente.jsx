import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { dateFormatWithHours } from '../../../functions/getFomatter';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ListarClientes = () => {
  const { listAllCustomers, deleteCustomer } = useRegister();
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user');
  const id = JSON.parse(idEmpresa).id_empresa;

  const loadCustomers = async () => {

    const response = await listAllCustomers(id);

    setCustomers(response);
  };
  useEffect(() => {

    loadCustomers();


  }, []);

  const columns = ['Código', 'Nome', 'Tipo', 'Ativo', 'Telefone', 'Cadastrado em'];
  const columnsToFilter = ['nome', 'email', 'telefone', 'celular'];


  const actions = [
    {
      label: 'Editar',
      icon: faEdit,
      color: 'orange',
      onClick: (client) => {
        navigate(`/cadastro/cliente/editar/${client.id}`);
      },
    },

  ];

  const clients = customers?.map((customer) => {
    const dataCadastro = dateFormatWithHours(customer.createdAt);
    return {
      id: customer.id_cliente,
      nome: customer?.nome,
      tipo: customer.tipo_cliente,
      ativo: customer.ativo ? 'Sim' : 'Não',
      telefone: customer.telefone,
      cadastrado: dataCadastro
    };
  });

  const handleDelete = async (id) => {

    await deleteCustomer(id);
    await loadCustomers();
  };


  return (
    <>
      <SearchBar
        urlNavigate={'/cadastro/cliente/cadastrar'}
        columns={columns}
        columnsToFilter={columnsToFilter}
        rows={clients}
        handleDeleteData={handleDelete}
        msgDelete={'Cliente'}
        actions={actions}
      />


    </>
  );
};

export default ListarClientes;
