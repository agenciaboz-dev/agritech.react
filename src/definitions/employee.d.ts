declare interface Employee {
    id?: number
    rg: string
    gender: string
    nationality: string
    relationship: string
    voter_card: string
    work_card: string
    military: string
    residence: string
    producers?: Producer[]
    kits?: Kit[]
    bank?: Bank
    professional?:Professional
    user?: User
}
