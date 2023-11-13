import React from 'react';
import { useUser } from './hooks/useUser';
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Signup } from './pages/Signup';
import { Panel } from './pages/Adm/Panel';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Profile } from "./pages/Profile"
import { useNavigationList } from "./hooks/useNavigationList"
import { BottomNavigation } from "./components/BottomNavigation"
import { Analysis } from "./pages/Analysis"
import { Reviews } from "./pages/Adm/Reviews"
import { Userprofile } from "./pages/Adm/Reviews/UserProfile"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()
    const bottomMenu = useNavigationList()

    return user ? (
        user.isAdmin ? (
            <>
                <BottomNavigation section={bottomMenu.admin} />
                <ReactRoutes>
                    <Route index element={<Panel user={user} />} />
                    <Route path="/*" element={<Panel user={user} />} />
                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/profile/:userId" element={<Userprofile />} />
                    <Route path="/history" element={<Reviews user={user} />} />
                </ReactRoutes>
            </>
        ) : !user.approved ? (
            <ReactRoutes>
                <Route path="/*" element={<Analysis user={user} />} />
            </ReactRoutes>
        ) : (
            <p> pipiipoopoo voce não é adm, aguarde um pouco</p>
        )
    ) : (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Home />} />
        </ReactRoutes>
    )
}