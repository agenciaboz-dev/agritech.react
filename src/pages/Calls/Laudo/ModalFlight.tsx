import { Modal, ModalContent, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdHeight, MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Box, IconButton } from "@mui/material"
import { AiOutlineDelete } from "react-icons/ai"
import { colors } from "../../../style/colors"
import { LiaTemperatureLowSolid } from "react-icons/lia"
import { WiHumidity } from "react-icons/wi"
import { FaWind } from "react-icons/fa"

interface ModalFlightProps {
    flight: Flight[]
    setFlight: (values: Flight[]) => void
    opened: boolean
    close: () => void
}

export const ModalFlight: React.FC<ModalFlightProps> = ({ opened, close, flight, setFlight }) => {
    const addObject = () => {
        setFlight([
            ...flight,
            {
                temperature: 0,
                faixa: 0,
                flight_velocity: 0,
                height: 0,
                humidity: 0,
                performance: 1,
                rate: 0,
                tank_volume: 0,
                wind_velocity: 0,
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
                <Box sx={{ gap: "0.5vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Voo {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <TextInput
                            label="Temperatura (ºC)"
                            name="name"
                            value={item.temperature}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<LiaTemperatureLowSolid style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />

                        <TextInput
                            label="Umidade Relativa (%)"
                            name="name"
                            value={item.humidity}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<WiHumidity style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Box>
                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <TextInput
                            label="Veloc. Vento (Km/h)"
                            name="name"
                            value={item.wind_velocity}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<FaWind style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />

                        <TextInput
                            label="Altura de voo (m)"
                            name="name"
                            value={item.height}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<MdHeight style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Box>

                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <TextInput
                            label="Faixa de aplicação (m)"
                            name="name"
                            value={item.faixa}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />

                        <TextInput
                            label="Veloc. de voo (km/h)"
                            name="name"
                            value={item.flight_velocity}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<FaWind style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Box>

                    <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                        <TextInput
                            label="Volume de tanque (L)"
                            name="name"
                            value={item.tank_volume}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />

                        <TextInput
                            label="Taxa de aplicação (L)"
                            name="name"
                            value={item.rate}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Box>
                    <Box sx={{ flexDirection: "row", gap: "2vw", width: "48%" }}>
                        <TextInput
                            label="Rendimento (ha)"
                            name="name"
                            value={item.performance}
                            data-autofocus
                            type="number"
                            withAsterisk
                            styles={{ input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </Box>
                </Box>
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
