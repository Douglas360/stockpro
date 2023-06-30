import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'

import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'

const CadastrarCliente = () => {
  const { createCustomer, loading } = useRegister() //import function createCustomer from context

  const handleSubmit = async (data) => {
    await createCustomer(data)
  }
  return (
    <div>
      <PageTitle
        heading="Cadasto de clientes"
        subheading="Cadastro de clientes"
        icon="pe-7s-users icon-gradient bg-amy-crisp"
      />
      <FormRegister
        title={'cliente'}
        loading={loading}
        handleFormSubmit={handleSubmit}
      />

    </div>
  )
}

export default CadastrarCliente