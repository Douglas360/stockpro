import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormBudget from '../../../components/Budget/FormBudget'
import { useParams } from 'react-router-dom'
import { useBudget } from '../../../context/BudgetContext/useBudget'

const CadastrarOrcamentoProduto = () => {
  const { createBudget, getBudgetById, loading } = useBudget()
  const { id } = useParams()
  const [budget, setBudget] = useState({})
  const isEditMode = !!id

  useEffect(() => {
    if (isEditMode) {
      const loadBudget = async () => {
        const response = await getBudgetById(id)
        
        setBudget(response)
      }
      loadBudget()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode])


  const handleSubmit = async (data) => {
    if (isEditMode) {
      console.log(data)
    } else {
      await createBudget(data)
    }
  }

  
  const initialValues = {
    title: 'orçamento',
    numeroVenda: '',
    clienteOrcamento: '',
  }

  return (
    <div>
      <PageTitle
        heading={isEditMode ? `Editar orçamento ${id}` : 'Cadastrar orçamento'}
        subheading={isEditMode ? 'Editar orçamento' : 'Cadastrar orçamento'}
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        url='/orcamento/produto'
        handleFormSubmit={handleSubmit}
        loading={loading}
        initialValues={initialValues}
        typeForm='orcamento'
      />
    </div>
  )
}

export default CadastrarOrcamentoProduto