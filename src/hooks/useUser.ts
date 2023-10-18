import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useIo } from "./useIo"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const { user, setUser } = userContext
    const io = useIo()

    const login = (data: LoginForm) => {
        io.emit("user:login", data)
    }

    return { user, login, setUser }
}
