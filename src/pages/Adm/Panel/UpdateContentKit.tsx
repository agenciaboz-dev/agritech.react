import { Box, TextField, Avatar as KitImage, useMediaQuery } from "@mui/material"
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { Avatar } from "@files-ui/react"
import { TitleComponents } from "../../../components/TitleComponents"
import { useDisclosure } from "@mantine/hooks"
import { ModalObject } from "../../../components/Kit/ModalObject"
import { useIo } from "../../../hooks/useIo"
import { NewObject } from "../../../definitions/object"
import { CardTeam } from "../../../components/Kit/CardTeam"
import { CardObject } from "../../../components/Kit/CardObject"
import { ModalObjectUpdate } from "../../../components/Kit/ModalObjectUpdate"
import { useNumberMask } from "burgos-masks"
import MaskedInputNando from "../../../components/MaskedNando"
import { ModalEmployeeUpdate } from "../../../components/Kit/ModalEmployeeU"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface UpdateContentKitProps {
    edit?: boolean
    values: NewKit
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    kit: Kit
    data: {
        list: User[] | undefined
        listObjects: NewObject[]
        setListObjects: (value: NewObject[]) => void
        team: User[]
        setListEmployees: (value: User[]) => void
        dataEmployee: User[] | undefined
        image: File | undefined
        setImage: React.Dispatch<React.SetStateAction<File | undefined>>
    }
}

const style_p = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textDecoration: "underline",
}

export const UpdateContentKit: React.FC<UpdateContentKitProps> = ({ edit, values, handleChange, data, kit }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const navigate = useNavigate()
    const { user } = useUser()
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })
    const [openedModalObjects, { open, close }] = useDisclosure(false)
    const [openedModalEmployees, { open: openEmployees, close: closeEmployees }] = useDisclosure(false)

    useEffect(() => {
        console.log(data.listObjects)
    }, [data.listObjects])

    return (
        <Box sx={{ flexDirection: "column", gap: isMobile ? "4vw" : "1vw", width: "100%", height: "98%", overflow: "hidden" }}>
            <ModalObjectUpdate opened={openedModalObjects} close={close} object={data.listObjects} setObject={data.setListObjects} />
            <ModalEmployeeUpdate
                opened={openedModalEmployees}
                close={closeEmployees}
                employees={data.team}
                setEmployees={data.setListEmployees}
                allEmployees={data.list}
                kit={kit}
            />

            <TitleComponents
                title="Informações Básicas"
                button={user?.isAdmin}
                textButton="Acessar Calendário"
                styleButton={true}
                click={() => {
                    navigate(`/adm/kit/calendar/${kit.id}`)
                }}
            />
            <Box sx={{ width: 1, height: "100%", overflow: "auto", gap: isMobile ? "2vw" : "1vw", paddingBottom: isMobile ? "" : "400vh" }}>
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", alignItems: "center" }}>
                    {edit ? (
                        <Avatar
                            src={data.image || values.image || null}
                            onChange={(file) => data.setImage(file)}
                            changeLabel="Trocar foto"
                            emptyLabel="Adicionar foto"
                            variant="square"
                            style={{
                                width: isMobile ? "26vw" : "10vw",
                                height: isMobile ? "26vw" : "10vw",
                                fontSize: isMobile ? "4vw" : "1rem",
                                fontFamily: "MalgunGothic2",
                            }}
                        />
                    ) : (
                        <Avatar
                            src={data.image || values.image || null}
                            // onChange={(file) => data.setImage(file)}
                            changeLabel="Trocar foto"
                            variant="square"
                            style={{
                                width: isMobile ? "26vw" : "10vw",
                                height: isMobile ? "26vw" : "10vw",
                                fontSize: isMobile ? "4vw" : "1rem",
                                fontFamily: "MalgunGothic2",
                            }}
                        />
                    )}
                    <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: isMobile ? "70%" : "100%", pt: isMobile ? "2vw" : 0 }}>
                        {edit ? (
                            <>
                                <TextField
                                    label={"Nome do Kit"}
                                    name="name"
                                    value={edit ? values.name : "Kit 1"}
                                    sx={{ ...textField, width: "100%" }}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    label={"Hectares por dia"}
                                    name="hectareDay"
                                    value={edit ? values.hectareDay : "Loren impsum dolor sit amet"}
                                    sx={{ ...textField, width: "100%" }}
                                    onChange={handleChange}
                                    InputProps={{
                                        inputComponent: MaskedInputNando,
                                        inputProps: { mask: floatMask, inputMode: "numeric" },
                                        endAdornment: "ha",
                                    }}
                                    required
                                />
                            </>
                        ) : (
                            <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%" }}>
                                <p style={{ ...style_p }}>Nome do Kit </p>
                                <p style={{}}>{values.name}</p>
                                <p style={{ ...style_p }}>Hectares por dia</p>
                                <p style={{}}>{values.hectareDay} ha</p>
                            </Box>
                        )}
                    </Box>
                </Box>

                {edit ? (
                    <Box sx={{ gap: isMobile ? "2vw" : "1vw", pt: isMobile ? "2vw" : "1vw" }}>
                        <TextField
                            multiline
                            maxRows={3}
                            label={"Descrição"}
                            name="description"
                            value={edit ? values.description : "Loren impsum dolor sit amet"}
                            sx={{ ...textField, width: "100%" }}
                            onChange={handleChange}
                            required
                        />
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between", gap: "2vw" }}>
                            <TextField
                                label={"Equipamento"}
                                name="equipment"
                                value={edit ? values.equipment : "Loren impsum dolor sit amet"}
                                sx={{ ...textField, width: "50%" }}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label={"Modelo"}
                                name="model"
                                value={edit ? values.model : "Loren impsum dolor sit amet"}
                                sx={{ ...textField, width: "50%" }}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ width: 1, gap: "1vw" }}>
                        <Box>
                            <p style={{ ...style_p }}>Descrição</p>
                            <p style={{}}>{values.description}</p>
                        </Box>
                        <Box>
                            <p style={{ ...style_p }}>Equipamento</p>
                            <p style={{}}>{values.equipment} </p>
                        </Box>
                        <Box>
                            <p style={{ ...style_p }}>Modelo</p>
                            <p style={{}}>{values.model}</p>
                        </Box>
                    </Box>
                )}
                <Box sx={{}}>
                    <TitleComponents title="Objetos" button={edit} click={open} />
                    {data.listObjects?.map((item, index) => (
                        <CardObject key={index} object={item} />
                    ))}
                </Box>
                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                    <TitleComponents title="Responsáveis" button={edit} click={openEmployees} />
                    {data?.team?.map((item, index) => (
                        <CardTeam key={index} employee={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
