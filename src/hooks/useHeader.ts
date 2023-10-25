import { useContext } from "react"
import HeaderContext from "../contexts/headerContext"
import { useNavigationList } from "./useNavigationList"

export const useHeader = () => {
    const menus = useNavigationList()
    const headerContext = useContext(HeaderContext)

    return { ...headerContext }
}
