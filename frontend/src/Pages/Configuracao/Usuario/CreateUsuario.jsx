import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormCreateUserGroup from './Form/FormCreateUser'
import { useParams } from 'react-router-dom'
import { useRegister } from '../../../context/RegisterContext/useRegister'

export const CreateUsuario = () => {
  const { id } = useParams();
  const { getUserById } = useRegister();
  const [initialValues, setInitialValues] = useState({});

  const getUser = async (id) => {
    const response = await getUserById(id)
    setInitialValues(
      {
        ...response,
        isUpdate: true
      }
    )

  }

  useEffect(() => {
    if (id) {
      getUser(id)
    }
  }, [id]);


  return (
    <>
      <PageTitle
        heading={'Cadastrar usuario'}
        subheading="Cadastre um novo usuario no sistema."
        icon="pe-7s-users icon-gradient bg-amy-crisp"
      />
      <FormCreateUserGroup initialValues={initialValues} />
    </>
  )
}
