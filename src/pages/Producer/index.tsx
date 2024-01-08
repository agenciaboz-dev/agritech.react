import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { useNavigationList } from "../../hooks/useNavigationList"
import { BottomNavigation } from "../../components/BottomNavigation"
import { PanelUser } from "./Panel"
import { MyCalls } from "../Calls/MyCalls"
import { NewTillage } from "./Panel/NewTillage/index"
import { TillageDetails } from "../TillageDetails"

interface ProducerProps {
    user: User
}

export const Producer: React.FC<ProducerProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    return (
        <>
            {/* {user.approved && <BottomNavigation section={bottomMenu.producer} />} */}
            <BottomNavigation section={bottomMenu.producer} />
            <ReactRoutes>
                <Route path="/*" element={<PanelUser user={user} />} />
                <Route path="/producer" element={<PanelUser user={user} />} />
                <Route path="/requests" element={<MyCalls />} />
                <Route path="/new" element={<NewTillage />} />
                <Route path="/tillages" element={<TillageDetails />} />
            </ReactRoutes>
        </>
    )
}
