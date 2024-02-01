import { Box } from "@mui/system"
import React from "react"
import sun from "../assets/icons/sun.svg"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale"

interface WeatherComponentProps {}

const style = {
    fontSize: "3vw",
    color: "gray",
}

export const WeatherComponent: React.FC<WeatherComponentProps> = ({}) => {
    const currentDateTime = new Date()
    const formattedDateTime = format(currentDateTime, "EEEE, HH:mm", { locale: ptBR })

    const dateTime = formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1)
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
                <p style={{ fontSize: "2.9vw" }}>{dateTime}</p>
                <p style={{ fontSize: "3vw" }}> Sol</p>
            </Box>
        </Box>
    )
}
