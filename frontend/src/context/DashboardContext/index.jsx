import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext/useAuth';


export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {   
  
    const [orders, setOrders] = useState([]);

    //useEffect to list all orders by id_company
    useEffect(() => {
        async function loadOrders() {
            const response = await listAllOrders(1);
            console.log(response)
            setOrders(response);
        }
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
       
    //

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

    //function to list all orders by id_company
    const listAllOrders = async (id_company) => {
        return handleRequest(api.get(`/dashboard/${id_company}`));
    };

    return (
        <DashboardContext.Provider
            value={{
                loading,
                orders,
                listAllOrders


            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};