import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useIo } from "../hooks/useIo"

interface UsersPendingContextType {
    pendingUsers: User[]
    setPendingUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersPendingContext = createContext<UsersPendingContextType>(null!)
export default UsersPendingContext

export const UsersPendingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const io = useIo()
    const [pendingUsers, setPendingUsers] = useState<User[]>([])

    useEffect(() => {
        io.emit("user:pendingApproval")

        // Atualiza a lista quando um novo usuário é adicionado à lista de pendentes e transmitido via broadcast
        const handleNewUserBroadcast = (newUser: User) => {
            setPendingUsers((prevUsers) => [...prevUsers, newUser])
        }

        // Atualiza a lista completa de usuários pendentes
        const handleUpdatePendingList = (updatedList: any) => {
            setPendingUsers(updatedList)
        }

        io.on("admin:list:update", handleNewUserBroadcast)
        io.on("user:pendingApprovalList:success", handleUpdatePendingList)

        // Limpeza dos ouvintes ao desmontar
        return () => {
            io.off("admin:list:update", handleNewUserBroadcast)
            io.off("user:pendingApprovalList:success", handleUpdatePendingList)
        }
    }, [io])
    return <UsersPendingContext.Provider value={{ pendingUsers, setPendingUsers }}>{children}</UsersPendingContext.Provider>
}
