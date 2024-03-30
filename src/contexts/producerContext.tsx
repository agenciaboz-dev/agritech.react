import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"
import { useParams } from "react-router-dom"

export interface Producer {}

interface ProducerContextValue {
    listTillages: Tillage[]
    tillageUpdate: Boolean
    setTillageUpdate: (value: boolean) => void
    setListTillages: (value: Tillage[]) => void
    setProducerid: (value: number) => void
    // updateTillages: (value: Tillage[]) => void
    addTillage: (newTillage: Tillage) => void
    addTillageProd: (newTillage: Tillage) => void
}

interface ProducerProviderProps {
    children: React.ReactNode
}

const ProducerContext = createContext<ProducerContextValue>({} as ProducerContextValue)

export default ProducerContext

export const ProducerProvider: React.FC<ProducerProviderProps> = ({ children }) => {
    const io = useIo()
    const { user } = useUser()
    const { snackbar } = useSnackbar()

    const [producerid, setProducerid] = useState<Number | undefined>()
    const [tillageUpdate, setTillageUpdate] = useState<Boolean>(false)
    const [listTillages, setListTillages] = useState<Tillage[]>([])

    useEffect(() => {
        io.on("tillage:list:success", (data: Tillage[]) => {
            if (user?.producer) {
                const listId = data.filter((item) => item.producerId === user?.producer?.id) //lista de lavoura do respectivo usuário Cliente
                setListTillages(listId)
                setTillageUpdate(true)
            } else if (user?.employee) {
                if (producerid) {
                    const listTillagesId = data.filter((item) => item.producerId === producerid) //lista de lavoura do respectivo usuário employee ou adm
                    setListTillages(listTillagesId)
                    setTillageUpdate(true)
                }
            }
        })
        io.on("tillage:list:error", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })

        return () => {
            io.off("tillage:list:success")
            io.off("tillage:list:error")
        }
    }, [producerid, user?.employee, user?.producer?.id, listTillages])

    // useEffect(() => {
    //     console.log({ listaUpdated: listTillages })
    // }, [listTillages])

    const addTillage = (newTillage: Tillage) => {
        const { producerId } = newTillage

        if (user?.producer?.id === producerId) {
            setListTillages((tillages) => [...tillages, newTillage])
        }
    }
    const addTillageProd = (newTillage: Tillage) => {
        setListTillages((tillages) => [...tillages, newTillage])
    }
    const addTillageSync = (newTillage: any) => {
        setListTillages((tillages) => [...tillages, newTillage])
    }

    const replaceTillage = (tillage: Tillage) => {
        setListTillages((list) => [...list.filter((item) => item.id !== tillage.id), tillage])
    }
    useEffect(() => {
        io.on("tillage:new", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) addTillageSync(data)
        })
        io.on("tillage:cover", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) replaceTillage(data)
        })
        io.on("tillage:update", (data: Tillage) => {
            if (user?.producer?.id === data.producerId || user?.isAdmin) replaceTillage(data)
        })

        return () => {
            io.off("tillage:new")
            io.off("tillage:cover")
            io.off("tillage:update")
        }
    }, [listTillages])

    return (
        <ProducerContext.Provider
            value={{
                listTillages,
                setListTillages,
                addTillage,
                addTillageProd,
                setProducerid,
                tillageUpdate,
                setTillageUpdate,
            }}
        >
            {children}
        </ProducerContext.Provider>
    )
}
