import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { PanelUser } from "./Panel"
import { NewTillage } from "./Panel/NewTillage/index"
import { ListTillages } from "../TillageDetails/ListTillages"
import { Requests } from "./Panel/Requests"
import { CallDetails } from "../Calls/CallDetails"
import { Tillage } from "./Panel/Tillage"
import { NewTalhao } from "./Panel/NewTalhao"
import { Calls } from "../Calls"

interface ProducerProps {
    user: User
}

export const Producer: React.FC<ProducerProps> = ({ user }) => {
    return (
        <>
            <ReactRoutes>
                <Route path="/*" element={<PanelUser user={user} />} />
                <Route path="/producer" element={<PanelUser user={user} />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/new" element={<NewTillage />} />
                <Route path="/:tillageid/new_talhao" element={<NewTalhao />} />
                <Route path="/tillages" element={<ListTillages />} />
                <Route path="/tillage/:tillageid" element={<Tillage />} />
                <Route path="/call/:callid" element={<CallDetails />} />
                <Route path="/call/:callid" element={<CallDetails />} />
                <Route path="/call/*" element={<Calls user={user} />} />
            </ReactRoutes>
        </>
    )
}
