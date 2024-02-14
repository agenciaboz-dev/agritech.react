import { Box } from "@mui/system"
import React, { useEffect } from "react"
import sun from "../assets/icons/sun.svg"
import { format } from "date-fns-tz"
import { ptBR } from "date-fns/locale"

import clear_day from "../assets/icons/SVG/2nd Set - Color/clear-day.svg"
import clear_night from "../assets/icons/SVG/2nd Set - Color/clear-night.svg"
import cloudy from "../assets/icons/SVG/2nd Set - Color/cloudy.svg"
import fog from "../assets/icons/SVG/2nd Set - Color/fog.svg"
import hail from "../assets/icons/SVG/2nd Set - Color/hail.svg"
import partly_cloudy_day from "../assets/icons/SVG/2nd Set - Color/partly-cloudy-day.svg"
import partly_cloudy_night from "../assets/icons/SVG/2nd Set - Color/partly-cloudy-night.svg"
import rain_snow_showers_day from "../assets/icons/SVG/2nd Set - Color/rain-snow-showers-day.svg"
import rain_snow_showers_night from "../assets/icons/SVG/2nd Set - Color/rain-snow-showers-night.svg"
import rain_snow from "../assets/icons/SVG/2nd Set - Color/rain-snow.svg"
import rain from "../assets/icons/SVG/2nd Set - Color/rain.svg"
import showers_day from "../assets/icons/SVG/2nd Set - Color/showers-day.svg"
import showers_night from "../assets/icons/SVG/2nd Set - Color/showers-night.svg"
import sleet from "../assets/icons/SVG/2nd Set - Color/sleet.svg"
import snow_showers_day from "../assets/icons/SVG/2nd Set - Color/snow-showers-day.svg"
import snow_showers_night from "../assets/icons/SVG/2nd Set - Color/snow-showers-night.svg"
import snow from "../assets/icons/SVG/2nd Set - Color/snow.svg"
import thunder_rain from "../assets/icons/SVG/2nd Set - Color/thunder-rain.svg"
import thunder_showers_day from "../assets/icons/SVG/2nd Set - Color/thunder-showers-day.svg"
import thunder_showers_night from "../assets/icons/SVG/2nd Set - Color/thunder-showers-night.svg"
import thunder from "../assets/icons/SVG/2nd Set - Color/thunder.svg"
import wind from "../assets/icons/SVG/2nd Set - Color/wind.svg"

interface WeatherComponentProps {
    dataWeather: any
    icon: string
}

const style = {
    fontSize: "3vw",
    color: "gray",
}

const iconMappings: { [key: string]: string } = {
    "clear-day": clear_day,
    snow: snow,
    rain: rain,
    wind: wind,
    fog: fog,
    cloudy: cloudy,
    hail: hail,
    sleet: sleet,
    thunder: thunder,
    "clear-night": clear_night,
    "snow-showers-day": snow_showers_day,
    "snow-showers-night": snow_showers_night,
    "thunder-rain": thunder_rain,
    "thunder-showers-day": thunder_showers_day,
    "thunder-showers-night": thunder_showers_night,
    "showers-day": showers_day,
    "showers-night": showers_night,
    "partly-cloudy-day": partly_cloudy_day,
    "partly-cloudy-night": partly_cloudy_night,
    "rain-snow-showers-day": rain_snow_showers_day,
    "rain-snow-showers-night": rain_snow_showers_night,
    "rain-snow-": rain_snow,
}
export const WeatherComponent: React.FC<WeatherComponentProps> = ({ dataWeather, icon }) => {
    const currentDateTime = new Date()
    const formattedDateTime = format(currentDateTime, "EEEE, HH:mm", { locale: ptBR })

    const dateTime = formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1)
    useEffect(() => {
        console.log({ dados: dataWeather })
    }, [dataWeather])
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
                <img src={partly_cloudy_day} style={{ width: "18vw", height: "18vw" }} />
                <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                    <p style={{ fontSize: "8vw" }}>28</p>
                    <p style={{ fontSize: "2.8vw", paddingTop: "3vw" }}>°C </p>
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
