declare interface NewReport {
    call?: Call
    producer?: Producer
    operation?: Operation
    treatment?: Treatment
    material?: Material[]
    techReport?: TechReport
}
declare interface GeralReport {
    id: number
    call: Call
    producer: Producer
    operation: Operation
    treatment: Treatment
    material: Material
    techReport: TechReport
}
declare interface Operation {
    id?: number
    service: string
    culture: string
    areaMap: number
    equipment: string
    model: string

    reportId?: number
}
declare interface Treatment {
    id?: number

    products: Product[]
    reportId?: number //temporaly optional
    // report:Report
}

declare interface Product {
    id?: number
    name: string
    dosage: string
    unit: string
    treatentId?: number //temporaly optional
}

declare interface Material {
    id?: number
    talhao: string
    area: number
    product: string
    dosage: number
    classification: string
    total: number
    removed: number
    applied: number
    returned: number
    comments: string

    reportId?: number //temporaly optional
    // report:Report
}

declare interface TechReport {
    id?: number
    date: string
    init: string
    finish: string
    comments: string

    flights?: Flight[]
    reportId?: number //temporaly optional
    // report:Report
}

declare interface Flight {
    id?: number //temporaly optional
    temperature: number
    humidity: number
    wind_velocity: number
    height: number
    faixa: number
    flight_velocity: number
    tank_volume: number
    rate: number
    performance: number

    techReportId?: number //temporaly optional
    // techReport:TechReport
}
