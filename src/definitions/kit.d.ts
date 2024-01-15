declare interface NewKit {
    image: string
    image64: string
    name: string
    description: string

    objects?: NewObject[]
    employees?: Employee[]
    calls?: Call[]

    // Maybe change the calendar
    calendar?: Calendar
}

declare interface Kit extends NewKit {
    id?: number
}

declare interface ManageKitMembers {
    kitId: number
    employeeId: number
}
