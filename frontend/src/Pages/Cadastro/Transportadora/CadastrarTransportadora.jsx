import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useParams } from 'react-router-dom'

const CadastrarTransportadora = () => {
    const { createCarrier, loading, getCarrierById, updateCarrier} = useRegister() //import function createSupplier from context
    const { id } = useParams() //import id from params
    const [carrier, setCarrier] = useState(null) //create state to store supplier data
    const isEditMode = !!id //check if is edit mode

    useEffect(() => {
        //if is edit mode, get supplier by id
        if (isEditMode) {
            const loadCarrier = async () => {
                const response = await getCarrierById(id)
                setCarrier(response)
            }
            loadCarrier()
        }
    }, [isEditMode, id])


    const handleSubmit = async (data) => {
        //if is edit mode, pass id to data
        if (isEditMode) {
            data.id = id
        
            await updateCarrier(data)
        } else {
            await createCarrier(data)

        }
    }

    return (
        <div>
            <PageTitle
                heading={isEditMode ? 'Editar transportadora' : 'Cadastrar transportadora'}
                subheading={isEditMode ? 'Editar Cadastro de transportadora' : 'Cadastrar Cadastro de transportadora'}
                icon="lnr lnr-apartment icon-gradient bg-amy-crisp"
            />
            <FormRegister
                title={'transportadora'}
                loading={loading}
                initialValues={carrier}
                handleFormSubmit={handleSubmit}
            />
        </div>
    )
}

export default CadastrarTransportadora