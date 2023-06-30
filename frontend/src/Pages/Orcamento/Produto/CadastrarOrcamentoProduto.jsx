import React from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle'
import FormBudget from '../../../components/Budget/FormBudget'

const CadastrarOrcamentoProduto = () => {
  return (
    <div>
      <PageTitle
        heading="Adicionar orçamento de produto"
        subheading="Adicione um novo orçamento de produto."
        icon="lnr lnr-file-add icon-gradient bg-amy-crisp"
      />
      <FormBudget
        url='/orcamento/produto'
       />
    </div>
  )
}

export default CadastrarOrcamentoProduto