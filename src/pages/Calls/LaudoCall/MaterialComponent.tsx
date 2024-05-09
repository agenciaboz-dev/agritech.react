import { Accordion, Box, Typography, useMediaQuery } from "@mui/material"
import { AccordionSummary } from "../../../components/Accordion"
import React, { ChangeEventHandler } from "react"
import { Call } from "../../../definitions/call"
import { TitleComponents } from "../../../components/TitleComponents"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import { useNumberMask } from "burgos-masks"
import { Material, NewReport } from "../../../definitions/report"

interface MaterialComponentProps {
    values: NewReport
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    listMaterials: Material[]
    open: React.MouseEventHandler<HTMLButtonElement> | undefined
}
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const MaterialComponent: React.FC<MaterialComponentProps> = ({ listMaterials, open }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [expanded, setExpanded] = React.useState<string | false>("")
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw", p: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: "bold", fontSize: isMobile ? "3.5vw" : "1rem" }}>Utilização de Insumos</p>
                </Box>
                <Box sx={{ height: "100%", overflowY: "auto" }}>
                    <TitleComponents title="Insumos" button click={open} />
                    {listMaterials.map((item, index) => (
                        <Accordion elevation={0} key={index} expanded={expanded === String(index)} onChange={expandendChange(String(index))}>
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
                                        <p>{item.product} ha</p>
                                    </Box>
                                    <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <p>Dose/ha</p>
                                        <p>{item.dosage}</p>
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
