import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { PanelUser } from "../Users/Panel"

interface EmployeeProps {
    user: User
}

export const Employee: React.FC<EmployeeProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/*" element={<PanelUser user={user} />} />
            <Route path="/employee" element={<PanelUser user={user} />} />
        </ReactRoutes>
    )
}
