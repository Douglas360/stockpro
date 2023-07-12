import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRequestCreate = async (requestPromise, successMessage) => {
        try {
            setLoading(true);
            const response = await requestPromise;
            console.log(response)
            if (response.data.status) {
                const errorMessage =
                    response.data.mensagem_sefaz || 'Erro desconhecido Sefaz';

                toast.error(errorMessage, {
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            } else {
                toast.success(successMessage, {
                    autoClose: 2000,
                });
                navigate(`/nota-fiscal/${response.data.id_nota_fiscal}`);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data.error || 'Erro desconhecido';
            toast.error(errorMessage, {
                autoClose: 3000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

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
                autoClose: 2000,
                hideProgressBar: true,
            });
        } finally {
            setLoading(false);
        }
    };

    //function to create invoice
    const createInvoice = async (data) => {
        //console.log(data)
        return handleRequest(api.post('/invoice', data), 'Nota fiscal emitida com sucesso');
    };

    //function to get invoice
    const getInvoice = async (id) => {
        return handleRequest(api.get(`/list/invoice/${id}`));
    };

    //function to get all invoices
    const getAllInvoices = async (id_company) => {
        return handleRequest(api.get('/list/invoice/company_id/' + id_company));
    };


    return (
        <InvoiceContext.Provider
            value={{
                loading,
                createInvoice,
                getInvoice,
                getAllInvoices

            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};