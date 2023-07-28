import { useContext } from 'react';
import { ReportContext } from '.';


export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error('useReport must be used within an AuthProvider');
    }
    return context;
}

