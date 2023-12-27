import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { useNavigationList } from "../../hooks/useNavigationList"
import { BottomNavigation } from "../../components/BottomNavigation"
import { PanelUser } from "./Panel"
import { MyCalls } from "../Calls/MyCalls"

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
                {/* <Route path="/new_tillage" element={<Tillage />} /> */}
                <Route path="/requests" element={<MyCalls />} />
                
            </ReactRoutes>
        </>
    )
}
