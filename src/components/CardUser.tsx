import React from "react"
import { Box, Avatar } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"

interface CardUserProps {
    user: User
    location: string
}

export const CardUser: React.FC<CardUserProps> = ({ user, location }) => {
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
                <Avatar src="" sx={{ width: "12vw", height: "12vw" }} />
                <p>{user.name}</p>
            </Box>
            <Box sx={{ alignItems: "center", flexDirection: "row" }}>
                <p
                    style={{ fontSize: "3.5vw" }}
                    onClick={() => {
                        navigate(location)
                    }}
                >
                    Revisar{" "}
                </p>
                <ArrowForwardIosIcon sx={{ width: "3vw", padding: 0 }} />
            </Box>
        </Box>
    )
}
