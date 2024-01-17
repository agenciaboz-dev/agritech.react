import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { useNavigationList } from "../../hooks/useNavigationList"
import { BottomNavigation } from "../../components/BottomNavigation"
import { PanelUser } from "./Panel"
import { NewTillage } from "./Panel/NewTillage/index"
import { TillageDetails } from "../TillageDetails"
import { ListTillages } from "../TillageDetails/ListTillages"
import { Requests } from "./Panel/Requests"
import { CallDetails } from "../Calls/CallDetails"

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
                <Route path="/requests" element={<Requests />} />
                <Route path="/new" element={<NewTillage />} />
                <Route path="/tillages" element={<ListTillages />} />
                <Route path="/tillage/:tillageid" element={<TillageDetails />} />
                <Route path="/call/:callid" element={<CallDetails />} />
            </ReactRoutes>
        </>
    )
}
