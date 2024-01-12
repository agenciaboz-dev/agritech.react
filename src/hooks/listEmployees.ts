import { useUsers } from "./useUsers"

const listEmployees = () => {
    const { listUsers } = useUsers()
    const list = listUsers?.filter((item) => item.employee !== null)

    return { list }
}

export default listEmployees
