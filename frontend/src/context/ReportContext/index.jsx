import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {

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

    //function to get the report about the customers
    const getReportCustomers = async (data) => {
        return await handleRequest(api.post(`/report/customer/${data.report?.id_empresa}`, data));
    };
    //function to get the report about the products
    const getReportProducts = async (data) => {
        return await handleRequest(api.post(`/report/product/${data.report?.id_empresa}`, data));
    };
    //function to get the report about the budgets
    const getReportBudgets = async (data) => {
        return await handleRequest(api.post(`/report/budget/${data.report?.id_empresa}`, data));
    };
    //function to get the report about the sales
    const getReportSales = async (data) => {
        return await handleRequest(api.post(`/report/sale/${data.report?.id_empresa}`, data));
    };
    //function to get the report about the products sold
    const getReportProductsSold = async (data) => {
        return await handleRequest(api.post(`/report/sale/product/${data.report?.id_empresa}`, data));
    };
    //function to get the report about suppliers
    const getReportSuppliers = async (data) => {
        return await handleRequest(api.post(`/report/supplier/${data.report?.id_empresa}`, data));
    };
    //function to get the report about the carriers
    const getReportCarriers = async (data) => {
        return await handleRequest(api.post(`/report/carrier/${data.report?.id_empresa}`, data));
    };

    const getReportCustomerBuy = async (data) => {
        return await handleRequest(api.post(`/report/customer/sale/${data.report?.id_empresa}`, data));
    };

    return (
        <ReportContext.Provider
            value={{
                loading,
                getReportCustomers,
                getReportProducts,
                getReportBudgets,
                getReportSales,
                getReportProductsSold,
                getReportSuppliers,
                getReportCarriers,
                getReportCustomerBuy,

            }}
        >
            {children}
        </ReportContext.Provider>
    );
};