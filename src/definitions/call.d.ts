export enum CallStatus {
    OPEN,
    INPROGRESS,
    CLOSED,
    CANCELED,
}
export declare interface CreateCall {
    approved?: boolean
    open: string
    forecast: string
    comments: string

    hectarePrice: string
    talhaoId: number
    kit?: Kit
    kitId?: number
    producerId: number
    userId: number
}
export declare interface ApprovedCall {
    open: string
    comments?: string
    approved?: boolean
    stages?: Stage[]

    talhao?: Talhao
    talhaoId: number
    kit?: Kit
    producerId?: number
    userId?: number
    forecast: string
    id: number
    kitId: number
    hectarePrice?: string
}
export declare interface Call extends CreateCall {
    id: number
    init: string
    finish: string
    stage: string
    talhao?: Talhao
    // status: CallStatus
    report?: Report
    totalPrice: number
    stages: Stage[]
    tillage?: Tillage
    producer?: Producer
    tillageId: number
}

export declare interface Stage {
    id?: number
    name: string
    date: string
    start: string
    finish: string
    duration: string
    comments: string
    callId: number
}
