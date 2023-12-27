import { createContext, useEffect, useState } from "react"
import React from "react"
// import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // const io = useIo()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // console.log("USUARIO UPDATE", { userContext: user })
        // if (user) {
        //     io.on("connect", () => {
        //         console.log("reconnected, syncing user")
        //         io.emit("client:sync", user)
        //     })
        //     return () => {
        //         io.off("connect")
        //     }
        // }
    }, [user])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
