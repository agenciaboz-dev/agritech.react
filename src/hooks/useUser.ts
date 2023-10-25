import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useIo } from "./useIo"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "burgos-snackbar"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const { user, setUser } = userContext
    const io = useIo()

    const navigate = useNavigate()
    const { snackbar } = useSnackbar()

    const login = (data: LoginForm) => {
        io.emit("user:login", data)
    }
    const logout = () => {
        io.emit("user:logout")
        navigate("/login")
        setUser(null)
        snackbar({ severity: "info", text: "Desconectado!" })
    }

    return { user, login, logout, setUser }
}
