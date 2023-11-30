import React from "react"
import { Box, Avatar } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"
import avatar from "../assets/logo/Avatar.png"

interface CardUserProps {
    user: User
    location: string
    review?: boolean
}

export const CardUser: React.FC<CardUserProps> = ({ review, user, location }) => {
    const navigate = useNavigate()
    

    return (
        <Box
            sx={{
                height: "15vw",
                flexDirection: "row",
                gap: "3vw",

                padding: "2vw",
                alignItems: "center",
                borderBottom: "1px solid #88A486",
                justifyContent: "space-between",
            }}
            key={user.id}
        >
            <Box sx={{ flexDirection: "row", gap: "3vw", alignItems: "center" }}>
                <Avatar src={avatar} sx={{ width: "10vw", height: "10vw" }} />
                <p style={{ fontSize: "3.7vw" }}>{user.name}</p>
            </Box>
            <Box sx={{ alignItems: "center", flexDirection: "row" }}>
                <p
                    style={{ fontSize: "3.0vw" }}
                    onClick={() => {
                        navigate(location)
                    }}
                >
                    {review ? "Revisar" : "Verificar calendário"}
                </p>
                <ArrowForwardIosIcon sx={{ width: "3vw", padding: 0 }} />
            </Box>
        </Box>
    )
}
