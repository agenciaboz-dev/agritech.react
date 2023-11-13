import { useContext } from "react"
import UsersPendingContext from "../contexts/usersPendingContext"

export const useUsersPending = () => {
    const context = useContext(UsersPendingContext)
    if (!context) {
        throw new Error("usePendingUsers must be used within a UsersProvider")
    }
    return context
}
