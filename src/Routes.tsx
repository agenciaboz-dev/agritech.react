import React from 'react';
import { useUser } from './hooks/useUser';
import { Route, Routes as ReactRoutes } from "react-router-dom"
import { Signup } from './pages/Signup';
import { Panel } from './pages/Adm/Panel';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

interface RoutesProps {
    
}

export const Routes:React.FC<RoutesProps> = ({  }) => {
    const { user } = useUser()
    
        return user ? (
        <ReactRoutes>
            <Route index element={<Panel user={user}/>} />
            <Route path="/*" element={<Panel user={user} />} />

 
        </ReactRoutes>
        ) : (
            <ReactRoutes>
             <Route index element={<Home />} />
             <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
 
        </ReactRoutes>
    )
}