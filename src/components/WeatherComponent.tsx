import { Box } from "@mui/system"
import React from "react"
import sun from "../assets/icons/sun.svg"

interface WeatherComponentProps {}

const style = {
    fontSize: "3vw",
    color: "gray",
}

export const WeatherComponent: React.FC<WeatherComponentProps> = ({}) => {
    return (
        <Box
            sx={{
                height: "18%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                p: "0vw",
            }}
        >
            <Box sx={{ flexDirection: "row", alignItems: "center", gap: "3vw", width: "70%" }}>
                <img src={sun} />
                <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                    <p style={{ fontSize: "8vw" }}>28</p>
                    <p style={{ fontSize: "2.8vw", paddingTop: "3vw" }}>°C | °F</p>
                </Box>
                <Box>
                    <p style={style}>Chuva: 4%</p>
                    <p style={style}>Umidade: 37%</p>
                    <p style={style}>Vento: 10 km/h</p>
                </Box>
            </Box>
            <Box sx={{ width: "30%", alignItems: "end" }}>
                <p style={{ fontWeight: "600", fontSize: "3.5vw" }}>Clima</p>
                <p style={{ fontSize: "2.9vw" }}>Segunda-feira, 15:00</p>
                <p style={{ fontSize: "3vw" }}> Sol</p>
            </Box>
        </Box>
    )
}
