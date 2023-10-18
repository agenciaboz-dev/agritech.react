declare interface User {
    id: number
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string
    phone: string
    image?: string
    image64?: string
    address?: Address

    employee?: Employee
    producer?: Producer
}

interface LoginForm {
    login: string
    password: string
}

interface UserForm {
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string
    phone: string
    image: string
    image64: string
    address: Address

    employee?: Employee
    producer?: Producer
}
