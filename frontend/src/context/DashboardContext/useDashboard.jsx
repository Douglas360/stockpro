import { useContext } from 'react';
import { DashboardContext } from '.';


export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within an AuthProvider');
    }
    return context;
}

