import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

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

    //function to list inventory by id_company
    const listInventory = async (id_company) => {
        return handleRequest(api.get(`/dashboard/inventory/${id_company}`));
    };

    //function to list inventory movement by id_company
    const listInventoryMovement = async (id_company) => {
        return handleRequest(api.get(`/dashboard/inventory/movement/${id_company}`));
    };

    //function to list sales by id_company
    const listSales = async (id_company) => {
        return handleRequest(api.get(`/dashboard/sales/${id_company}`));
    };

    //function to list budget by id_company
    const listBudget = async (id_company) => {
        return handleRequest(api.get(`/dashboard/budgets/${id_company}`));
    };

    //funtion to list data to chart
    const listSaleChart = async (id_company) => {
        return handleRequest(api.get(`/order/chart/${id_company}`))
    };

    //funtion to list data to chart
    const listBudgetChart = async (id_company) => {
        return handleRequest(api.get(`/budget/chart/${id_company}`))
    }


    return (
        <DashboardContext.Provider
            value={{
                loading,
                listAllOrders,
                listInventory,
                listInventoryMovement,
                listSales,
                listBudget,
                listSaleChart,
                listBudgetChart


            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};