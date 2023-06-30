import React from 'react'
import { AuthProvider } from './AuthContext'
import { RegisterProvider } from './RegisterContext'
import { ProductProvider } from './ProductContext'



export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </RegisterProvider>
        </AuthProvider>


    )
}
