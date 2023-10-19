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
    rg: string
    gender: string
    nationality: string
    relationship: string
    voter_card: string
    work_card: string
    military: string
    residence: string

    //Producer
    cnpj: string
}
