import { useUsers } from "./useUsers"

const findEmployee = (employeeId: string) => {
    const { listUsers } = useUsers()
    const employeeSelect = listUsers?.filter((item) => String(item.employee?.id) === employeeId) || []

    return employeeSelect[0]
}

export default findEmployee
