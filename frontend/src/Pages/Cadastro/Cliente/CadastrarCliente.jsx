import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'

import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useParams } from 'react-router-dom'

const CadastrarCliente = () => {
  const { createCustomer, loading, getCustomerById, updateCustomer } = useRegister() //import function createCustomer from context
  const { id } = useParams() //import id from params
  const [customer, setCustomer] = useState(null) //create state to store customer data
  const isEditMode = !!id //check if is edit mode

  useEffect(() => {
    //if is edit mode, get customer by id
    if (isEditMode) {
      const loadCustomer = async () => {
        const response = await getCustomerById(id)
        setCustomer(response)
      }
      loadCustomer()
    }
  }, [isEditMode, id])


  const handleSubmit = async (data) => {
    //if is edit mode, pass id to data
    if (isEditMode) {
      data.id = id

      await updateCustomer(data)
    } else {
      await createCustomer(data)

    }

  }
  return (
    <div>
      <PageTitle
        heading={isEditMode ? 'Editar cliente' : 'Cadastrar cliente'}
        subheading="Editar Cadastro de clientes"
        icon="pe-7s-users icon-gradient bg-amy-crisp"
      />
      <FormRegister
        title={'cliente'}
        loading={loading}
        initialValues={customer}
        handleFormSubmit={handleSubmit}
      />

    </div>
  )
}

export default CadastrarCliente