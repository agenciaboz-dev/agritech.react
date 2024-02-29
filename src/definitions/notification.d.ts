declare interface NotificationType {
    id: number
    action: string
    datetime: string

    target_key: string
    target_id: number

    viewed_by: number[] = []

    users: number[] = []
}
