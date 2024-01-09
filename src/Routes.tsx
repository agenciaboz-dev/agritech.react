import React from "react"
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
import { TillageDetails } from "./pages/TillageDetails"
import { OpenCallBox } from "./components/OpenCallBox"
import { CallDetails } from "./pages/Calls/CallDetails"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()
    const bottomMenu = useNavigationList()

    return user ? (
        user.isAdmin ? (
            <>
                <BottomNavigation section={bottomMenu.admin} />
                <ReactRoutes>
                    <Route path="/" element={<Panel user={user} />} />
                    <Route path="/adm/*" element={<Adm user={user} />} />
                    <Route path="/callDetail" element={<CallDetails />} />
                </ReactRoutes>
            </>
        ) : !user.approved ? (
            <ReactRoutes>
                <Route path="/*" element={<Analysis user={user} />} />
                <Route index element={<Analysis user={user} />} />
            </ReactRoutes>
        ) : (
            <>
                <BottomNavigation section={user.employee ? bottomMenu.employee : bottomMenu.producer} />
                <ReactRoutes>
                    {user.employee ? (
                        <>
                            <Route path="/employee/*" element={<Employee user={user} />} />
                            <Route path="/producer/:producerid/:tillageid" element={<TillageDetails />} />
                        </>
                    ) : (
                        <>
                            <Route path="/producer/*" element={<Producer user={user} />} />
                            {/* <Route path="/producer/:tillageid" element={<TillageDetails />} /> */}
                        </>
                    )}

                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/profile/:userId" element={<Userprofile view />} />
                    <Route path="/call/*" element={<Calls user={user} />} />
                </ReactRoutes>
            </>
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
