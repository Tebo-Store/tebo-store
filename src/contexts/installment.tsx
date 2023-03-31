import React, { FC, useState } from "react";

interface InstallmentProduct {
    firstPayment: number;
    monthlyPayment: number;
    totalPrice: number;
    month: number;
}

interface State {
    installmentProduct: InstallmentProduct | null,
    setInstallmentProduct: React.Dispatch<React.SetStateAction<InstallmentProduct | null>>
}

const InstallmentContext = React.createContext<State | null>(null)

export const InstallmentContextProvider: FC = ({ children }) => {
    const [installmentProduct, setInstallmentProduct] = useState<InstallmentProduct | null>(null)

    return <InstallmentContext.Provider value={{
        installmentProduct,
        setInstallmentProduct,
    }}>
        {children}
    </InstallmentContext.Provider>
}

export const useInstallmentContext = () => {
    const context = React.useContext(InstallmentContext)
    if (!context) {
        throw new Error('InstallmentContext No context');
    }

    return context;
}