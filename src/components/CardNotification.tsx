import React from "react"
import { Avatar, Box } from "@mui/material"

interface CardNotificationProps {}

export const CardNotification: React.FC<CardNotificationProps> = ({}) => {
    return (
        <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw", width: "100%", justifyContent: "space-between" }}>
            <Box sx={{ flexDirection: "row", gap: "1.5vw", width: "50%", alignItems: "center" }}>
                <Avatar src={""} sx={{ width: "7vw", height: "7vw" }} />
                <p style={{ fontWeight: "800" }}>Ope Tadalla </p>
            </Box>
            <p style={{ fontSize: "3.5vw", textOverflow: "ellipsis", overflowX: "hidden", flexWrap: "nowrap" }}>
                Message longer hgkjdhfgghdfkjhdsghkj
            </p>
            <p style={{ fontWeight: "800", fontSize: "3.5vw" }}>100+</p>
        </Box>
    )
}
