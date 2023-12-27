import { Box } from "@mui/system"
import React from "react"

interface WeatherComponentProps {}

export const WeatherComponent: React.FC<WeatherComponentProps> = ({}) => {
    return (
        <Box
            sx={{
                height: "18%",
                flexDirection: "row",
                justifyContent: "space-between",
                p: "2vw",
            }}
        >
            <Box></Box>
            <Box sx={{ width: "40%", alignItems: "end" }}>
                <p style={{ fontWeight: "600" }}>Clima</p>
                <p style={{ fontSize: "3.5vw" }}>Segunda-feira, 15:00</p>
                <p style={{ fontSize: "3.5vw" }}> Sol</p>
            </Box>
        </Box>
    )
}
