import { createContext, useState } from "react"
import React from "react"

export interface TillageContext {}

interface TillageContextValue {
    tillages: Tillage[]
    setTillages: (value: Tillage[]) => void
    addTillage: (newTillage: Tillage) => void
    updateTillages: (list: Tillage[]) => void
}

interface TillageContextProviderProps {
    children: React.ReactNode
}

const TillageContext = createContext<TillageContextValue>({} as TillageContextValue)

export default TillageContext

export const TillageContextProvider: React.FC<TillageContextProviderProps> = ({ children }) => {
    const [tillages, setTillages] = useState<Tillage[]>([])

    const addTillage = (newTillage: any) => {
        setTillages((tillages) => [...tillages, newTillage])
    }

    const updateTillages = (updatedTillages: any) => {
        setTillages(updatedTillages)
    }

    return (
        <TillageContext.Provider value={{ tillages, setTillages, addTillage, updateTillages }}>
            {children}
        </TillageContext.Provider>
    )
}
