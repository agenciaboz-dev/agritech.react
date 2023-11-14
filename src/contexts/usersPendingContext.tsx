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
        io.on("user:pendingApprovalList:success", setPendingUsers)
        io.on("user:pendingApprovalList:error", () => {})

        return () => {
            io.off("user:pendingApprovalList:success")
            io.off("user:pendingApprovalList:error")
        }
    }, [])

    return <UsersPendingContext.Provider value={{ pendingUsers, setPendingUsers }}>{children}</UsersPendingContext.Provider>
}
