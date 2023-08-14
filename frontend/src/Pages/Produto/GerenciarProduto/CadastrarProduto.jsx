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
//import { useAuth } from '../../../context/AuthContext/useAuth';
import { useNavigate, useParams } from 'react-router-dom';

const CadastrarProduto = () => {
  const [data, setData] = useState(product || []);
  const { createProduct, loading, getProduct, updateProduct } = useProduct();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const isEditMode = !!id;
  const idSession = sessionStorage?.getItem('user') || localStorage?.getItem('user');
  const id_empresa = JSON.parse(idSession).id_empresa;
  const id_usuario = JSON.parse(idSession).id;
  const navigate = useNavigate();

  useEffect(() => {
    //if is edit mode, get product by id
    if (isEditMode) {
      const loadProduct = async () => {
        const response = await getProduct(id)
        setProduct({
          id_produto: response?.id_produto,
          nomeProduto: response.nome,
          codigoInterno: response.codigo_interno,
          codigoBarra: response.codigo_barra,
          movimentaEstoque: response.movimenta_estoque,
          habilitarNf: response.habilitar_nfce,
          validade: response.validade,
          id_usuario: id_usuario,
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
          fileUrl: response?.FotoProduto[0]?.caminho,
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
          id_usuario: id_usuario,
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
          fileUrl: response?.FotoProduto[0]?.caminho,


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
      id_usuario: id_usuario,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if is edit mode, pass id to data
    const formData = new FormData();

    formData.append('id_empresa', id_empresa);
    formData.append('id_produto', data.id_produto);
    formData.append('id_estoque', data.id_estoque);
    formData.append('id_usuario', Number(id_usuario));
    formData.append('nomeProduto', data.nomeProduto);
    formData.append('codigoInterno', data.codigoInterno);
    formData.append('codigoBarra', data.codigoBarra);
    formData.append('movimentaEstoque', data.movimentaEstoque);
    formData.append('habilitarNf', data.habilitarNf);
    formData.append('validade', data.validade);
    formData.append('pesoProduto', data.pesoProduto);
    formData.append('alturaProduto', data.alturaProduto);
    formData.append('larguraProduto', data.larguraProduto);
    formData.append('comprimentoProduto', data.comprimentoProduto);
    formData.append('camposExtras', JSON.stringify(data.camposExtras));
    formData.append('descricaoProduto', data.descricaoProduto);
    formData.append('ativo', data.produtoAtivo);
    formData.append('valorCusto', data.valorCusto);
    formData.append('despesasAcessorias', data.despesasAcessorias);
    formData.append('outrasDespesas', data.outrasDespesas);
    formData.append('custoFinal', data.custoFinal);
    formData.append('valorVendaUtilizado', data.valorVendaUtilizado);
    formData.append('estoqueMinimo', data.estoqueMinimo);
    formData.append('estoqueMaximo', data.estoqueMaximo);
    formData.append('estoqueAtual', data.estoqueAtual);
    formData.append('codigoNcm', data.codigoNcm);
    formData.append('codigoCest', data.codigoCest);
    formData.append('codigoBeneficio', data.codigoBeneficio);
    formData.append('origemProduto', data.origemProduto);
    formData.append('pesoLiquido', data.pesoLiquido);
    formData.append('pesoBruto', data.pesoBruto);
    formData.append('numeroFci', data.numeroFci);
    formData.append('VrAproxTribut', data.VrAproxTribut);
    formData.append('valorFixoPis', data.valorFixoPis);
    formData.append('valorFixoCofins', data.valorFixoCofins);
    formData.append('valorFixoPisSt', data.valorFixoPisSt);
    formData.append('valorFixoCofinsSt', data.valorFixoCofinsSt);
    formData.append('cfop', data.cfop);
    formData.append('fornecedor', data.fornecedor);
    formData.append('file', data.file);

    if (isEditMode) {

      await updateProduct(formData, data.id_produto).then(
        (response) => {
          if (response) {
            navigate('/produto/gerenciar')
          }
        }
      )


    } else {

      await createProduct(formData).then
        (
          (response) => {
            if (response) {
              navigate('/produto/gerenciar')
            }
          }
        )
    }

  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Capturar o primeiro arquivo selecionado

    setData((prevData) => ({
      ...prevData,
      file: selectedFile, // Atualizar o estado com o arquivo selecionado
    }));
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
      content: <Fotos data={data} handleFileChange={handleFileChange} handleSubmit={handleSubmit} Loading={Loading} />,
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

