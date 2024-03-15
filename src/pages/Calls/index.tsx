import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { NewCall } from "./NewCall"
import { ApproveCall } from "../Adm/ReviewsCall/ApproveCall"
import { ReportStage } from "./ReportStage"
import { CallDetails } from "./CallDetails"
import { ListLaudos } from "./ListLaudos"
import { LaudoCall } from "./LaudoCall"
import { ReportDetails } from "./LaudoCall/ViewReport/ReportDetails"

interface CallsProps {
    user: User
}

export const Calls: React.FC<CallsProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/new" element={<NewCall user={user} />} />
            <Route path="/:callid" element={<CallDetails />} />
            <Route path="/calls/:callid" element={<ApproveCall />} />
            <Route path="/:callid/stages/:reportid" element={<ReportStage user={user} />} />
            <Route path="/:callid/laudos/" element={<ListLaudos user={user} />} />
            <Route path="/:callid/laudo/:reportid" element={<LaudoCall user={user} />} />
            
            <Route path="/:callid/report/:reportid" element={<ReportDetails />} />
        </ReactRoutes>
    )
}
