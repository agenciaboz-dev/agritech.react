import { useContext } from "react"
import NotificationDrawerContext from "../contexts/notificationDrawer"

export const useNotification = () => {
    const NotificationContext = useContext(NotificationDrawerContext)

    return { ...NotificationContext }
}
