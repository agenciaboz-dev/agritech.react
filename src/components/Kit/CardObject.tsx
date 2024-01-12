import React from "react"
import { NewObject } from "../../definitions/object"
import { Box } from "@mui/material"

interface CardObjectProps {
    object: NewObject
}

export const CardObject: React.FC<CardObjectProps> = ({ object }) => {
    return (
        <Box sx={{ flexDirection: "row", gap: "1vw", p: "2vw", pt: "1vw", pb: "1vw" }}>
            <p style={{ fontSize: "3.5vw", width: "12%" }}>
                {object.quantity} <span style={{ fontWeight: "bold" }}>x</span>
            </p>
            <Box sx={{ flexDirection: "column" }}>
                <p style={{ fontSize: "3.5vw" }}>{object.name}</p>
                <p
                    style={{
                        fontSize: "3vw",
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
