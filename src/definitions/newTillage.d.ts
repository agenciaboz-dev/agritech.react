import { Coordinate, NewCoordinate } from "./coordinate"

declare interface NewLavoura {
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
    cover?: string
    location?: NewCoordinate[]
    gallery?: Gallery[]
    hectarePrice?: string

    call?: Call
    producerId?: number
}
