import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormBudget from '../../../components/Budget/FormBudget'

const CadastrarVendaProduto = () => {
  return (
    <div>
      <PageTitle
        heading="Realizar venda de produto"
        subheading="Relizar uma nova venda de produto."
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        url='/venda/produto'
       />
    </div>
  )
}

export default CadastrarVendaProduto