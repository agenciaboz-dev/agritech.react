import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { Call } from "../../../definitions/call"
import { TitleComponents } from "../../../components/TitleComponents"

interface TechReportProps {
    user: User
    values: any
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listFlights: Flight[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const TechReport: React.FC<TechReportProps> = ({ values, change, user, listFlights, open }) => {
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw", p: "2vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold", fontSize: "3.5vw" }}>Laudo Técnico</p>
                </Box>
                <TitleComponents title="Voos" button click={open} />
                {listFlights.map((item, index) => (
                    <Box key={index}>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Temperatura</p>
                            <p>{item.temperature} °C</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Umidade Relativa</p>
                            <p>{item.humidity} %</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Veloc. Vento</p>
                            <p>{item.flight_velocity} Km/h</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Altura de voo</p>
                            <p>{item.height} m</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Faixa de aplicação </p>
                            <p>{item.faixa} m</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Velocidade de voo </p>
                            <p>{item.faixa} km/h</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Volume de tanque </p>
                            <p>{item.faixa} L</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Taxa de aplicação</p>
                            <p>{item.faixa} L</p>
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>Rendimento por vôo </p>
                            <p>{item.faixa} ha</p>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
