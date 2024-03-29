import { Accordion, Box, TextField, Typography } from "@mui/material"
import { AccordionSummary } from "../../../components/Accordion"
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react"
import { TitleComponents } from "../../../components/TitleComponents"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import { textField } from "../../../style/input"
import MaskedInput from "../../../components/MaskedInput"
import { Flight, NewReport } from "../../../definitions/report"
import { LocalizationProvider, TimeField, ptBR } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CiClock2 } from "react-icons/ci"

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
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))
export const TechReportComponent: React.FC<TechReportComponentProps> = ({
    values,
    change,
    user,
    listFlights,
    open,
    initPick,
    setInitPick,
    finishPick,
    setFinishPick,
}) => {
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
                <Box sx={{ height: "100%", overflowY: "auto", gap: "4vw" }}>
                    {/* <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                        <DemoContainer components={["TimeField", "TimeField", "TimeField"]} sx={{ paddingTop: 0 }}>
                            <Box sx={{ flexDirection: "row", gap: "1vw", paddingTop: "0" }}>
                                {values?.techReport?.init && (
                                    <TimeField
                                        label="Início"
                                        name="init"
                                        sx={{ ...textField }}
                                        value={initPick}
                                        onChange={(newValue) => setInitPick(newValue)}
                                        format="HH:mm"
                                        ampm={false}
                                        InputProps={{
                                            inputMode: "numeric",
                                            endAdornment: (
                                                <CiClock2
                                                    style={{
                                                        color: "black",
                                                        width: "6vw",
                                                        height: "6vw",
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                )}
                                {values?.techReport?.finish && (
                                    <TimeField
                                        label="Final"
                                        name="finish"
                                        sx={{ ...textField }}
                                        value={finishPick}
                                        onChange={(newValue) => setFinishPick(newValue)}
                                        format="HH:mm"
                                        ampm={false}
                                        InputProps={{
                                            inputMode: "numeric",
                                            endAdornment: (
                                                <CiClock2
                                                    style={{
                                                        color: "black",
                                                        width: "6vw",
                                                        height: "6vw",
                                                    }}
                                                />
                                            ),
                                        }}
                                    />
                                )}
                            </Box>
                        </DemoContainer>
                    </LocalizationProvider> */}

                    <TitleComponents title="Voos" button click={open} />
                    {listFlights.map((item, index) => (
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
