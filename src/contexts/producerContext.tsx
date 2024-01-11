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
        io.emit("tillage:list")

        io.on("tillage:list:success", (data: Tillage[]) => {
            if (user?.producer) {
                const listId = data.filter((item) => item.producerId === user?.producer?.id) //lista de lavoura do respectivo usuário produtor
                setListTillages(listId)
                setTillageUpdate(true)
                // snackbar({ severity: "success", text: "Lista atualizada" })
            } else if (user?.employee) {
                if (producerid) {
                    const listTillagesId = data.filter((item) => item.producerId === producerid) //lista de lavoura do respectivo usuário employee ou adm
                    setListTillages(listTillagesId)
                    setTillageUpdate(true)
                    // snackbar({ severity: "success", text: "Lista atualizada" })
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
    }, [producerid, user?.employee, user?.producer?.id])

    useEffect(() => {
        console.log({ listaUpdated: listTillages })
    }, [listTillages])

    const addTillage = (newTillage: Tillage) => {
        const { producerId } = newTillage

        if (user?.producer?.id === producerId) {
            setListTillages((tillages) => [...tillages, newTillage])
        }
    }

    return (
        <ProducerContext.Provider
            value={{ listTillages, setListTillages, addTillage, setProducerid, tillageUpdate, setTillageUpdate }}
        >
            {children}
        </ProducerContext.Provider>
    )
}
