import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"
import { useNotification } from "../hooks/useNotifications"

interface KitContextValue {
    listKits: Kit[]
    setListKits: (value: Kit[]) => void
    addKit: (newKit: Kit) => void
    updateKit: (kitUpdate: Kit) => void
    toggleKit: (id: number) => void
}

interface KitProviderProps {
    children: React.ReactNode
}

const KitContext = createContext<KitContextValue>({} as KitContextValue)

export default KitContext

export const KitProvider: React.FC<KitProviderProps> = ({ children }) => {
    const io = useIo()
    const [listKits, setListKits] = useState<Kit[]>([])
    const { addNotification } = useNotification()
    const { snackbar } = useSnackbar()
    const { user } = useUser()

    useEffect(() => {
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
    }, [listKits])

    const addKit = (newKit: Kit) => {
        setListKits((kits) => [...kits, newKit])
    }

    const toggleKit = (id: number) => {
        io.emit("kit:toggle", { id: id })
    }

    useEffect(() => {
        if (listKits.length === 0) io.emit("kit:list")
    }, [])

    useEffect(() => {
        io.on("kit:toggle:success", (data: Kit) => {
            console.log({ veio: data })
            // addNotification()
        })
        io.on("kit:toggle:failed", () => {})

        return () => {
            io.off("kit:toggle:success")
            io.off("kit:toggle:failed")
        }
    }, [toggleKit])

    const updateKit = (kit: Kit) => {
        setListKits((kits) => {
            const findKit = kits.findIndex((kitId) => kitId.id === kit.id)
            if (findKit === -1) {
                return kits
            }
            const updatedKits = [...kits]
            updatedKits[findKit] = kit

            return updatedKits
        })
    }

    return (
        <KitContext.Provider value={{ listKits, setListKits, toggleKit, addKit, updateKit }}>{children}</KitContext.Provider>
    )
}
