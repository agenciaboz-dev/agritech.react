import { Accordion, AccordionSummary, Box, Typography, styled } from "@mui/material"
import React from "react"
import { TitleComponents } from "../../../../components/TitleComponents"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { TechReport } from "../../../../definitions/report"

interface TechReportComponentProps {
    tech?: TechReport
}
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const TechReportComponent: React.FC<TechReportComponentProps> = ({ tech }) => {
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw", p: "2vw" }}>
                <Box sx={{ maxheight: "90%", height: "100%", overflowY: "auto" }}>
                    {tech?.flight?.map((item, index) => (
                        <Accordion
                            elevation={0}
                            key={index}
                            expanded={expanded === String(index)}
                            onChange={expandendChange(String(index))}
                        >
                            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                                <Typography>Voo {index + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {" "}
                                <Box key={index}>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Temperatura</p>
                                        <p>{item["temperature"]} °C</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Umidade Relativa</p>
                                        <p>{item["humidity"]} %</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Veloc. Vento</p>
                                        <p>{item["wind_velocity"]} km/h</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Altura de voo</p>
                                        <p>{item["height"]} m</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Faixa de aplicação </p>
                                        <p>{item["faixa"]} m</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Velocidade de voo </p>
                                        <p>{item["flight_velocity"]} km/h</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Volume de tanque </p>
                                        <p>{item["tank_volume"]} L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Taxa de aplicação</p>
                                        <p>{item["rate"]} L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Área Sobrevoada </p>
                                        <p>{item["performance"]} ha</p>
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
