import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { NewProducer } from "../../components/NewProducer"
import { PanelUser } from "./Panel"
import { TillageDetails } from "../TillageDetails"
import { SettingsKit } from "../Adm/Panel/SettingsKit"
import { ViewKit } from "../Adm/Panel/ViewKit"
import { MyCalls } from "./Panel/MyCalls"
import { ListProducer } from "./Panel/ListProducer"
import { Userprofile } from "../Adm/ReviewsEmployee/UserProfile"
import { ListTillages } from "../TillageDetails/ListTillages"

import { LaudoCall } from "../Calls/LaudoCall"
import { CallDetails } from "../Calls/CallDetails"
import { NewTalhao } from "../TillageDetails/NewTalhao"
import { ReportStage } from "../Calls/ReportStage"

interface EmployeeProps {
    user: User
}

export const Employee: React.FC<EmployeeProps> = ({ user }) => {
    return (
        <>
            <ReactRoutes>
                <Route path="/*" element={<PanelUser user={user} />} />
                <Route path="/employee" element={<PanelUser user={user} />} />
                <Route path="/new_producer" element={<NewProducer />} />
                <Route path="/requests" element={<MyCalls />} />
                <Route path="/settings-kit" element={<SettingsKit />} />
                <Route path="/settings-kit/:kitid" element={<ViewKit />} />
                <Route path="/producer/:producerid/:tillageid" element={<TillageDetails />} />
                <Route path="/producers" element={<ListProducer user={user} />} />
                <Route path="/profile/:userId" element={<Userprofile view />} />
                <Route path="/producer/:producerid" element={<ListTillages />} />
                <Route path="/call/:callid" element={<CallDetails />} />
                <Route path="/call/:callid/report" element={<ReportStage user={user} />} />
                <Route path="/call/:callid/laudo" element={<LaudoCall user={user} />} />
                <Route path="/producer/:producerid/:tillageid/new_talhao" element={<NewTalhao />} />
            </ReactRoutes>
        </>
    )
}
