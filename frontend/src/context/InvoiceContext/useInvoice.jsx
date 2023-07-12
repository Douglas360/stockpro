import { useContext } from 'react';
import { InvoiceContext } from './index';

export const useInvoice = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoice must be used within an AuthProvider');
    }
    return context;
}

