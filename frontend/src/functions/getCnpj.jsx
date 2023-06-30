import axios from 'axios';
import { toast } from 'react-toastify';

export const GetCnpj = async (cnpj) => {
    const cnpjNumber = cnpj.replace(/[^\d]+/g, '');


    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpjNumber}`);

        return response.data

    } catch (error) {
        console.log(error)
        const message =
            'CNPJ Inválido';
        toast.error(message, {
            autoClose: 2000,
            hideProgressBar: true,
        });
    }
};
