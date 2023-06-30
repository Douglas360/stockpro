import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'

const CadastrarFornecedor = () => {
    const { createSupplier, loading } = useRegister() //import function createSupplier from context

  const handleSubmit = async (data) => {
    await createSupplier(data)
  }
    return (
        <div>
            <PageTitle
                heading="Cadasto de fornecedores"
                subheading="Cadastro de fornecedores no sistema."
                icon="lnr lnr-apartment icon-gradient bg-amy-crisp"
            />
            <FormRegister
                title={'fornecedor'}
                loading={loading}
                handleFormSubmit={handleSubmit}
            />

        </div>
    )
}

export default CadastrarFornecedor