declare interface NewReport {
    callId?: number
    operation?: Operation
    treatment?: Treatment
    material?: Material[]
    techReport?: TechReport
    areaTrabalhada: string
}
declare interface Report extends NewReport {
    id: number
    date: string
    hour: string
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
    areaMap: string
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
    area: string
    product: string
    dosage: string
    classification: string
    total: string
    removed: string
    applied: string
    returned: string
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

    flight?: Flight[]
    reportId?: number //temporaly optional
    // report:Report
}

declare interface Flight {
    id?: number //temporaly optional
    temperature: string
    humidity: string
    wind_velocity: string
    height: string
    faixa: string
    flight_velocity: string
    tank_volume: string
    rate: string
    performance: string

    techReportId?: number //temporaly optional
    // techReport:TechReport
}
