import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"

export interface Producer {}

interface ProducerContextValue {
    listTillagesP: Tillage[] | undefined
    setListTillagesP: React.Dispatch<React.SetStateAction<Tillage[] | undefined>>
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

    const [listTillagesP, setListTillagesP] = useState<Tillage[]>()

    useEffect(() => {
        io.emit("tillage:list")

        const updateListTillages = (updatedList: any) => {
            setListTillagesP(updatedList)
        }
        io.on("tillage:list:success", (data: Tillage[]) => {
            const listId = data.filter((item) => item.producerId === user?.producer?.id) //lista de lavoura do respectivo usuário
            updateListTillages(listId)
        })
        io.on("tillage:list:error", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })

        return () => {
            io.off("tillage:list:success", updateListTillages)
            io.off("tillage:list:error", updateListTillages)
        }
    }, [user?.id, user?.producer?.id])

    return <ProducerContext.Provider value={{ listTillagesP, setListTillagesP }}>{children}</ProducerContext.Provider>
}
