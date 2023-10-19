declare interface NavigationMenu {
    id: number
    title: string
    location: string

    navigation?: {
        id: number
        title: string
        location: string
        icon: React.ReactNode
    }[]

    hidden?: boolean
}

declare type MenusList = "admin" | "producer" | "employee"
