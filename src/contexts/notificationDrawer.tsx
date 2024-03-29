import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { Notification, NotificationClass } from "../types/server/class/Notification"

interface NotificationDrawerContextValue {
    open: boolean
    setOpen: (value: boolean) => void
    listNotifications: NotificationClass[] | undefined
    setListNotifications: (value: NotificationClass[]) => void
    recents: NotificationClass[] | undefined
    setRecents: (value: NotificationClass[]) => void
    addNotification: (value: NotificationClass) => void
    removeNotification: (valunotificationIde: number) => void
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
    const [listNotifications, setListNotifications] = useState<NotificationClass[]>([])
    const [recents, setRecents] = useState<NotificationClass[]>([])

    const addNotification = (newValue: NotificationClass) => {
        setListNotifications((item) => [...(item ?? []), newValue])
    }
    const removeNotification = (notificationId: number) => {
        setListNotifications((currentNotifications) =>
            currentNotifications?.filter((notification) => notification.id !== notificationId)
        )
    }

    useEffect(() => {
        user?.id && io.emit("notification:list", user.id)
    }, [user])

    useEffect(() => {
        io.on("notification:list", (list: NotificationClass[]) => {
            setListNotifications(list)
        })
    }, [])

    useEffect(() => {
        io.on("notification:new", (notification: NotificationClass) => {
            // if (notification.users.find((user_id) => user_id == user?.id)) {
            setListNotifications((prevNotifications) => [...prevNotifications, notification])
            // }
        })

        return () => {
            io.off("notification:new")
        }
    }, [])

    useEffect(() => {
        user && setRecents(listNotifications?.filter((item) => !item.viewed_by.includes(user.id)))
    }, [listNotifications])

    return (
        <NotificationDrawerContext.Provider
            value={{
                open,
                setOpen,
                listNotifications,
                setListNotifications,
                addNotification,
                recents,
                setRecents,
                removeNotification,
            }}
        >
            {children}
        </NotificationDrawerContext.Provider>
    )
}
