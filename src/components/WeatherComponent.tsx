import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
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
import { CircularProgress, Skeleton, useMediaQuery } from "@mui/material"
import { colors } from "../style/colors"

interface WeatherComponentProps {
    dataWeather?: CurrentConditions
    icon: string
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
const climaMappings: { [key: string]: string } = {
    "clear-day": "Dia Limpo",
    snow: "Neve",
    rain: "Chuva",
    wind: "Vento forte",
    fog: "Névoa",
    cloudy: "Nublado",
    hail: hail,
    sleet: "Granizo",
    thunder: "Raios",
    "clear-night": "Noite Limpa",
    "thunder-rain": "Chuva com raios",
    "thunder-showers-day": thunder_showers_day,
    "thunder-showers-night": thunder_showers_night,
    "showers-day": showers_day,
    "showers-night": showers_night,
    "partly-cloudy-day": "Parcialmente nublado",
    "partly-cloudy-night": "Parcialmente nublado",
    "rain-snow-showers-day": rain_snow_showers_day,
    "rain-snow-showers-night": rain_snow_showers_night,
    "rain-snow": rain_snow,
}
export const WeatherComponent: React.FC<WeatherComponentProps> = ({ dataWeather, icon }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const currentDateTime = new Date()
    const formattedDateTime = format(currentDateTime, "EEEE, HH:mm", { locale: ptBR })
    const [data, setData] = useState<CurrentConditions>()
    const [loading, setLoading] = useState(false)

    const dateTime = formattedDateTime.charAt(0).toUpperCase() + formattedDateTime.slice(1)
    useEffect(() => {
        console.log({ dados: dataWeather })
        setData(dataWeather)
    }, [dataWeather])

    return (
        <Box
            sx={{
                height: isMobile ? "18%" : "fit-content",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                p: "0vw",
            }}
        >
            <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "3vw" : "1vw", width: "65%" }}>
                {data ? (
                    <img src={iconMappings[icon]} style={{ width: isMobile ? "17vw" : "5vw", height: isMobile ? "17vw" : "5vw" }} />
                ) : (
                    <Skeleton animation="wave" variant="rounded" sx={{ width: isMobile ? "17vw" : "5vw", height: isMobile ? "17vw" : "5vw" }} />
                )}

                {data ? (
                    <Box sx={{ display: "contents" }}>
                        <Box sx={{ flexDirection: "row", gap: isMobile ? "1vw" : 0 }}>
                            <p style={{ fontSize: isMobile ? "8vw" : "2rem" }}>{data?.temp && ((data?.temp - 32) / 1.8).toFixed(0)}</p>
                            <p style={{ fontSize: isMobile ? "2.8vw" : "1.5rem", paddingTop: isMobile ? "3vw" : "0.7vw" }}>°C </p>
                        </Box>
                        <Box>
                            <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                                Chuva: {data && data.preciptype === null ? 0 : data?.preciptype}%
                            </p>
                            <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>Umidade: {data && data.humidity}%</p>
                            <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                                Vento: {data && data.windspeed === null ? 0 : data?.windspeed} km/h
                            </p>
                        </Box>
                    </Box>
                ) : (
                    <Skeleton animation="wave" variant="rounded" sx={{ width: "40vw", height: isMobile ? "17vw" : "9vw" }} />
                )}
            </Box>
            <Box sx={{ width: "35%", alignItems: "end" }}>
                <p style={{ fontWeight: "600", fontSize: isMobile ? "3.5vw" : "1.2rem" }}>Clima</p>
                <p style={{ fontSize: isMobile ? "2.9vw" : "1rem" }}>{dateTime}</p>
                {data ? (
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem" }}> {data?.icon && climaMappings[data.icon]}</p>
                ) : (
                    <Skeleton animation="wave" variant="rounded" sx={{ width: "25vw", height: isMobile ? "4vw" : "2vw" }} />
                )}
            </Box>
        </Box>
    )
}
