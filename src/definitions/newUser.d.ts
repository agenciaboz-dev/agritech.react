declare interface NewProducer {
    name: string
    email: string
    username: string
    password: string
    cpf: string
    birth: string
    phone: string
    image: string
    address: Address
    isAdmin: boolean
    approved: boolean
    rejected?: string
    office: string

    employeeId?: number
    producer: Producer
}
declare interface NewEmployee {
    id?: number
    name: string
    email: string
    username: string
    password: string
    cpf: string
    birth: string
    phone: string
    image: string
    address: Address
    isAdmin: boolean
    isManager: boolean
    approved: boolean
    rejected?: string
    office: string

    employee: Employee
}
