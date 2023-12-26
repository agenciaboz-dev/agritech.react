import { useContext } from "react"
import NotificationDrawerContext from "../contexts/notificationDrawer"

export const useNotificationDrawer = () => {
    const notificationDrawerContext = useContext(NotificationDrawerContext)

    const toggle = () => {
        notificationDrawerContext.setOpen(!notificationDrawerContext.open)
    }

    return { ...notificationDrawerContext, toggle }
}
