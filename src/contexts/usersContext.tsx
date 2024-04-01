import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

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
    const { user } = useUser()
    const [pendingUsers, setPendingUsers] = useState<User[]>([])

    const [listUsers, setListUsers] = useState<User[]>([])

    const addUser = (newUser: User) => {
        setListUsers((user) => [...user, newUser])
    }
    const removeUser = (deletedUser: User) => {
        setListUsers((currentUsers) => currentUsers.filter((item) => item.id !== deletedUser.id))
    }

    const replaceUser = (user: User) => {
        setListUsers((list) => [...list.filter((item) => item.id !== user.id), user])
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

        return () => {
            io.off("user:pendingApprovalList:success", handleUpdatePendingList)
        }
    }, [])

    useEffect(() => {
        io.on("admin:new:user", (data: User) => {
            if (user?.employee) addUser(data)
        })
        io.on("admin:list:update", (data: User) => {
            if (user?.isAdmin) replaceUser(data)
        })
        io.on("user:delete", (data: User) => {
            if (user?.isAdmin || user?.id === data.id) removeUser(data)
        })
        io.on("application:status:approved", (data: User) => {
            if (user?.isAdmin || user?.id === data.id) {
                // replaceUser(data)
                addUser(data)
            }
        })
        io.on("application:status:rejected", (data: User) => {
            if (user?.isAdmin || user?.id === data.id) replaceUser(data)
        })
        io.on("user:update:success", (data: User) => {
            if (user?.isAdmin || user?.id === data.id) replaceUser(data)
        })
        io.on("users:list:success", (data: User[]) => {
            setListUsers(data)
        })
        io.on("user:pendingApprovalList:success", (data: User[]) => {
            setPendingUsers(data)
        })

        return () => {
            io.off("admin:list:update")
            io.off("admin:new:user")
            io.off("user:delete")
            io.off("application:status:approved")
            io.off("application:status:rejected")
            io.off("user:update:success")
            io.off("users:list:success")
            io.off("user:pendingApprovalList:success")
        }
    }, [listUsers])

    return (
        <UsersContext.Provider value={{ listUsers, addUser, removeUser, setListUsers, pendingUsers, setPendingUsers }}>
            {children}
        </UsersContext.Provider>
    )
}
