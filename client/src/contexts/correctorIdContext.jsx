import React, { createContext, useContext, useState } from "react";

export const CorrectorIdContext = createContext(undefined);

export const CorrectorIdProvider = ({ children }) => {
    const [correctorId, setCorrectorId] = useState(null);

    return(
        <CorrectorIdContext.Provider value={{ correctorId, setCorrectorId }}>
            {children}
        </CorrectorIdContext.Provider>
    )
}

export const useCorrectorId = () => {
    const context = useContext(CorrectorIdContext);
    if(!context){
        throw new Error('CorrectorIdUse must be used within a CorrectorIdProvider');
    }
    return context;
}