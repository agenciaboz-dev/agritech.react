import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

export interface NotificationDrawer {}

interface NotificationDrawerContextValue {
    open: boolean
    setOpen: (value: boolean) => void
    listNotifications: Notification[] | undefined
    setListNotifications: (value: Notification[] | undefined) => void
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
    const [listNotifications, setListNotifications] = useState<Notification[] | undefined>()

    useEffect(() => {
        console.log({ Notifications: user })
    }, [])

    return (
        <NotificationDrawerContext.Provider value={{ open, setOpen, listNotifications, setListNotifications }}>
            {children}
        </NotificationDrawerContext.Provider>
    )
}
