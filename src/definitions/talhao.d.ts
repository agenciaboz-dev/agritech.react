declare interface NewTalhao {
    name: string
    area: string
    location: Coordinate[]
    gallery: Gallery[]
    calls: Call[]
    tillageId: number
}
declare interface Talhao extends NewTalhao {
    id: number
    name: string
    area: string
    location: Coordinate[]
    gallery: Gallery[]
    calls: Call[]
}
