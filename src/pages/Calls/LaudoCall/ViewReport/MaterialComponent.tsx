import { Accordion, AccordionSummary, Box, Typography, styled } from "@mui/material"
import React from "react"
import { TitleComponents } from "../../../../components/TitleComponents"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { Material } from "../../../../definitions/report"

interface MaterialComponentProps {
    material?: Material[]
}
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const MaterialComponent: React.FC<MaterialComponentProps> = ({ material }) => {
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "2vw", p: "0 2vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}></Box>
                <Box sx={{ height: "100%", overflowY: "auto" }}>
                    {material?.map((item, index) => (
                        <Accordion
                            elevation={0}
                            key={index}
                            expanded={expanded === String(index)}
                            onChange={expandendChange(String(index))}
                        >
                            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                                <Typography>Insumo {index + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box key={index}>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Talhão</p>
                                        <p>{item.talhao}</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Área</p>
                                        <p>{item.area} ha</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Produto</p>
                                        <p>{item.product} </p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Dose/ha</p>
                                        <p>{item.dosage}L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Classificação</p>
                                        <p>{item.classification}</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Total</p>
                                        <p>{item.total}L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Retirado</p>
                                        <p>{item.removed}L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Aplicado</p>
                                        <p>{item.applied}L</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Devolvido</p>
                                        <p>{item.returned}L</p>
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
