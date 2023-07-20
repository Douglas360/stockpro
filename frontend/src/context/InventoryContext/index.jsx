import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {

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
                error.response?.data.error || 'Erro desconhecido';
            toast.error(message, {
                autoClose: 4000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    //function to list inventory by id product
    const listInventoryById = async (id) => {
        return handleRequest(api.get(`/inventory/${id}`));
    };


    return (
        <InventoryContext.Provider
            value={{
                loading,
                listInventoryById,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};