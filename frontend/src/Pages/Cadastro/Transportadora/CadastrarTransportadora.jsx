import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'

const CadastrarTransportadora = () => {
    const { createCarrier, loading } = useRegister() //import function createSupplier from context

    const handleSubmit = async (data) => {
        await createCarrier(data)
    }

    return (
        <div>
            <PageTitle
                heading="Cadasto de transportadora"
                subheading="Cadastro de transportadora no sistema."
                icon="lnr lnr-apartment icon-gradient bg-amy-crisp"
            />
            <FormRegister
                title={'transportadora'}
                loading={loading}
                handleFormSubmit={handleSubmit}
            />
        </div>
    )
}

export default CadastrarTransportadora