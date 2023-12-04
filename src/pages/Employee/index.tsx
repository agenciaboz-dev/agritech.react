import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { PanelUser } from "../Users/Panel"
import { BottomNavigation } from "../../components/BottomNavigation"
import { useNavigationList } from "../../hooks/useNavigationList"

interface EmployeeProps {
    user: User
}

export const Employee: React.FC<EmployeeProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    return (
        <>
            <BottomNavigation section={bottomMenu.employee} />

            <ReactRoutes>
                <Route path="/*" element={<PanelUser user={user} />} />
                <Route path="/employee" element={<PanelUser user={user} />} />
            </ReactRoutes>
        </>
    )
}
