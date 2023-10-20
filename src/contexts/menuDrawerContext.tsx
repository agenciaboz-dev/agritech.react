import { createContext, useState } from "react"
import React from "react"

interface MenuDrawerContextValue {
    open: boolean
    setOpen: (value: boolean) => void
}

interface MenuDrawerProviderProps {
    children: React.ReactNode
}

const MenuDrawerContext = createContext<MenuDrawerContextValue>({} as MenuDrawerContextValue)

export default MenuDrawerContext

export const MenuDrawerProvider: React.FC<MenuDrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false)

    return <MenuDrawerContext.Provider value={{ open, setOpen }}>{children}</MenuDrawerContext.Provider>
}
