import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

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

    //function to create a Product
    const createProduct = async (data) => {

        return handleRequest(api.post('/product', data), 'Produto cadastrado com sucesso');
    };

    // function to get a Product by id
    const getProduct = async (data) => {
        return handleRequest(api.get(`/product/${data}`))
    };

    //function to update a Product by id
    const updateProduct = async (data, id) => {
        //return handleRequest(api.put(`/product/${data.productData.id_produto}`, data), 'Produto atualizado com sucesso');
        return handleRequest(api.put(`/product/${id}`, data), 'Produto atualizado com sucesso');
    };

    //function to list all Products 
    const listProducts = async (data) => {
        return handleRequest(api.get(`/list/product/id_company?id=${data}`))
    };

    //function to delete a Product by id
    const deleteProduct = async (data) => {
        return handleRequest(api.delete(`/delete/product/${data}`), 'Produto deletado com sucesso');
    };

    //function to create a SalePrice
    const createSalePrice = async (data) => {
        return handleRequest(api.post('/saleprice', data), 'Preço de venda cadastrado com sucesso');
    };

    //function to list all SalePrices
    const listSalePrices = async () => {
        return handleRequest(api.get('/list/saleprice'));
    };
    //function to delete a SalePrice by id
    const deleteSalePrice = async (data) => {
        return handleRequest(api.delete(`/delete/saleprice/${data}`), 'Preço de venda deletado com sucesso');
    };
    //function to update a SalePrice by id
    const updateSalePrice = async (data) => {
        return handleRequest(api.put(`/update/saleprice/${data.id}`, data), 'Preço de venda atualizado com sucesso');
    };
    //function to delete file
    const deleteFile = async (id) => {
        return handleRequest(api.delete(`/delete/product/file/${id}`), 'Arquivo deletado com sucesso');
    };


    return (
        <ProductContext.Provider
            value={{
                loading,
                createProduct,
                getProduct,
                updateProduct,
                listProducts,
                deleteProduct,
                createSalePrice,
                listSalePrices,
                deleteSalePrice,
                updateSalePrice,
                deleteFile,



            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
