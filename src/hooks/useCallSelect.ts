import { useEffect, useState } from "react"
import { Call } from "../definitions/call"
import { useUsers } from "./useUsers"
import { useCall } from "./useCall"
import { useProducer } from "./useProducer"

export const useCallInfo = (callid?: string) => {
    const { listUsers } = useUsers()
    const { listCalls } = useCall()
    const { listTillages } = useProducer()

    const [call, setCall] = useState<Call | null>()
    const [producerSelect, setProducerSelect] = useState<User | null>()
    const [tillageSelect, setTillage] = useState<Tillage | null>()

    useEffect(() => {
        setCall(listCalls.find((item) => String(item.id) === callid))
        setProducerSelect(listUsers?.find((item) => item.producer?.id === call?.producerId) || null)
        setTillage(listTillages?.find((item) => item.id === call?.tillageId && item.producerId === call.producerId))
    }, [call])

    return { call, producerSelect, tillageSelect }
}
