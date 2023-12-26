export declare interface Call {
    approved: boolean
    openCall: string
    init: string
    finish: string
    caller: User
    comments: string
    tillage: string
    producer: string
    stages: Stage[]
    kit?: string
}

export declare interface OpenCall {
    approved: boolean
    openCall: string
    init: string
    caller: User
    comments: string
    tillage: string
    producer: string
    kit?: string
    // producer: Producer
    // kit: Kit
}

export declare interface Stage {
    name: string
    date: string
    start: string
    finish: string
    duration: string
    comments: string
    // callId: int
}
