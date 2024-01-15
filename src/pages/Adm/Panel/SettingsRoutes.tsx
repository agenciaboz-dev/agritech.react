import React from "react"
import { Route, Routes as ReactRoutes, useNavigate } from "react-router-dom"
import { AddKit } from "./AddKit"
import { SettingsKit } from "./SettingsKit"
import { ViewKit } from "./ViewKit"

interface SettingsRoutesProps {}

export const SettingsRoutes: React.FC<SettingsRoutesProps> = ({}) => {
    return (
        <ReactRoutes>
            <Route index element={<SettingsKit />} />
            <Route path="/:kitid" element={<ViewKit />} />
            <Route path="/addkit" element={<AddKit />} />
        </ReactRoutes>
    )
}
