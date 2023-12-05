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

    employeeId?: number
    producer: Producer
}
