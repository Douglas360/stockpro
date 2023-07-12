import React from 'react'
import { AuthProvider } from './AuthContext'
import { RegisterProvider } from './RegisterContext'
import { ProductProvider } from './ProductContext'
import { OrderProvider } from './OrderContext'
import { InvoiceProvider } from './InvoiceContext'



export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <ProductProvider>
                    <OrderProvider>
                        <InvoiceProvider>
                            {children}
                        </InvoiceProvider>
                    </OrderProvider>
                </ProductProvider>
            </RegisterProvider>
        </AuthProvider>


    )
}
