declare interface FormValues {
    name: string
    email: string
    username: string
    password: string
    cpf: string
    birth: string
    phone: string
    image: string

    street: string
    district: string
    number: string
    city: string
    cep: string
    uf: string
    complement?: string

    //Employee
    employee?: Employee
    producer?: Producer
}
