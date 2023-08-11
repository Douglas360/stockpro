import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
    /*const navigate = useNavigate();*/
    const [invoiceLoading, setInvoiceLoading] = useState(false);

    /*const handleRequestCreate = async (requestPromise, successMessage) => {
        try {
            setInvoiceLoading(true);
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
            setInvoiceLoading(false);
        }
    };*/

    const handleRequest = async (requestPromise, message) => {
        try {
            setInvoiceLoading(true);
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
            setInvoiceLoading(false);
        }
    };

    //function to create invoice
    const createInvoice = async (data) => {

        return handleRequest(api.post('/invoice', data), 'Nota fiscal enviada para processamento');
    };

    //function to get invoice
    const getInvoice = async (id) => {
        return handleRequest(api.get(`/list/invoice/${id}`));
    };

    //function to get all invoices
    const getAllInvoices = async (id_company) => {
        return handleRequest(api.get('/list/invoice/company_id/' + id_company));
    };

    //function to cancel invoice
    const cancelInvoice = async (data) => {

        return handleRequest(api.put(`/invoice/${data.id}`, data), 'Nota fiscal cancelada com sucesso');
    };
    return (
        <InvoiceContext.Provider
            value={{             
                invoiceLoading,
                createInvoice,
                getInvoice,
                getAllInvoices,
                cancelInvoice

            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};