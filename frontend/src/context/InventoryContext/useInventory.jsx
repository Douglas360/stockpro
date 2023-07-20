import { useContext } from 'react';
import { InventoryContext } from '.';


export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an AuthProvider');
    }
    return context;
}

