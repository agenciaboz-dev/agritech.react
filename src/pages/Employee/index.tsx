import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { BottomNavigation } from "../../components/BottomNavigation"
import { useNavigationList } from "../../hooks/useNavigationList"
import { NewProducer } from "./Panel/NewProducer"
import { PanelUser } from "./Panel"

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
                <Route path="/new_producer" element={<NewProducer />} />
            </ReactRoutes>
        </>
    )
}
