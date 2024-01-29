export enum CallStatus {
    OPEN,
    INPROGRESS,
    CLOSED,
    CANCELED,
}
export declare interface CreateCall {
    approved?: boolean
    open: string
    comments: string

    hectarePrice: number
    tillageId: number
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

    tillage?: Tillage
    tillageId?: number
    kit?: Kit
    producerId?: number
    userId?: number

    id: number
    kitId: number
    hectarePrice?: number
}
export declare interface Call extends CreateCall {
    id: number
    init: string
    finish: string

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
