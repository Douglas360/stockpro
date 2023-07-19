import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormBudget from '../../../components/Budget/FormBudget'
import { useParams } from 'react-router-dom'

const CadastrarOrcamentoProduto = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const isEditMode = !!id

  /*useEffect(() => {
    if (isEditMode) {
      const loadOrder = async () => {
        const response = await getOrderById(id)
        console.log(response)
        setOrder(response)
      }
      loadOrder()
    }
  }, [isEditMode, id])

  const initialValues = {
    numeroVenda: order?.numero_venda,
    clienteOrcamento: order?.id_cliente,
    //formatar data da venda para o formato do input date do html (yyyy-mm-dd) 
    dataOrcamento: order?.data_venda ? new Date(order.data_venda).toISOString().slice(0, 10) : '',
    situacaoVendaOrcamento: order?.id_situacao_venda,
    canalVendaOrcamento: order?.id_canal_venda,
  }*/

  const handleSubmit = async (data) => {
    if (isEditMode) {
      console.log(data)
    } else {
      //await createOrder(data)
    }
  }
  const loading = false
  const initialValues = {
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