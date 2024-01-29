import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { NewCall } from "./NewCall"
import { ApproveCall } from "../Adm/ReviewsCall/ApproveCall"
import { ReportCall } from "./ReportCall"
import { LaudoCall } from "./Laudo"
import { CallDetails } from "./CallDetails"
import { ReportDetails } from "./Laudo/ViewReport/ReportDetails"

interface CallsProps {
    user: User
}

export const Calls: React.FC<CallsProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/new" element={<NewCall user={user} />} />
            <Route path="/:callid" element={<CallDetails />} />
            <Route path="/calls/:callid" element={<ApproveCall />} />
            <Route path="/:callid/report" element={<ReportCall user={user} />} />
            <Route path="/:callid/laudo" element={<LaudoCall user={user} />} />
            <Route path="/:callid/report/:reportid" element={<ReportDetails />} />
        </ReactRoutes>
    )
}
