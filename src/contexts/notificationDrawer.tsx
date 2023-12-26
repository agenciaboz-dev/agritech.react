import { createContext, useState } from "react"
import React from "react"

export interface NotificationDrawer {}

interface NotificationDrawerContextValue {
    open: boolean
    setOpen: (value: boolean) => void
}

interface NotificationDrawerProviderProps {
    children: React.ReactNode
}

const NotificationDrawerContext = createContext<NotificationDrawerContextValue>({} as NotificationDrawerContextValue)

export default NotificationDrawerContext

export const NotificationDrawerProvider: React.FC<NotificationDrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)

    return <NotificationDrawerContext.Provider value={{ open, setOpen }}>{children}</NotificationDrawerContext.Provider>
}
