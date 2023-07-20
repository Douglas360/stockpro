import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { dateFormatWithHours } from '../../../functions/getFomatter';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ListarProdutoEstoque = () => {
  const { listProducts, deleteProduct, loading } = useProduct();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const idEmpresa = sessionStorage?.getItem('user') || localStorage?.getItem('user');
  const id = JSON.parse(idEmpresa).id_empresa;
  const loadProducts = async () => {
    const response = await listProducts(id)//id_empresa   

    setProducts(response);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  const columns = ['ID','Cód. Interno', 'Nome', 'Vr. venda', 'Estoque', 'Cadastrado em'];
  const columnsToFilter = ['nome', 'email', 'telefone', 'celular'];

  const actions = [
    {
      label: 'Movimentação',
      icon: faRightLeft,
      color: 'black',
      onClick: (product) => {
        navigate(`/estoque/movimentacao/editar/${product.id}`);
      },
    },
  ];

  const clients = products?.map((product) => {
    return {
      id: product.id_produto,
      cod: product.codigo_interno,
      nome: product.nome,
      price: 'R$ ' + product.valor_venda?.toString().replace('.', ','),
      stock: product.estoque[0].quantidade,
      created_at: dateFormatWithHours(product.createdAt),
    };
  });

  return (
    <>
      <SearchBar
        urlNavigate={'/produto/gerenciar/cadastrar'}
        columns={columns}
        columnsToFilter={columnsToFilter}
        rows={clients}
        handleDeleteData={handleDelete}
        loading={loading}
        msgDelete={'Produto'}
        actions={actions}
        noActions={true}
      />


    </>
  );
};

export default ListarProdutoEstoque;
