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
        console.log({ CONTEXTO: user })
    }, [user])

    useEffect(() => {
        const handleUserUpdateSuccess = (data: User) => {
            // console.log({ User_id: user?.name })
            // console.log({ AQUIIII: data.id })
            setUser((prevUser) => {
                console.log("Comparando:", prevUser?.id, "com", data.id) // Adicionado log
                if (prevUser?.id === data.id) {
                    console.log("IDs são iguais, atualizando usuário.") // Log adicional para verificar a condição
                    return data
                }
                console.log("IDs são diferentes, não atualizando usuário.") // Log para caso a condição não seja satisfeita
                return prevUser
            })
        }

        io.on("user:update:success", handleUserUpdateSuccess)

        return () => {
            io.off("user:update:success", handleUserUpdateSuccess)
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser, updateUser, logout }}>{children}</UserContext.Provider>
}
