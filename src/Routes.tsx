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

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()
    const bottomMenu = useNavigationList()

    return user ? (
        <>
            <BottomNavigation section={bottomMenu.admin} />
            <ReactRoutes>
                <Route index element={<Panel user={user} />} />
                <Route path="/*" element={<Panel user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
            </ReactRoutes>
        </>
    ) : (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </ReactRoutes>
    )
}