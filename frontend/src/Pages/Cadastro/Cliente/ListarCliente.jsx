import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useRegister } from '../../../context/RegisterContext/useRegister';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { dateFormatWithHours } from '../../../functions/getFomatter';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ListarClientes = () => {
  const { listAllCustomers,deleteCustomer } = useRegister();
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);

  //const id_empresa = user?.id_empresa;
  const loadCustomers = async () => {

    const response = await listAllCustomers(1);

    setCustomers(response);
  };
  useEffect(() => {
   
    loadCustomers();


  }, []);

  const columns = ['Código', 'Nome', 'Tipo', 'Ativo', 'Telefone', 'Cadastrado em'];

  const actions = [
    {
        label: 'Teste',
        icon: faEdit,
        color: 'orange',
        onClick: (client) => {
            // Lógica para a ação de edição
        },
    },
    {
        label: 'TEste2',
        icon: faTrashCan,
        color: 'red',
        onClick: (client) => {
           //lógica
        },
    },
    // Adicione mais ações se necessário
];

  const clients = customers.map((customer) => {
    const dataCadastro = dateFormatWithHours(customer.createdAt);
    return {
      id: customer.id_cliente,
      nome: customer.nome,
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
        rows={clients}
        handleDeleteData={handleDelete}
        msgDelete={'Cliente'}
        actions={actions}
      />


    </>
  );
};

export default ListarClientes;
