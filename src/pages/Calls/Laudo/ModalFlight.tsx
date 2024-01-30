import { Modal, ModalContent, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdHeight, MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Accordion, Box, IconButton, Typography } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"
import { LiaTemperatureLowSolid } from "react-icons/lia"
import { WiHumidity } from "react-icons/wi"
import { FaWind } from "react-icons/fa"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import { AccordionSummary } from "../../../components/Accordion"

interface ModalFlightProps {
    flight: Flight[]
    setFlight: (values: Flight[]) => void
    opened: boolean
    close: () => void
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ModalFlight: React.FC<ModalFlightProps> = ({ opened, close, flight, setFlight }) => {
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const addObject = () => {
        setFlight([
            ...flight,
            {
                temperature: "",
                faixa: "",
                flight_velocity: "",
                height: "",
                humidity: "",
                performance: "",
                rate: "",
                tank_volume: "",
                wind_velocity: "",
            },
        ])
    }
    const deleteObject = (id: number) => {
        const newObj = flight.filter((_, index) => index !== id)
        setFlight(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newObj = [...flight]
        newObj[index] = {
            ...newObj[index],
            [event.target.name]: event.target.value,
        }
        setFlight(newObj)
    }

    const saveObject = () => {
        close()
    }
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title="Inserir Voos"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            {flight.map((item, index) => (
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
                        <Box sx={{ gap: "0.5vw" }} key={index}>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <h4>Voo {index + 1}</h4>
                                <IconButton onClick={() => deleteObject(index)}>
                                    <AiOutlineDelete color={colors.delete} />
                                </IconButton>
                            </Box>

                            <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                <TextInput
                                    label="Temperatura "
                                    name="temperature"
                                    value={item.temperature}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>ºC</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />

                                <TextInput
                                    label="Umidade Relativa"
                                    name="humidity"
                                    value={item.humidity}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>%</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                <TextInput
                                    label="Veloc. Vento"
                                    name="wind_velocity"
                                    value={item.wind_velocity}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p style={{ fontSize: "2.9vw" }}>km/h</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />

                                <TextInput
                                    label="Altura de voo "
                                    name="height"
                                    value={item.height}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>m</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Box>

                            <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                <TextInput
                                    label="Faixa de aplicação"
                                    name="faixa"
                                    value={item.faixa}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>m</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />

                                <TextInput
                                    label="Veloc. de voo"
                                    name="flight_velocity"
                                    value={item.flight_velocity}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p style={{ fontSize: "2.9vw" }}>km/h</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Box>

                            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                                <TextInput
                                    label="Volume de tanque"
                                    name="tank_volume"
                                    value={item.tank_volume}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>L</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />

                                <TextInput
                                    label="Taxa de aplicação"
                                    name="rate"
                                    value={item.rate}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>L</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Box>
                            <Box sx={{ flexDirection: "row", gap: "2vw", width: "48%" }}>
                                <TextInput
                                    label="performance"
                                    name="performance"
                                    value={item.performance}
                                    data-autofocus
                                    withAsterisk
                                    styles={{ input: { border: "1px solid black" } }}
                                    rightSection={<p>ha</p>}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                <ButtonAgritech
                    variant="outlined"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "3.6vw",
                        p: "2vw",
                        bgColor: "red",
                        color: colors.text.black,
                    }}
                    onClick={addObject}
                >
                    <MdOutlineAdd color="#000" />
                    Voo
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "3.6vw",
                        p: "2vw",
                        bgcolor: colors.button,
                        color: colors.text.white,
                    }}
                    onClick={saveObject}
                >
                    Salvar
                </ButtonAgritech>
            </Box>
        </Modal>
    )
}
