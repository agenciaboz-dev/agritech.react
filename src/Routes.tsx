import React, { useEffect } from "react"
import { useUser } from "./hooks/useUser"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Panel } from "./pages/Adm/Panel"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { useNavigationList } from "./hooks/useNavigationList"
import { BottomNavigation } from "./components/BottomNavigation"
import { Analysis } from "./pages/Signup/Analysis"
import { Userprofile } from "./pages/Adm/ReviewsEmployee/UserProfile"
import { Adm } from "./pages/Adm"
import { Employee } from "./pages/Employee"
import { Producer } from "./pages/Producer"
import { Calls } from "./pages/Calls"
import { NotificationsList } from "./pages/Notifications/NotificationsList"
import { Terms } from "./pages/Terms"
import { Box } from "@mui/material"
import "./transition.css"

interface RoutesProps {}

const AdminRoutes: React.FC<{ user: User }> = ({ user }) => {
    const bottomMenu = useNavigationList()

    return (
        <Box
            className="page-transition"
            sx={{
                position: "relative",
                height: "100%",
            }}
        >
            <BottomNavigation section={bottomMenu.admin} />
            <ReactRoutes>
                <Route path="/" element={<Panel user={user} />} />
                <Route path="/adm/*" element={<Adm user={user} />} />
                <Route path="/notifications/*" element={<NotificationsList user={user} />} />
            </ReactRoutes>
        </Box>
    )
}

const ReprovedRoutes: React.FC<{ user: User }> = ({ user }) => (
    <ReactRoutes>
        <Route path="/*" element={<Analysis user={user} />} />
        <Route index element={<Analysis user={user} />} />
    </ReactRoutes>
)

const UserRoutes: React.FC<{ user: User }> = ({ user }) => {
    const bottomMenu = useNavigationList()
    return (
        <>
            <BottomNavigation section={user.employee ? bottomMenu.employee : bottomMenu.producer} />
            <ReactRoutes>
                {user.employee ? (
                    <Route path="/employee/*" element={<Employee user={user} />} />
                ) : (
                    <Route path="/producer/*" element={<Producer user={user} />} />
                )}

                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/profile/:userId" element={<Userprofile view />} />
                <Route path="/call/*" element={<Calls user={user} />} />
                <Route path="/notifications" element={<NotificationsList user={user} />} />
            </ReactRoutes>
        </>
    )
}

const UnauthenticatedRoutes = () => (
    <ReactRoutes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
    </ReactRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        user.isAdmin ? (
            <AdminRoutes user={user} />
        ) : user.approved === false ? (
            <ReprovedRoutes user={user} />
        ) : (
            <UserRoutes user={user} />
        )
    ) : (
        <UnauthenticatedRoutes />
    )
}
