import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

interface NotificationDrawerContextValue {
    open: boolean
    setOpen: (value: boolean) => void
    listNotifications: NotificationType[] | undefined
    setListNotifications: (value: NotificationType[] | undefined) => void
}

interface NotificationDrawerProviderProps {
    children: React.ReactNode
}

const NotificationDrawerContext = createContext<NotificationDrawerContextValue>({} as NotificationDrawerContextValue)

export default NotificationDrawerContext

export const NotificationDrawerProvider: React.FC<NotificationDrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)

    const io = useIo()
    const { user } = useUser()
    const [listNotifications, setListNotifications] = useState<NotificationType[] | undefined>()

    useEffect(() => {
        user?.id && io.emit("notification:list", user.id)
    }, [user])

    useEffect(() => {
        io.on("notification:list", (list: NotificationType[]) => {
            setListNotifications(list)
            console.log(list)
        })
        console.log(listNotifications)
    }, [])

    return (
        <NotificationDrawerContext.Provider value={{ open, setOpen, listNotifications, setListNotifications }}>
            {children}
        </NotificationDrawerContext.Provider>
    )
}
