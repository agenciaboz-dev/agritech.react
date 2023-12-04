import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { PanelUser } from "../Users/Panel"
import { Sign } from "./Sign/Sign"
import { useNavigationList } from "../../hooks/useNavigationList"
import { BottomNavigation } from "../../components/BottomNavigation"

interface ProducerProps {
    user: User
}

export const Producer: React.FC<ProducerProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    return (
        <>
            {/* {user.approved && <BottomNavigation section={bottomMenu.producer} />} */}

            <ReactRoutes>
                <Route path="/*" element={<Sign user={user} />} />
                <Route path="/producer/sign" element={<Sign user={user} />} />
                <Route path="/producer" element={<PanelUser user={user} />} />
            </ReactRoutes>
        </>
    )
}
