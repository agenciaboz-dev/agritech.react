declare interface NewKit {
    image?: string | ImageUpload | null
    name: string
    description: string
    active?: boolean
    objects?: NewObject[]
    employees?: Employee[]
    calls?: Call[]
    hectareDay?: number
    model?: string
    equipment?: string

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
