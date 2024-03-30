import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { ListTillages } from "../pages/TillageDetails/ListTillages"

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
    const io = useIo()
    const { user } = useUser()
    const addTillage = (newTillage: any) => {
        setTillages((tillages) => [...tillages, newTillage])
    }

    const updateTillages = (updatedTillages: any) => {
        setTillages(updatedTillages)
    }

    const replaceTillage = (tillage: Tillage) => {
        setTillages((list) => [...list.filter((item) => item.id !== tillage.id), tillage])
    }

    useEffect(() => {
        io.on("tillage:new", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) addTillage(data)
        })
        io.on("tillage:cover", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) replaceTillage(data)
        })
        io.on("tillage:update", (data: Tillage) => {
            if (user?.isAdmin || user?.id === data.id) replaceTillage(data)
        })

        return () => {
            io.off("tillage:new")
            io.off("tillage:cover")
            io.off("tillage:update")
        }
    }, [ListTillages])
    return (
        <TillageContext.Provider value={{ tillages, setTillages, addTillage, updateTillages }}>
            {children}
        </TillageContext.Provider>
    )
}
