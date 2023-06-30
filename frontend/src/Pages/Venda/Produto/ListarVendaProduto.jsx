import React from 'react';

import { SearchBar } from '../../../components/SearchBar';

const ListarVendaProduto = () => {


    const columns = ['Nº', 'Nome', 'Tipo', 'Ativo', 'Telefone', 'Celular', 'E-mail', 'Cadastrado em'];
    const clients = [
        { id: 1, nome: 'John Doe', tipo: 'Regular', ativo: 'Sim', telefone: '123456789', celular: '987654321', email: 'john.doe@example.com', cadastrado: '2022-01-01' },
        { id: 2, nome: 'Jane Smith', tipo: 'Premium', ativo: 'Sim', telefone: '987654321', celular: '123456789', email: 'jane.smith@example.com', cadastrado: '2022-02-01' },
        { id: 3, nome: 'Alice Johnson', tipo: 'Regular', ativo: 'Não', telefone: '555555555', celular: '999999999', email: 'alice.johnson@example.com', cadastrado: '2022-03-01' },
        { id: 4, nome: 'Bob Williams', tipo: 'Premium', ativo: 'Sim', telefone: '111111111', celular: '222222222', email: 'bob.willians@example.com', cadastrado: '2022-04-01' },
        { id: 5, nome: 'Mary Brown', tipo: 'Regular', ativo: 'Não', telefone: '333333333', celular: '444444444', email: '', cadastrado: '2022-05-01' },
        { id: 6, nome: 'James Jones', tipo: 'Premium', ativo: 'Sim', telefone: '666666666', celular: '777777777', email: '    ', cadastrado: '2022-06-01' },
        { id: 7, nome: 'Patricia Miller', tipo: 'Regular', ativo: 'Não', telefone: '888888888', celular: '000000000', email: 'patricia.mueler@example.com', cadastrado: '2022-07-01' },
        { id: 8, nome: 'David Martinez', tipo: 'Premium', ativo: 'Sim', telefone: '444444444', celular: '555555555', email: 'david.martinez@example.com', cadastrado: '2022-08-01' },
        { id: 9, nome: 'Olivia Harris', tipo: 'Regular', ativo: 'Não', telefone: '333333333', celular: '222222222', email: 'olivia.harris@example.com', cadastrado: '2022-09-01' },
        { id: 10, nome: 'Daniel Clark', tipo: 'Premium', ativo: 'Sim', telefone: '999999999', celular: '888888888', email: 'daniel.clark@example.com', cadastrado: '2022-10-01' },
        { id: 11, nome: 'Sophia Rodriguez', tipo: 'Regular', ativo: 'Sim', telefone: '777777777', celular: '444444444', email: 'sophia.rodriguez@example.com', cadastrado: '2022-11-01' },
        { id: 12, nome: 'Matthew Lee', tipo: 'Premium', ativo: 'Não', telefone: '555555555', celular: '111111111', email: 'matthew.lee@example.com', cadastrado: '2022-12-01' },
        { id: 13, nome: 'Ava Walker', tipo: 'Regular', ativo: 'Sim', telefone: '666666666', celular: '333333333', email: 'ava.walker@example.com', cadastrado: '2023-01-01' },
        { id: 14, nome: 'Ethan Hall', tipo: 'Premium', ativo: 'Sim', telefone: '111111111', celular: '444444444', email: 'ethan.hall@example.com', cadastrado: '2023-02-01' },
        { id: 15, nome: 'Mia Perez', tipo: 'Regular', ativo: 'Não', telefone: '222222222', celular: '555555555', email: 'mia.perez@example.com', cadastrado: '2023-03-01' },
        { id: 16, nome: 'James Mitchell', tipo: 'Premium', ativo: 'Sim', telefone: '777777777', celular: '666666666', email: 'james.mitchell@example.com', cadastrado: '2023-04-01' },
        { id: 17, nome: 'Charlotte Collins', tipo: 'Regular', ativo: 'Sim', telefone: '888888888', celular: '999999999', email: 'charlotte.collins@example.com', cadastrado: '2023-05-01' },
        { id: 18, nome: 'Benjamin Adams', tipo: 'Premium', ativo: 'Sim', telefone: '555555555', celular: '333333333', email: 'benjamin.adams@example.com', cadastrado: '2023-06-01' },
        { id: 19, nome: 'Amelia Turner', tipo: 'Regular', ativo: 'Não', telefone: '444444444', celular: '222222222', email: 'amelia.turner@example.com', cadastrado: '2023-07-01' },
        { id: 20, nome: 'Logan Parker', tipo: 'Premium', ativo: 'Sim', telefone: '666666666', celular: '888888888', email: 'logan.parker@example.com', cadastrado: '2023-08-01' }

    ];

    return (
        <>
            <SearchBar
                urlNavigate={'/venda/produto/cadastrar'}
                columns={columns}
                rows={clients}
                msgDelete={'Venda Produto'}
            />


        </>
    );
};

export default ListarVendaProduto;
