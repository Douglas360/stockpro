import React, { useEffect, useState } from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormBudget from '../../../components/Budget/FormBudget'
import { useOrder } from '../../../context/OrderContext/useOrder'
import { useParams } from 'react-router-dom'

const CadastrarVendaProduto = () => {
  const { createOrder, getOrderById, loading } = useOrder()
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const isEditMode = !!id

  useEffect(() => {
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
    produtos: order?.itens,
    valorFrete: order?.valor_frete,
    id_transportadora: order?.id_transportadora,
  }


  const handleSubmit = async (data) => {
    if (isEditMode) {
      console.log(data)
    } else {
      await createOrder(data)
    }
  }
  return (
    <div>
      <PageTitle
        heading={isEditMode ? `Editar venda ${id}` : 'Cadastrar venda'}
        subheading={isEditMode ? 'Editar venda' : 'Cadastrar venda'}
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        url='/venda/produto'
        handleFormSubmit={handleSubmit}
        loading={loading}
        initialValues={initialValues}
        typeForm='venda'

      />
    </div>
  )
}

export default CadastrarVendaProduto