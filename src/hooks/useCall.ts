import { useContext } from "react"
import CallContext from "../contexts/callsContext"

export const useCall = () => {
    const callContext = useContext(CallContext)

    return { ...callContext }
}
