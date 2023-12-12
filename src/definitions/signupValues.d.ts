declare interface SignupValues {
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

    //Employee
    employee?: Employee
    producer?: Producer
}
