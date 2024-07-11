import React, { createContext, useContext, useState } from "react";

export const TokenContext = createContext(undefined);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    return(
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export const useToken = () => {
    const context = useContext(TokenContext);
    if(!context){
        throw new Error('TokenUse must be used within a TokenProvider');
    }
    return context;
}