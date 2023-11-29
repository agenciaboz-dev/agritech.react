import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useIo } from "../hooks/useIo"

interface UsersContextType {
    listUsers: User[] | undefined
    pendingUsers: User[]
    setPendingUsers: React.Dispatch<React.SetStateAction<User[]>>
    setListUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersContext = createContext<UsersContextType>(null!)
export default UsersContext

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const io = useIo()
    const [pendingUsers, setPendingUsers] = useState<User[]>([])

    const [listUsers, setListUsers] = useState<User[]>([])

    useEffect(() => {
        io.emit("users:list")

        const updateListUsers = (updatedList: any) => {
            setListUsers(updatedList)
        }
        io.on("users:list:success", updateListUsers)

        return () => {
            io.off("users:list:success", updateListUsers)
        }
        console.log(listUsers)
    }, [])
    useEffect(() => {
        io.emit("users:list")

        const newListUsers = (newUser: User) => {
            setListUsers((prevUsers) => [...prevUsers, newUser])
        }

        io.on("users:list:success", newListUsers)

        return () => {
            io.off("users:list:success", newListUsers)
        }
    }, [listUsers])

    useEffect(() => {
        io.emit("user:pendingApproval")
        // Atualiza a lista quando um novo usuário é adicionado à lista de pendentes e transmitido via broadcast
        const handleNewUserBroadcast = (newUser: User) => {
            setPendingUsers((prevUsers) => [...prevUsers, newUser])
        }
        io.on("admin:list:update", handleNewUserBroadcast)
        return () => {
            io.off("admin:list:update", handleNewUserBroadcast)
        }
    }, [pendingUsers])

    useEffect(() => {
        io.emit("user:pendingApproval")

        // Atualiza a lista completa de usuários pendentes
        const handleUpdatePendingList = (updatedList: any) => {
            setPendingUsers(updatedList)
        }

        io.on("user:pendingApprovalList:success", handleUpdatePendingList)

        // Limpeza dos ouvintes ao desmontar
        return () => {
            io.off("user:pendingApprovalList:success", handleUpdatePendingList)
        }
    }, [])
    return (
        <UsersContext.Provider value={{ listUsers, setListUsers, pendingUsers, setPendingUsers }}>
            {children}
        </UsersContext.Provider>
    )
}
