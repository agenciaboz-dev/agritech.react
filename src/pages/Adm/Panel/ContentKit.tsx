import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Avatar } from "@files-ui/react"
import { TitleComponents } from "../../../components/TitleComponents"
import { useDisclosure } from "@mantine/hooks"
import { ModalObject } from "../../../components/Kit/ModalObject"
import { NewObject } from "../../../definitions/object"
import { CardTeam } from "../../../components/Kit/CardTeam"
import { CardObject } from "../../../components/Kit/CardObject"
import { useHeader } from "../../../hooks/useHeader"
import { useNumberMask } from "burgos-masks"
import MaskedInputNando from "../../../components/MaskedNando"
import { ModalEmployee } from "../../../components/Kit/ModalEmployee"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface ContentKitProps {
    edit?: boolean
    values: NewKit
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    data: {
        list: User[] | undefined
        listObjects: NewObject[]
        setListObjects: (value: NewObject[]) => void
        team: User[]
        setListEmployees: (value: User[]) => void
        image: File | undefined
        setImage: React.Dispatch<React.SetStateAction<File | undefined>>
    }
}

export const ContentKit: React.FC<ContentKitProps> = ({ edit, values, handleChange, data }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })
    const textField = useResponsiveStyles()

    const [openedModalObjects, { open, close }] = useDisclosure(false)
    const [openedModalEmployees, { open: openEmployees, close: closeEmployees }] = useDisclosure(false)
    const [objeto, setObjetos] = useState<NewObject[]>([])
    useEffect(() => {
        header.setTitle("Kits")
    }, [])

    useEffect(() => {
        setObjetos(data.listObjects)
        console.log({ oia: data.listObjects })
    }, [data.listObjects])

    return (
        <Box sx={{ flexDirection: "column", gap: isMobile ? "12vw" : "1vw", width: "100%", height: "92%" }}>
            <ModalObject opened={openedModalObjects} close={close} object={data.listObjects} setObject={data.setListObjects} />
            <ModalEmployee
                opened={openedModalEmployees}
                close={closeEmployees}
                employees={data.team}
                setEmployees={data.setListEmployees}
                allEmployees={data.list}
            />

            <Box sx={{ gap: "3vw", height: "100%", overflowY: "auto", paddingBottom: "400vh" }}>
                <TitleComponents title="Informações Básicas" />
                <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw", width: "100%" }}>
                    <Avatar
                        src={data.image}
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
                    <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: isMobile ? "70%" : "100%" }}>
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
                            value={edit ? values.hectareDay : "0.0"}
                            sx={{ ...textField, width: "100%" }}
                            onChange={handleChange}
                            InputProps={{
                                inputComponent: MaskedInputNando,
                                inputProps: { mask: floatMask, inputMode: "numeric" },
                                endAdornment: "ha",
                            }}
                            required
                        />
                    </Box>
                </Box>
                <Box sx={{ width: 1, gap: isMobile ? "2vw" : "1vw" }}>
                    <TextField
                        multiline
                        maxRows={3}
                        label={"Descrição"}
                        name="description"
                        value={edit ? values.description : "Loren impsum dolor sit amet"}
                        sx={textField}
                        onChange={handleChange}
                        required
                    />
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", gap: isMobile ? "2vw" : "1vw" }}>
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
                    <Box sx={{ overflowY: "auto", gap: isMobile ? "4vw" : "1vw", pt: isMobile ? "4vw" : "1vw" }}>
                        <Box sx={{}}>
                            <TitleComponents title="Objetos" button click={open} />
                            {data.listObjects.map((item, index) => (
                                <CardObject key={index} object={item} />
                            ))}
                        </Box>
                        <Box sx={{ gap: "3vw" }}>
                            <TitleComponents title="Responsáveis" button click={openEmployees} />
                            {data.team.map((item, index) => (
                                <CardTeam key={index} employee={item} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
