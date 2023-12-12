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
    isAdmin: boolean
    approved: boolean
    rejected?: string
    office?:string
    
    address?: Address
    employee?: Employee
    producer?: Producer
}

interface LoginForm {
    login: string
    password: string
    isAdmin: boolean
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
    isAdmin: boolean
    approved: boolean
    rejected?: string
    
    address: Address
    employee?: Employee
    producer?: Producer
}
