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

    const replaceTillage = (tillage: Tillage) => {
        setTillages((list) => [...list.filter((item) => item.id !== tillage.id), tillage])
    }
    const updateTillages = (updatedTillages: any) => {
        setTillages(updatedTillages)
    }

    useEffect(() => {
        io.on("tillage:creation:success", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) addTillage(data)
        })
        io.on("tillage:cover:success", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) replaceTillage(data)
        })
        io.on("tillage:update:success", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) replaceTillage(data)
        })
        io.on("tillage:list:success", (data: Tillage[]) => {
            setTillages(data)
        })

        return () => {
            io.off("tillage:creation:success")
            io.off("tillage:cover:success")
            io.off("tillage:update:success")
            io.off("tillage:list:success")
        }
    }, [ListTillages])
    return (
        <TillageContext.Provider value={{ tillages, setTillages, addTillage, updateTillages }}>
            {children}
        </TillageContext.Provider>
    )
}
