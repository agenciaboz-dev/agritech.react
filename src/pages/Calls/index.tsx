import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { NewCall } from "./NewCall"
import { ApproveCall } from "../Adm/ReviewsCall/ApproveCall"
import { ReportCall } from "./ReportCall"

interface CallsProps {
    user: User
}

export const Calls: React.FC<CallsProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/new" element={<NewCall user={user} />} />
            <Route path="/calls/:callid" element={<ApproveCall />} />
            <Route path="/:callid/report" element={<ReportCall user={user} />} />
        </ReactRoutes>
    )
}
