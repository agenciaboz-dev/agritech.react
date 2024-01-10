import { useUsers } from "./useUsers"

const findProducer = (producerId: string) => {
    const { listUsers } = useUsers()
    const producerSelect = listUsers?.filter((item) => String(item.producer?.id) === producerId) || []

    return producerSelect[0]
}

export default findProducer
