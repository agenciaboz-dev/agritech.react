import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { PanelUser } from "../Users/Panel"

interface ProducerProps {
    user: User
}

export const Producer: React.FC<ProducerProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/*" element={<PanelUser user={user} />} />
            <Route path="/producer" element={<PanelUser user={user} />} />
        </ReactRoutes>
    )
}
