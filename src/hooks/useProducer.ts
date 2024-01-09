import { useContext } from "react"
import ProducerContext from "../contexts/producerContext"

export const useProducer = () => {
    const producerContext = useContext(ProducerContext)

    return { ...producerContext }
}
