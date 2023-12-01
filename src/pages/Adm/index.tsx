import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { SettingsRoutes } from "./Panel/SettingsRoutes"
import { Profile } from "../Profile"
import { Userprofile } from "./Reviews/UserProfile"
import { Reviews } from "./Reviews"
import { Panel } from "./Panel"
import { ListUsers } from "./Panel/Lists/ListUsers"

interface AdmProps {
    user: User
}

export const Adm: React.FC<AdmProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route path="/*" element={ <Panel user={ user } /> } />
            <Route path="/adm" element={<Panel user={user} />} />
            <Route path="/settings-kit/*" element={<SettingsRoutes />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/review/profile/:userId" element={<Userprofile />} />
            <Route path="/profile/:userId" element={<Userprofile view />} />
            <Route path="/reviews" element={ <Reviews user={ user } /> } />
            <Route path="/users" element={<ListUsers />} />
            
        </ReactRoutes>
    )
}
