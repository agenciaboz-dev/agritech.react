import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { userInfo } from "os"
import { useUser } from "../hooks/useUser"

interface TalhaoContextValue {
    listTalhao: Talhao[] | undefined
    setList: (value: Talhao[]) => void
}

interface TalhaoProviderProps {
    children: React.ReactNode
}

const TalhaoContext = createContext<TalhaoContextValue>({} as TalhaoContextValue)

export default TalhaoContext

export const TalhaoProvider: React.FC<TalhaoProviderProps> = ({ children }) => {
    const io = useIo()
    const { user } = useUser()
    const [listTalhao, setList] = useState<Talhao[]>([])

    const replaceTalhao = (talhao: Talhao) => {
        setList((list) => [...list.filter((item) => item.id !== talhao.id), talhao])
    }

    const addTalhao = (data: Talhao) => {
        setList((talhao) => [...talhao, data])
    }
    useEffect(() => {
        io.on("talhao:list:success", (list: Talhao[]) => {
            setList(list)
        })

        return () => {
            io.off("talhao:list:success")
        }
    }, [])

    useEffect(() => {
        io.on("talhao:new", (data: Talhao) => {
            if (user?.producer?.id === data.tillage?.producerId || user?.isAdmin) addTalhao(data)
        })
        io.on("talhao:update", (data: Talhao) => {
            if (user?.producer?.id === data.tillage?.producerId || user?.isAdmin) replaceTalhao(data)
        })
        io.on("talhao:cover", (data: Talhao) => {
            if (user?.producer?.id === data.tillage?.producerId || user?.isAdmin) replaceTalhao(data)
        })
        io.on("talhao:list", (data: Talhao[]) => {
            setList(data)
        })

        return () => {
            io.off("talhao:new")
            io.off("talhao:update")
            io.off("talhao:cover")
            io.off("talhao:list")
        }
    }, [listTalhao])

    return <TalhaoContext.Provider value={{ listTalhao, setList }}>{children}</TalhaoContext.Provider>
}
