import React from "react"
import { Box, Avatar } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"
import geo from "../assets/geo.svg"

interface CardTillageProps {
    tillage: Tillage
    location: string
    review?: boolean
}

export const CardTillage: React.FC<CardTillageProps> = ({ tillage, location }) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: "15vw",
                flexDirection: "row",
                gap: "3vw",

                padding: "4vw 2vw",
                alignItems: "center",
                borderBottom: "1px solid #88A486",
                justifyContent: "space-between",
            }}
            key={tillage.id}
        >
            <Box sx={{ flexDirection: "row", gap: "3vw", alignItems: "center" }}>
                <Avatar variant="rounded" src={geo} sx={{ width: "12vw", height: "12vw" }} />
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <p style={{ fontSize: "3.7vw", fontWeight: "bold" }}>{tillage.name}</p>
                    <p style={{ fontSize: "3.5vw" }}> 1.500 Hc</p>
                </Box>
            </Box>
            <Box sx={{ alignItems: "center", flexDirection: "row" }}>
                <p
                    style={{ fontSize: "3.0vw" }}
                    onClick={() => {
                        navigate(location)
                    }}
                >
                    Ver
                </p>
                <ArrowForwardIosIcon sx={{ width: "3vw", padding: 0 }} />
            </Box>
        </Box>
    )
}
