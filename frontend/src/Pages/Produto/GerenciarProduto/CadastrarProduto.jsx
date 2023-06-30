import React, { useState } from 'react'
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../Layout/AppMain/PageTitle'
import { Dados } from './Tabs/Dados'
import { Detalhes } from './Tabs/Detalhes';
import { Valores } from './Tabs/Valores';
import { Estoque } from './Tabs/Estoque';
import { Fotos } from './Tabs/Fotos';
import { Fiscal } from './Tabs/Fiscal';
import { Fornecedores } from './Tabs/Fornecedores';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { Spinner } from 'reactstrap';
import { CustomSpinner } from '../../../components/CustomSpinner';

const CadastrarProduto = () => {
  const [data, setData] = useState([]);
  const { createProduct, loading } = useProduct();
  const id_empresa = 1

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setData((prevData) => ({
      ...prevData,
      id_empresa: id_empresa,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(data);

  };

  const Loading = () => {
    return (
      <>
        {loading && (
          <CustomSpinner />
        )}
      </>
    )
  }

  const tabsContent = [
    {
      title: 'Dados',
      content: <Dados data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Detalhes',
      content: <Detalhes data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Valores',
      content: <Valores data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Estoque',
      content: <Estoque data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Fotos',
      content: <Fotos data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Fiscal',
      content: <Fiscal data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
    {
      title: 'Fornecedores',
      content: <Fornecedores data={data} handleInputChange={handleInputChange} handleSubmit={handleSubmit} Loading={Loading} />,
    },
  ];

  return (
    <div>
      <PageTitle
        heading="Cadasto de produtos"
        subheading="Cadastro de produtos"
        icon="pe-7s-box1 icon-gradient bg-amy-crisp"
      />
      <Tabs
        tabsWrapperClass="body-tabs body-tabs-layout"
        transform={false}
        showInkBar={true}
        items={tabsContent}
      >

        {
          tabsContent.map((tab, index) => (
            React.cloneElement(tab.content, {
              key: index,
              data,
              handleInputChange,
              handleSubmit
            })
          ))
        }


      </Tabs>

    </div>
  )
}

export default CadastrarProduto

