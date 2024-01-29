import { Accordion, AccordionSummary, Box, Typography, styled } from '@mui/material'
import React from 'react';
import { TitleComponents } from '../../../../components/TitleComponents'
import MuiAccordionDetails from "@mui/material/AccordionDetails"

interface TechReportComponentProps {
    tech?:TechReport
}
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const TechReportComponent:React.FC<TechReportComponentProps> = ({ tech }) => {
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <Box sx={{ gap: "3vw" }}>
        <Box sx={{ gap: "3vw", p: "2vw" }}>
            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold", fontSize: "3.5vw" }}>Laudo Técnico</p>
                
            </Box>
            <Box sx={{ height: "100%", overflowY: "auto" }}>
                <TitleComponents title="Voos"  />
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
                                    <p>{item.temperature} °C</p>
                                </Box>
                                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <p>Umidade Relativa</p>
                                    <p>{item.humidity} %</p>
                                </Box>
                                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <p>Veloc. Vento</p>
                                    <p>{item.flight_velocity} km/h</p>
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
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    </Box>
    )
}