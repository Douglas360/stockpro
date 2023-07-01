import React from 'react'
import { AuthProvider } from './AuthContext'
import { RegisterProvider } from './RegisterContext'
import { ProductProvider } from './ProductContext'
import { OrderProvider } from './OrderContext'



export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <ProductProvider>
                 <OrderProvider>
                    {children}
                    </OrderProvider>
                </ProductProvider>
            </RegisterProvider>
        </AuthProvider>


    )
}
