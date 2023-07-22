import React from 'react'
import { AuthProvider } from './AuthContext'
import { RegisterProvider } from './RegisterContext'
import { ProductProvider } from './ProductContext'
import { OrderProvider } from './OrderContext'
import { InvoiceProvider } from './InvoiceContext'
import { InventoryProvider } from './InventoryContext'
import { BudgetProvider } from './BudgetContext'
import { DashboardProvider } from './DashboardContext'



export const CombinedProvider = ({ children }) => {
    return (
        <AuthProvider>
            <DashboardProvider>
                <RegisterProvider>
                    <ProductProvider>
                        <OrderProvider>
                            <InvoiceProvider>
                                <InventoryProvider>
                                    <BudgetProvider>
                                        {children}
                                    </BudgetProvider>
                                </InventoryProvider>
                            </InvoiceProvider>
                        </OrderProvider>
                    </ProductProvider>
                </RegisterProvider>
            </DashboardProvider>
        </AuthProvider>


    )
}
