import { Box, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Avatar } from "@files-ui/react"
import { TitleComponents } from "../../../components/TitleComponents"
import { textField } from "../../../style/input"
import { useDisclosure } from "@mantine/hooks"
import { ModalObject } from "../../../components/Kit/ModalObject"
import { NewObject } from "../../../definitions/object"
import { CardTeam } from "../../../components/Kit/CardTeam"
import { CardObject } from "../../../components/Kit/CardObject"
import { useHeader } from "../../../hooks/useHeader"
import { useNumberMask } from "burgos-masks"
import MaskedInputNando from "../../../components/MaskedNando"
import { ModalEmployee } from "../../../components/Kit/ModalEmployee"

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
    const header = useHeader()
    const floatMask = useNumberMask({ allowDecimal: true, allowLeadingZeroes: true })

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
        <Box sx={{ flexDirection: "column", gap: "12vw", width: "100%", height: "92%" }}>
            <ModalObject
                opened={openedModalObjects}
                close={close}
                object={data.listObjects}
                setObject={data.setListObjects}
            />
            <ModalEmployee
                opened={openedModalEmployees}
                close={closeEmployees}
                employees={data.team}
                setEmployees={data.setListEmployees}
                allEmployees={data.list}
            />

            <Box sx={{ gap: "3vw", height: "30%" }}>
                <TitleComponents title="Informações Básicas" />
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                    <Avatar
                        src={data.image}
                        onChange={(file) => data.setImage(file)}
                        changeLabel="Trocar foto"
                        emptyLabel="Adicionar foto"
                        variant="square"
                        style={{
                            width: "26vw",
                            height: "26vw",
                            fontSize: "4vw",
                            fontFamily: "MalgunGothic2",
                        }}
                    />
                    <Box sx={{ flexDirection: "column", gap: "2vw", width: "70%" }}>
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
                <Box sx={{ width: 1, gap: "2vw" }}>
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
                    <Box sx={{ overflowY: "auto", gap: "4vw", pt: "4vw" }}>
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
