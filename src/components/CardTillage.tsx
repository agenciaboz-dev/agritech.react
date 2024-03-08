import React, { useEffect, useState } from "react"
import { Box, Avatar } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"
import geo from "../assets/geo.svg"
import { useIo } from "../hooks/useIo"

interface CardTillageProps {
    tillage: Tillage
    location: string
    review?: boolean
}

export const CardTillage: React.FC<CardTillageProps> = ({ tillage, location }) => {
    const navigate = useNavigate()
    const io = useIo()
    const [cover, setCover] = useState("")

    useEffect(() => {
        io.emit("tillage:cover", tillage.id)
    }, [])

    useEffect(() => {
        io.on("tillage:cover:success", (data: { tillageId: number; cover: string }) => {
            if (data.tillageId === tillage.id) {
                setCover(data.cover)
            }
        })
        return () => {
            io.off("tillage:cover:success")
        }
    }, [tillage])

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
                <Avatar variant="rounded" src={cover} sx={{ width: "12vw", height: "12vw" }} />
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <p style={{ fontSize: "3.7vw", fontWeight: "bold" }}>{tillage.name}</p>
                    <p style={{ fontSize: "3.5vw" }}> {tillage.area} ha</p>
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
