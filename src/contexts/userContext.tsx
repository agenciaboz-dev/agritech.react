import { createContext, useEffect, useState } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
// import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
    updateUser: (user: User) => void
    logout: () => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const navigate = useNavigate()
    const { snackbar } = useSnackbar()

    const login = (data: LoginForm) => {
        io.emit("user:login", data)
    }
    const logout = () => {
        navigate("/login")
        setUser(null)
        snackbar({ severity: "info", text: "Desconectado!" })
    }

    const [user, setUser] = useState<User | null>(null)
    const updateUser = (user: User) => {
        setUser(user)
    }

    useEffect(() => {
        io.on("user:update:success", (data: User) => {
            if (user?.id === data.id) setUser(data)
        })

        return () => {
            io.off("user:update:success")
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser, updateUser, logout }}>{children}</UserContext.Provider>
}
