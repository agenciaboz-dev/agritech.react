import React from "react"
import { NewObject } from "../../definitions/object"
import { Box, useMediaQuery } from "@mui/material"

interface CardObjectProps {
    object: NewObject
}

export const CardObject: React.FC<CardObjectProps> = ({ object }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box sx={{ flexDirection: "row", gap: "1vw", p: isMobile ? "2vw" : "1vw", pt: "1vw", pb: "1vw" }}>
            <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem", width: isMobile ? "12%" : "fit-content" }}>
                {object.quantity} <span style={{ fontWeight: "bold" }}>x</span>
            </p>
            <Box sx={{ flexDirection: "column" }}>
                <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem" }}>{object.name}</p>
                <p
                    style={{
                        fontSize: isMobile ? "3vw" : "1.2rem",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    {object.description}
                </p>
            </Box>
        </Box>
    )
}
