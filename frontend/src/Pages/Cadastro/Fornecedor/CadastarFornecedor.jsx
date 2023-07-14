import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormRegister from '../../../components/FormRegister'
import { useRegister } from '../../../context/RegisterContext/useRegister'
import { useParams } from 'react-router-dom'

const CadastrarFornecedor = () => {
    const { createSupplier, loading, getSupplierById, updateSupplier } = useRegister() //import function createSupplier from context
    const { id } = useParams() //import id from params
    const [supplier, setSupplier] = useState(null) //create state to store supplier data
    const isEditMode = !!id //check if is edit mode

    useEffect(() => {
        //if is edit mode, get supplier by id
        if (isEditMode) {
            const loadSupplier = async () => {
                const response = await getSupplierById(id)
                console.log(response)
                setSupplier(response)
            }
            loadSupplier()
        }
    }, [isEditMode, id])


    const handleSubmit = async (data) => {
        //if is edit mode, update supplier
        if (isEditMode) {
            data.id = id
            await updateSupplier(data)
            return
        } {
            //else, create supplier
            await createSupplier(data)

        }

    }
    return (
        <div>
            <PageTitle
                heading={isEditMode ? 'Editar fornecedor' : 'Cadastrar fornecedor'}
                subheading={isEditMode ? 'Editar Cadastro de fornecedores' : 'Cadastrar Cadastro de fornecedores'}
                icon="lnr lnr-apartment icon-gradient bg-amy-crisp"
            />
            <FormRegister
                title={'fornecedor'}
                loading={loading}
                handleFormSubmit={handleSubmit}
                initialValues={supplier}
            />

        </div>
    )
}

export default CadastrarFornecedor