import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface TalhaoContextValue {
    listTalhao: Talhao[] | undefined
    setList: (value: Talhao[] | undefined) => void
}

interface TalhaoProviderProps {
    children: React.ReactNode
}

const TalhaoContext = createContext<TalhaoContextValue>({} as TalhaoContextValue)

export default TalhaoContext

export const TalhaoProvider: React.FC<TalhaoProviderProps> = ({ children }) => {
    const io = useIo()
    const [listTalhao, setList] = useState<Talhao[] | undefined>()

    useEffect(() => {
        io.on("talhao:list:success", (list: Talhao[]) => {
            setList(list)
        })

        return () => {
            io.off("talhao:list:success")
        }
    }, [])

    return <TalhaoContext.Provider value={{ listTalhao, setList }}>{children}</TalhaoContext.Provider>
}
