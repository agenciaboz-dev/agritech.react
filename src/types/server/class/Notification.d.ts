import { Prisma } from "@prisma/client"
import { Socket } from "socket.io"
export declare const include: {
    users: true
}
export type NotificationPrisma = Prisma.NotificationGetPayload<{
    include: typeof include
}>
export type NewNotification = Omit<NotificationPrisma, "id" | "viewed_by" | "datetime">
export declare class NotificationClass {
    id: number
    action: string
    datetime: string
    target_key: string
    target_id: number
    viewed_by: number[]
    users: number[]
    data: any
    constructor(data: NotificationPrisma)
    static new(data: NewNotification): Promise<void>
    static load(id: number): Promise<NotificationClass>
    static viewed(socket: Socket, id: number, user_id: number): Promise<void>
    static list(socket: Socket, user_id: number): Promise<void>
}
export declare class Notification {
    constructor(data: NewNotification)
    static getAdmins(): Promise<
        {
            id: number
            name: string
            cpf: string
            birth: string
            phone: string
            image: string | null
            username: string
            email: string
            password: string
            isAdmin: boolean
            isManager: boolean
            approved: boolean
            rejected: string | null
            office: string
        }[]
    >
}
