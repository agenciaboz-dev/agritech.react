import React, { useEffect, useState } from "react"
import { Box, Avatar, Skeleton, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const io = useIo()
    const dynamicImageRef = useVisibleCallback(() => io.emit("tillage:cover", tillage.id), {
        no_observe: !!tillage.cover,
    })
    const [cover, setCover] = useState("")

    useEffect(() => {
        // console.log(tillage)
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
                height: isMobile ? "22vw" : "fit-content",
                flexDirection: "row",
                gap: isMobile ? "3vw" : "1vw",
                padding: isMobile ? "4vw 2vw" : "1vw",
                alignItems: "center",
                borderBottom: "1px solid #88A486",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
            key={tillage.id}
            onClick={() => {
                navigate(location)
            }}
        >
            <Box sx={{ flexDirection: "row", gap: isMobile ? "3vw" : "2vw", alignItems: "center" }}>
                <Avatar
                    variant="rounded"
                    src={cover}
                    sx={{
                        width: isMobile ? "18vw" : "10vw",
                        height: isMobile ? "18vw" : "10vw",
                        borderRadius: isMobile ? "3vw" : "2vw",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: 0 }}>
                    <p style={{ fontSize: isMobile ? "4vw" : "1.2rem", fontWeight: "bold" }}>{tillage.name}</p>
                    <p style={{ fontSize: isMobile ? "3.8vw" : "1rem" }}> {tillage.area} ha</p>
                </Box>
            </Box>
            <Box
                sx={{ alignItems: "center", flexDirection: "row", cursor: "pointer" }}
                onClick={() => {
                    navigate(location)
                }}
            >
                <p style={{ fontSize: isMobile ? "3.0vw" : "1rem" }}>Ver</p>
                <ArrowForwardIosIcon sx={{ width: "3vw", padding: 0 }} />
            </Box>
        </Box>
    ) : (
        <Box
            ref={dynamicImageRef}
            sx={{
                height: isMobile ? "22vw" : "fit-content",
                flexDirection: "row",
                gap: isMobile ? "3vw" : "1vw",
                padding: isMobile ? "4vw 2vw" : "1vw",
                alignItems: "center",
                borderBottom: "1px solid #88A486",
                justifyContent: "space-between",
            }}
            key={tillage.id}
        >
            <Box sx={{ flexDirection: "row", gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{
                        width: isMobile ? "18vw" : "10vw",
                        height: isMobile ? "18vw" : "10vw",
                        borderRadius: isMobile ? "3vw" : "2vw",
                    }}
                />
                {isMobile && (
                    <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "30vw", height: "4vw" }} />
                        <Skeleton animation="wave" variant="rounded" sx={{ width: "22vw", height: "3vw" }} />
                    </Box>
                )}
            </Box>
            {cover && (
                <Box sx={{ alignItems: "center", flexDirection: "row" }}>
                    <p
                        style={{ fontSize: isMobile ? "3.0vw" : "1rem" }}
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
