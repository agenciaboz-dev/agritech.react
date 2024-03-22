import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useIo } from "../hooks/useIo"

interface UsersContextType {
    listUsers: User[]
    pendingUsers: User[]
    addUser: (value: any) => void
    removeUser: (value: any) => void
    setPendingUsers: React.Dispatch<React.SetStateAction<User[]>>
    setListUsers: (value: User[]) => void
}

const UsersContext = createContext<UsersContextType>(null!)
export default UsersContext

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const io = useIo()
    const [pendingUsers, setPendingUsers] = useState<User[]>([])

    const [listUsers, setListUsers] = useState<User[]>([])
    const addUser = (newUser: User) => {
        setListUsers((user) => [...user, newUser])
    }
    const removeUser = (deletedUser: User) => {
        setListUsers((currentUsers) => currentUsers.filter((item) => item.id !== deletedUser.id))
    }

    useEffect(() => {
        const updateListUsers = (updatedList: any) => {
            setListUsers(updatedList)
        }
        io.on("users:list:success", updateListUsers)

        return () => {
            io.off("users:list:success", updateListUsers)
        }
    }, [listUsers])

    useEffect(() => {
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
        <UsersContext.Provider value={{ listUsers, addUser, removeUser, setListUsers, pendingUsers, setPendingUsers }}>
            {children}
        </UsersContext.Provider>
    )
}
