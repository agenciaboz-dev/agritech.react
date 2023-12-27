import { useUsers } from "./useUsers"

const listProducers = () => {
    const { listUsers } = useUsers()
    const list = listUsers?.filter((item) => item.producer !== null)

    return list
}

export default listProducers
