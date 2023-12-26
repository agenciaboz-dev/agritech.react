import { createContext, useState } from "react"
import { useNavigationList } from "../hooks/useNavigationList"
import React from "react"

interface HeaderContextValue {
    title: string
    setTitle: (title: string) => void
    currentSection: NavigationMenu
    setCurrentSection: (value: NavigationMenu) => void
}

interface HeaderProviderProps {
    children: React.ReactNode
}

const HeaderContext = createContext<HeaderContextValue>({} as HeaderContextValue)

export default HeaderContext

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
    const menus = useNavigationList()

    const [title, setTitle] = useState<string>("")
    const [currentSection, setCurrentSection] = useState<NavigationMenu>(menus.admin)

    return (
        <HeaderContext.Provider value={{ title, setTitle, currentSection, setCurrentSection }}>
            {children}
        </HeaderContext.Provider>
    )
}
