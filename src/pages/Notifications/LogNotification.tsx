import { Avatar, Box } from "@mui/material"
import React from "react"

interface LogNotificationProps {
    // action: string
}

export const LogNotification: React.FC<LogNotificationProps> = ({  }) => {
    // const message = action ? "new" :
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#F0F9F2",
                p: "3vw",
                borderRadius: "4vw",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ flexDirection: "row", gap: "1.5vw", width: "90%", alignItems: "center" }}>
                <Avatar src={""} sx={{ width: "11vw", height: "11vw" }} />
                <Box sx={{ flexDirection: "column", width: "80%", flexWrap: "nowrap" }}>
                    <p style={{ fontWeight: "800", fontSize: "0.9rem" }}>Cris Tadalla </p>
                    <p
                        style={{
                            display: "flex",
                            fontSize: "3.0vw",
                            textOverflow: "ellipsis",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            width: "100%",
                        }}
                    >
                        {/* {message} */}
                    </p>
                </Box>
            </Box>
            <p style={{ fontWeight: "800", fontSize: "3.5vw" }}>100+</p>
        </Box>
    )
}
