import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const handleRequest = async (requestPromise, message) => {
        try {
            setLoading(true);
            const response = await requestPromise;
            toast.success(message, {
                autoClose: 2000,
            });
            return response.data;
        } catch (error) {
            console.log(error)
            const message =
                ERROR_MESSAGES[error.response?.data.error] || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    // Function to create a Customer
    const createCustomer = async (data) => {
        return handleRequest(api.post('/customer', data), 'Cliente cadastrado com sucesso');
    };

    //function to list all Customers by company id in query params
    const listAllCustomers = async (data) => {
        return handleRequest(api.get(`/list/customer/id_company?id=${data}`))
    };

    //function to get a Customer by id
    const getCustomerById = async (data) => {
        return handleRequest(api.get(`/customer/${data}`))
    };

    //function to update a Customer by id 
    const updateCustomer = async (data) => {
        const customerData = {
            "customerData": {
                "nome": data.nomeCliente || data.razaoSocialCliente,
                "tipo_cliente": data.tipoCliente,
                "ativo": data.situacaoCliente, // "ativo" ou "inativo
                "cpf": data.cpfCliente,
                "cnpj": data.cnpjCliente,
                "email": data.emailCliente,
                "rg_representante": data.rgCliente,
                "dt_nascimento": new Date(data.dataNascimentoCliente),
                "telefone": data.telefoneCliente,
                "inscricao_estadual": data.inscricaoEstadualCliente,
                "inscricao_municipal": data.inscricaoMunicipalCliente,
                "inscricao_suframa": data.inscricaoSuframaCliente,
                "tipo_contribuinte": data.tipoContribuinteCliente,
                "observacao": data.observacaoCliente,
            }
        }
        return handleRequest(api.put(`/customer/${data.id}`, customerData), 'Cliente atualizado com sucesso');
    };

    //function to delete a Customer by id
    const deleteCustomer = async (data) => {
        return handleRequest(api.delete(`/delete/customer/${data}`), 'Cliente deletado com sucesso');
    };

    //function to create a Supplier
    const createSupplier = async (data) => {
        return handleRequest(api.post('/supplier', data), 'Fornecedor cadastrado com sucesso');
    };

    //function to get a Supplier by id
    const getSupplierById = async (data) => {
        return handleRequest(api.get(`/supplier/${data}`))
    };

    //function to update a Supplier by id
    const updateSupplier = async (data) => {

        const supplierData = {
            "supplierData": {
                "nome": data.nomeCliente || data.razaoSocialCliente,
                "tipo_fornecedor": data.tipoCliente,
                "ativo": data.situacaoCliente, // "ativo" ou "inativo
                "cpf": data.cpfCliente,
                "cnpj": data.cnpjCliente,
                "email": data.emailCliente,
                "rg_representante": data.rgCliente,
                "dt_nascimento": data.dataNascimentoCliente,
                "telefone": data.telefoneCliente,
                "inscricao_estadual": data.inscricaoEstadualCliente,
                "inscricao_municipal": data.inscricaoMunicipalCliente,
                "inscricao_suframa": data.inscricaoSuframaCliente,
                "tipo_contribuinte": data.tipoContribuinteCliente,
                "observacao": data.observacaoCliente,
                //"enderecos": data.enderecos,
            }
        }
        return handleRequest(api.put(`/supplier/${data.id}`, supplierData), 'Fornecedor atualizado com sucesso');
    };
    //function to list all Suppliers by company id in query params
    const listAllSuppliers = async (data) => {
        return handleRequest(api.get(`/list/supplier/id_company?id=${data}`))
    };

    //function to delete a Supplier by id
    const deleteSupplier = async (data) => {
        return handleRequest(api.delete(`/delete/supplier/${data}`), 'Fornecedor deletado com sucesso');
    };

    //function to create a Carrier
    const createCarrier = async (data) => {
        return handleRequest(api.post('/carrier', data), 'Transportadora cadastrada com sucesso');
    };

    //function to list all Carriers by company id in query params
    const listAllCarriers = async (data) => {
        return handleRequest(api.get(`/list/carrier/id_company?id=${data}`))
    };

    //function to delete a Carrier by id
    const deleteCarrier = async (data) => {
        return handleRequest(api.delete(`/delete/carrier/${data}`), 'Transportadora deletada com sucesso');
    };

    //function to create a Product
    const createProduct = async (data) => {
        return handleRequest(api.post('/product', data), 'Produto cadastrado com sucesso');
    };

    //function to get a Carrier by id
    const getCarrierById = async (data) => {
        return handleRequest(api.get(`/carrier/${data}`))
    };

    //function to update a Carrier by id
    const updateCarrier = async (data) => {
        const carrierData = {
            "carrierData": {
                "nome": data.nomeCliente || data.razaoSocialCliente,
                "tipo_transportadora": data.tipoCliente,
                "ativo": data.situacaoCliente, // "ativo" ou "inativo
                "cpf": data.cpfCliente,
                "cnpj": data.cnpjCliente,
                "email": data.emailCliente,
                "rg_representante": data.rgCliente,
                "dt_nascimento": data.dataNascimentoCliente,
                "telefone": data.telefoneCliente,
                "inscricao_estadual": data.inscricaoEstadualCliente,
                "inscricao_municipal": data.inscricaoMunicipalCliente,
                "inscricao_suframa": data.inscricaoSuframaCliente,
                "tipo_contribuinte": data.tipoContribuinteCliente,
                "observacao": data.observacaoCliente,
            }
        }
        return handleRequest(api.put(`/carrier/${data.id}`, carrierData), 'Transportadora atualizada com sucesso');
    };

    //function to list a Company by id
    const listCompany = async (data) => {
        return handleRequest(api.get(`/company/${data}`))
    };

    //function to update a Company by id
    const updateCompany = async (id, data) => {
        return handleRequest(api.put(`/company/${id}`, data), 'Empresa atualizada com sucesso');
    };

    //FUnction to list user
    const listUser = async (id_company) => {
        return handleRequest(api.get(`/list/user/id_company/${id_company}`));
    };

    //Function to create user
    const createUser = async (data) => {

        return handleRequest(api.post('/user', data), 'Usuário cadastrado com sucesso');
    };
    //function to delete user
    const deleteUser = async (data) => {
        return handleRequest(api.delete(`/delete/user/${data}`), 'Usuário deletado com sucesso');
    };
    //function to update user
    const updateUser = async (data) => {
        return handleRequest(api.put(`/update/user/${data.id}`, data), 'Usuário atualizado com sucesso');
    };
    //function to get a user by id
    const getUserById = async (data) => {
        return handleRequest(api.get(`/user/${data}`))
    };

    return (
        <RegisterContext.Provider
            value={{
                loading,
                createCustomer,
                getCustomerById,
                listAllCustomers,
                updateCustomer,
                deleteCustomer,
                createSupplier,
                getSupplierById,
                updateSupplier,
                listAllSuppliers,
                deleteSupplier,
                createCarrier,
                getCarrierById,
                updateCarrier,
                listAllCarriers,
                deleteCarrier,
                createProduct,
                listCompany,
                updateCompany,
                listUser,
                createUser,
                deleteUser,
                updateUser,
                getUserById,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
