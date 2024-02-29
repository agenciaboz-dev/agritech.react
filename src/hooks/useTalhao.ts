import { useContext } from "react"
import TalhaoContext from "../contexts/talhaoContext"

export const useTalhao = () => {
    const talhaoContext = useContext(TalhaoContext)

    return { ...talhaoContext }
}
