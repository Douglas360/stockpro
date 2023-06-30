import axios from 'axios';
import { toast } from 'react-toastify';

export const GetCep = async (cep) => {
    const cepNumber = cep.replace(/[^\d]+/g, '');

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepNumber}/json/`);

        return response.data

    } catch (error) {
        console.log(error)
        const message =
            'CEP Inválido';
        toast.error(message, {
            autoClose: 2000,
            hideProgressBar: true,
        });
    }
};
