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
    kits?: Kit[]
    producers?: Producer[]
    bank?: Bank
}
