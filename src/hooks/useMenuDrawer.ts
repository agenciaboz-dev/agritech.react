import { useContext } from "react"
import MenuDrawerContext from "../contexts/menuDrawerContext"

export const useMenuDrawer = () => {
    const menuDrawerContext = useContext(MenuDrawerContext)

    const toggle = () => {
        menuDrawerContext.setOpen(!menuDrawerContext.open)
    }

    return { ...menuDrawerContext, toggle }
}
