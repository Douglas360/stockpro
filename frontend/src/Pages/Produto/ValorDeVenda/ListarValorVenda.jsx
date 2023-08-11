import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../../components/SearchBar';
import { useProduct } from '../../../context/ProductContext/useProduct';

const ListarValorVenda = () => {
  const { listSalePrices, loading } = useProduct();
  const [valorVenda, setValorVenda] = useState([]);

  const loadSalePrices = async () => {
    const response = await listSalePrices();
    setValorVenda(response);
  };

  useEffect(() => {
    loadSalePrices();
  }, []);


  const columns = ['Cód', 'Nome', 'Lucro sugerido'];

  const value = valorVenda?.map((salePrice) => {
    return {
      id: salePrice.id_lucro_sugerido,
      nome: salePrice.descricao,
      lucro: salePrice.valor
    };
  });

  return (
    <>
      <SearchBar
        urlNavigate={'/produto/valores/cadastrar'}
        columns={columns}
        rows={value}
        msgDelete={'Valor Venda'}
      />


    </>
  );
};

export default ListarValorVenda;
