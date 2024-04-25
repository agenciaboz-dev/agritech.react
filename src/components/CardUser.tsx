import React from "react"
import { Box, Avatar, useMediaQuery } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"
import avatar from "../assets/logo/Avatar.png"
import { OfficeDot } from "./OfficeDot"

interface CardUserProps {
    user: User
    location: string
    review?: boolean
}

export const CardUser: React.FC<CardUserProps> = ({ review, user, location }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: isMobile ? "13.5vw" : "fit-content",
                flexDirection: "row",
                gap: "3vw",
                padding: isMobile ? "2vw" : "0.5vw",
                alignItems: "center",
                borderBottom: "1px solid #88A486",
                justifyContent: "space-between",
            }}
            key={user.id}
        >
            <Box sx={{ flexDirection: "row", gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                <Avatar src={user.image} sx={{ width: isMobile ? "9.5vw" : "3vw", height: isMobile ? "9.5vw" : "3vw" }} />
                <Box sx={{ flexDirection: "column" }}>
                    {!user.producer && <OfficeDot office={user.office} />}
                    <p
                        style={{
                            fontSize: isMobile ? "3.7vw" : "1rem",
                            width: "40vw",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flexWrap: "nowrap",
                        }}
                    >
                        {user.name}
                    </p>
                </Box>
            </Box>
            <Box
                sx={{ alignItems: "center", flexDirection: "row", cursor: "pointer" }}
                onClick={() => {
                    navigate(location)
                }}
            >
                <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}>
                    {user.producer ? "Revisar Informações" : review ? "Revisar" : "Verificar calendário"}
                </p>
                <ArrowForwardIosIcon sx={{ width: "3vw", padding: 0 }} />
            </Box>
        </Box>
    )
}
