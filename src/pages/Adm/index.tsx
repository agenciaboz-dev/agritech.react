import React from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { SettingsRoutes } from "./Panel/SettingsRoutes"
import { Profile } from "../Profile"
import { Userprofile } from "./ReviewsEmployee/UserProfile"
import { ReviewsEmployee } from "./ReviewsEmployee"
import { Panel } from "./Panel"
import { ListProducer } from "./Panel/Lists/ListProducer"
import { NewProducer } from "../../components/NewProducer"
import { Calendar } from "../../components/Calendar"
import { ListEmployee } from "./Panel/Lists/ListEmployee"
import { ReviewsCall } from "./ReviewsCall"
import { ApproveCall } from "./ReviewsCall/ApproveCall"
import { Calls } from "../Calls"
import { TillageDetails } from "../TillageDetails"
import { ListTillages } from "../TillageDetails/ListTillages"
import { ReportDetails } from "../Calls/LaudoCall/ViewReport/ReportDetails"
import { NewTalhao } from "../TillageDetails/NewTalhao"
import { CallApproved } from "./ReviewsCall/CallApproved"
import { NewEmployee } from "../../components/NewEmployee"
import { ReviewsReports } from "./ReviewsReports"
import { CalendarKit } from "../../components/Kit/CalendarKit"

interface AdmProps {
    user: User
}

export const Adm: React.FC<AdmProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/*" element={<Panel user={user} />} />
            <Route path="/adm" element={<Panel user={user} />} />
            <Route path="/settings-kit/*" element={<SettingsRoutes />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/review/profile/:userId" element={<Userprofile />} />
            <Route path="/profile/:userId" element={<Userprofile view />} />
            <Route path="/reviews" element={<ReviewsEmployee user={user} />} />
            <Route path="/employees" element={<ListEmployee />} />
            <Route path="/producers" element={<ListProducer />} />
            <Route path="/new_producer/*" element={<NewProducer />} />
            <Route path="/new_employee/*" element={<NewEmployee />} />
            <Route path="/calendar/:userid" element={<Calendar />} />
            <Route path="/calls" element={<ReviewsCall user={user} />} />
            <Route path="/calls/:callid" element={<ApproveCall />} />
            <Route path="/calls/talhao/:talhaoid/:callid" element={<CallApproved />} />
            <Route path="/call/*" element={<Calls user={user} />} />
            <Route path="/producer/:producerid" element={<ListTillages />} />
            <Route path="/producer/:producerid/:tillageid" element={<TillageDetails />} />
            <Route path="/producer/:producerid/:tillageid/new_talhao" element={<NewTalhao />} />
            <Route path="/reports" element={<ReviewsReports user={user} />} />
            <Route path="/calendar" element={<CalendarKit />} />
        </ReactRoutes>
    )
}
