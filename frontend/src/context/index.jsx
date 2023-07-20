import React from 'react'
import { AuthProvider } from './AuthContext'
import { RegisterProvider } from './RegisterContext'
import { ProductProvider } from './ProductContext'
import { OrderProvider } from './OrderContext'
import { InvoiceProvider } from './InvoiceContext'
import { InventoryProvider } from './InventoryContext'



export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <RegisterProvider>
                <ProductProvider>
                    <OrderProvider>
                        <InvoiceProvider>
                            <InventoryProvider>
                                {children}
                            </InventoryProvider>
                        </InvoiceProvider>
                    </OrderProvider>
                </ProductProvider>
            </RegisterProvider>
        </AuthProvider>


    )
}
