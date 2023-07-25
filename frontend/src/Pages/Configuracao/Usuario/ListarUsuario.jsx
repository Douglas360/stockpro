import React, { useEffect, useState } from 'react'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { SearchBar } from '../../../components/SearchBar'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const ListarUsuario = () => {
  const { listUser, deleteUser } = useRegister()
  const [users, setUsers] = useState([])
  const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user');
  const id = JSON.parse(idEmpresa).id_empresa;
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await listUser(id)

    setUsers(response)
  }
  useEffect(() => {

    getUsers()
  }, [])

  const columns = ['ID', 'Nome', 'Login', 'Status']
  const actions = [
    {
      label: 'Editar',
      icon: faEdit,
      color: 'orange',
      onClick: (client) => {
        navigate(`/configuracao/usuario/editar/${client.id}`);
      },
    },

  ];

  const data = users?.map((item) => {
    return {
      id: item.id,
      nome: item.nome,
      login: item.login,
      status: item.ativo === true ? <div className="ms-auto badge bg-success">Ativo</div> : <div className="ms-auto badge bg-danger">Inativo</div>
    }
  })

  const handleDelete = async (id) => {
    await deleteUser(id)
    getUsers()

  }

  return (
    <SearchBar
      urlNavigate={'/configuracao/usuario/cadastrar'}
      columns={columns}
      rows={data}
      actions={actions}
      handleDeleteData={handleDelete}
    />

  )
}
