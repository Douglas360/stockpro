import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useProduct } from '../../../context/ProductContext/useProduct';
import { dateFormatWithHours } from '../../../functions/getFomatter';

const ListarProdutos = () => {
  const { listProducts, deleteProduct, loading } = useProduct();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await listProducts(1);
    console.log(response)

    setProducts(response);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  const columns = ['Cód', 'Nome', 'Vr. venda', 'Estoque', 'Cadastrado em'];
  const clients = products?.map((product) => {
    return {
      id: product.codigo_interno,
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
        rows={clients}
        handleDeleteData={handleDelete}
        loading={loading}
        msgDelete={'Produto'}
      />


    </>
  );
};

export default ListarProdutos;
