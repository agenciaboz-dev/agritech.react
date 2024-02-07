declare interface Tillage {
    id: number
    name: string
    area: string
    owner: string
    ceo: string
    manager?: string
    agronomist?: string
    technician?: string
    pilot?: string
    others?: string
    comments?: string
    address: Address
    location?: NewCoordinate[]
    gallery?: Gallery[]
    hectarePrice: string
    talhao?: Talhao[]

    call?: Call
    producerId?: number
}
