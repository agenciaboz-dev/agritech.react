import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { NotificationsList } from "./NotificationsList"

interface NotificationsProps {
    user: User
}

export const Notifications: React.FC<NotificationsProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/*" element={<NotificationsList user={user} />} />
            <Route path="/list" element={<NotificationsList user={user} />} />
            {/* <Route path="/:id" element={<NotificationsList user={user} />} /> */}
        </ReactRoutes>
    )
}
