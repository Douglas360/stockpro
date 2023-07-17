import React, { useEffect, useState } from 'react'
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
import { CustomSpinner } from '../../../components/CustomSpinner';
import { useAuth } from '../../../context/AuthContext/useAuth';
import { useParams } from 'react-router-dom';

const CadastrarProduto = () => {
  const [data, setData] = useState(product || []);
  const { createProduct, loading, getProduct, updateProduct } = useProduct();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isEditMode = !!id;
  const id_empresa = 1
  const { user } = useAuth();

  useEffect(() => {
    //if is edit mode, get product by id
    if (isEditMode) {
      const loadProduct = async () => {
        const response = await getProduct(id)
       console.log(response)
        setProduct({
          id_produto: response?.id_produto,
          nomeProduto: response.nome,
          codigoInterno: response.codigo_interno,
          codigoBarra: response.codigo_barra,
          movimentaEstoque: response.movimenta_estoque,
          habilitarNf: response.habilitar_nfce,
          validade: response.validade,
          //id_usuario: 1,
          id_empresa: id_empresa,
          pesoProduto: response.peso_kg,
          alturaProduto: response.altura_cm,
          larguraProduto: response.largura_cm,
          comprimentoProduto: response.comprimento_cm,
          extraFields: response.campos,
          descricaoProduto: response.descricao,
          produtoAtivo: response.ativo,
          valorCusto: response.valor_custo,
          despesasAcessorias: response.despesas_acessorias,
          outrasDespesas: response.despesas_outras,
          custoFinal: response.custo_final,
          valorVendaUtilizado: response.valor_venda,
          id_estoque: response.estoque[0]?.id_estoque,
          estoqueMinimo: response.estoque[0]?.estoque_min,
          estoqueMaximo: response.estoque[0]?.estoque_max,
          estoqueAtual: response.estoque[0]?.quantidade,
          codigoNcm: response.codigo_ncm,
          codigoCest: response.codigo_cest,
          codigoBeneficio: response.codigo_beneficio,
          origemProduto: response.origem,
          pesoLiquido: response.peso_liquido,
          pesoBruto: response.peso_bruto,
          numeroFci: response.numero_fci,
          VrAproxTribut: response.vl_tribut,
          cfop: response.cfop,
          fornecedor: response.id_fornecedor,
          valorFixoPis: response.vl_fixo_pis,
          valorFixoCofins: response.vl_fixo_cofins,
          valorFixoPisSt: response.vl_fixo_pis_st,
          valorFixoCofinsSt: response.vl_fixo_cofins_st,
        })
        setData({
          ...data,
          id_produto: response?.id_produto,
          nomeProduto: response.nome,
          codigoInterno: response.codigo_interno,
          codigoBarra: response.codigo_barra,
          movimentaEstoque: response.movimenta_estoque,
          habilitarNf: response.habilitar_nfce,
          validade: response.validade,
          //id_usuario: 1,        
          id_empresa: id_empresa,
          pesoProduto: response.peso_kg,
          alturaProduto: response.altura_cm,
          larguraProduto: response.largura_cm,
          comprimentoProduto: response.comprimento_cm,
          camposExtras: response.campos,
          descricaoProduto: response.descricao,
          produtoAtivo: response.ativo,
          valorCusto: response.valor_custo,
          despesasAcessorias: response.despesas_acessorias,
          outrasDespesas: response.despesas_outras,
          custoFinal: response.custo_final,
          valorVendaUtilizado: response.valor_venda,
          id_estoque: response.estoque[0]?.id_estoque,
          estoqueMinimo: response.estoque[0]?.estoque_min,
          estoqueMaximo: response.estoque[0]?.estoque_max,
          estoqueAtual: response.estoque[0]?.quantidade,
          codigoNcm: response.codigo_ncm,
          codigoCest: response.codigo_cest,
          codigoBeneficio: response.codigo_beneficio,
          origemProduto: response.origem,
          pesoLiquido: response.peso_liquido,
          pesoBruto: response.peso_bruto,
          numeroFci: response.numero_fci,
          VrAproxTribut: response.vl_tribut,
          cfop: response.cfop,
          fornecedor: response.id_fornecedor,
          valorFixoPis: response.vl_fixo_pis,
          valorFixoCofins: response.vl_fixo_cofins,
          valorFixoPisSt: response.vl_fixo_pis_st,
          valorFixoCofinsSt: response.vl_fixo_cofins_st,
        

        })
      }
      loadProduct()
    }
  }, [isEditMode, id])

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setData((prevData) => ({
      ...prevData,
      id_empresa: id_empresa,
      id_usuario: user?.id_usuario,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if is edit mode, pass id to data
    if (isEditMode) {

      const newData = {

        "productData": {
          ...data
        }

      }

      await updateProduct(newData)
    } else {
      await createProduct(data)

    }

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
      {!isEditMode || product ? (
        <>
          <PageTitle
            heading={isEditMode ? 'Editar produto' : 'Cadastrar produto'}
            subheading={isEditMode ? 'Editar Cadastro de produto' : 'Cadastrar Cadastro de produto'}
            icon="pe-7s-box1 icon-gradient bg-amy-crisp"
          />
          <Tabs
            tabsWrapperClass="body-tabs body-tabs-layout"
            transform={false}
            showInkBar={true}
            items={tabsContent}
          >
            {tabsContent.map((tab, index) => (
              React.cloneElement(tab.content, {
                key: index,
                data,
                handleInputChange,
                handleSubmit,
              })
            ))}
          </Tabs>
        </>
      ) : (
        <CustomSpinner />
      )}
    </div>
  );

}

export default CadastrarProduto

