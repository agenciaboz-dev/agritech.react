import { Accordion, Box, Typography, useMediaQuery } from "@mui/material"
import { AccordionSummary } from "../../../components/Accordion"
import React, { ChangeEventHandler } from "react"
import { TitleComponents } from "../../../components/TitleComponents"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import { Flight, NewReport } from "../../../definitions/report"

interface TechReportComponentProps {
    user: User
    values: NewReport
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listFlights: Flight[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
    initPick: React.Dispatch<React.SetStateAction<null>>
    setInitPick: React.Dispatch<React.SetStateAction<null>>
    finishPick: React.Dispatch<React.SetStateAction<null>>
    setFinishPick: React.Dispatch<React.SetStateAction<null>>
}
const AccordionDetails = styled(MuiAccordionDetails)(({}) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const TechReportComponent: React.FC<TechReportComponentProps> = ({ listFlights, open }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw", p: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold", fontSize: isMobile ? "3.5vw" : "1rem" }}>Laudo Técnico</p>
                </Box>
                <Box sx={{ height: "80%", gap: isMobile ? "4vw" : "1vw" }}>
                    <TitleComponents title="Voos" button click={open} />
                    {listFlights.map((item, index) => (
                        <Accordion elevation={0} key={index} expanded={expanded === String(index)} onChange={expandendChange(String(index))}>
                            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                                <Typography>Voo {index + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                        <p>{item.wind_velocity} km/h</p>
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
                                        <p>{item.flight_velocity} km/h</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Volume de tanque </p>
                                        <p>{item.tank_volume} L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Taxa de aplicação</p>
                                        <p>{item.rate} L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Área Sobrevoada </p>
                                        <p>{item.performance} ha</p>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
