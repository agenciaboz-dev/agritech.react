import { Coordinate } from "@prisma/client"

declare interface Coordinate {
    id: number
    x: string
    y: string
    tillageId: number
}
declare interface NewCoordinate {
    x: string
    y: string
    tillageId?: number
}
