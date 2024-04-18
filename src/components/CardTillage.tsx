import React, { useEffect, useState } from "react"
import { Box, Avatar, Skeleton } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigate } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { useVisibleCallback } from "burgos-use-visible-callback"

interface CardTillageProps {
    tillage: Tillage
    location: string
    review?: boolean
}

export const CardTillage: React.FC<CardTillageProps> = ({ tillage, location }) => {
    const navigate = useNavigate()
    const io = useIo()
    const dynamicImageRef = useVisibleCallback(() => io.emit("tillage:cover", tillage.id), {
        no_observe: !!tillage.cover, 
    })
    const [cover, setCover] = useState("")

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

    return cover ? (
        <Box
            ref={dynamicImageRef}
            sx={{
                height: "22vw",
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
                <Avatar variant="rounded" src={cover} sx={{ width: "18vw", height: "18vw", borderRadius: "3vw" }} />
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
    ) : (
        <Box
            ref={dynamicImageRef}
            sx={{
                height: "22vw",
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
                <Skeleton animation="wave" variant="rounded" sx={{ width: "18vw", height: "18vw" }} />
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <Skeleton animation="wave" variant="rounded" sx={{ width: "30vw", height: "4vw" }} />
                    <Skeleton animation="wave" variant="rounded" sx={{ width: "22vw", height: "3vw" }} />
                </Box>
            </Box>
            {cover && (
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
            )}
        </Box>
    )
}
