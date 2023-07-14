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
            }
        }
        return handleRequest(api.put(`/carrier/${data.id}`, carrierData), 'Transportadora atualizada com sucesso');
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
                listAllSuppliers,
                deleteSupplier,
                createCarrier,
                getCarrierById,
                updateCarrier,
                listAllCarriers,
                deleteCarrier,
                createProduct,



            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
