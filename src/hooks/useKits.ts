import { useContext } from "react"
import KitContext from "../contexts/kitContext"

export const useKits = () => {
    const kitsContext = useContext(KitContext)

    return { ...kitsContext }
}
