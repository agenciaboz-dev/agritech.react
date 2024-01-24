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

    tillageId: number
    kitId?: number
    producerId: number
    userId: number
}
export declare interface ApprovedCall {
    id: number
    kitId: number
}
export declare interface Call extends CreateCall {
    id: number
    init: string
    finish: string

    // status: CallStatus
    stages: Stage[]
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
