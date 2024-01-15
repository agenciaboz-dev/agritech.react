import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"

interface KitContextValue {
    listKits: Kit[]
    setListKits: (value: Kit[]) => void
    addKit: (newKit: Kit) => void
    updateKit: (kitUpdate: Kit) => void
}

interface KitProviderProps {
    children: React.ReactNode
}

const KitContext = createContext<KitContextValue>({} as KitContextValue)

export default KitContext

export const KitProvider: React.FC<KitProviderProps> = ({ children }) => {
    const io = useIo()
    const [listKits, setListKits] = useState<Kit[]>([])
    const { snackbar } = useSnackbar()
    const { user } = useUser()

    useEffect(() => {
        io.emit("kit:list")

        io.on("kit:list:success", (data: Kit[]) => {
            setListKits(data)
            // snackbar({ severity: "success", text: "Lista de kits atualizada" })
        })
        io.on("kit:list:error", () => {
            // snackbar({ severity: "error", text: "Algo deu errado!" })z
        })

        return () => {
            io.off("kit:list:success")
            io.off("kit:list:error")
        }
    }, [])

    // useEffect(() => {
    //     console.log({ listaUpdated: listKits })
    // }, [listKits])

    const addKit = (newKit: Kit) => {
        setListKits((kits) => [...kits, newKit])
    }

    const updateKit = (kitUpdate: Kit) => {
        setListKits((kits) => {
            const findKit = kits.findIndex((kitId) => kitId.id === kitUpdate.id)
            if (findKit === -1) {
                return kits
            }
            const updatedKits = [...kits]
            updatedKits[findKit] = kitUpdate

            return updatedKits
        })
    }

    return <KitContext.Provider value={{ listKits, setListKits, addKit, updateKit }}>{children}</KitContext.Provider>
}
