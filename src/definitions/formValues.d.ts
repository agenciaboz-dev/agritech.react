declare interface FormValues {
    name: string
    email: string
    username: string
    password: string
    cpf: string
    birth: string
    phone: string
    image: string
    address: {
        street: string
        district: string
        number: string
        city: string
        cep: string
        uf: string
        complement?: string
    }
    isAdmin: boolean

    //Employee
    employee?: Employee
    producer?: Producer
}
