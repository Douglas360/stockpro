import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../config/ErrorMessage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = true
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
          
        } else {
            console.log("first")
        }
    }, []);

    // Function to login
    const signIn = async (data) => {
        setLoading(true);

        try {
            const response = await api.post('/session', data);
            const { token, ...userData } = response.data;

            storeUserDataAndToken(userData, token, data.rememberMe);

            toast.success('Login realizado com sucesso!', {
                autoClose: 800,
                onClose: () => navigate('/dashboards/basic'),
                hideProgressBar: true,
            });
        } catch (error) {
            const message = ERROR_MESSAGES[error.response?.data?.error] || 'Erro desconhecido';

            toast.error(message, {
                autoClose: 1000,
            });
        } finally {
            setLoading(false);
        }
    };

    const storeUserDataAndToken = (userData, token, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(userData.user);
        console.log(userData.user)
        storage.setItem('user', JSON.stringify(userData.user));
        storage.setItem('token', token, { path: '/' });


    };

    // Function to logout
    const signOut = () => {
        setUser(null);
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
