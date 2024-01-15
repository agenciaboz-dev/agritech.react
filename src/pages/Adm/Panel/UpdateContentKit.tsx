import { Box, TextField } from "@mui/material"
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { Avatar } from "@files-ui/react"
import { TitleComponents } from "../../../components/TitleComponents"
import { textField } from "../../../style/input"
import { useDisclosure } from "@mantine/hooks"
import { ModalObject } from "../../../components/Kit/ModalObject"
import { useIo } from "../../../hooks/useIo"
import { NewObject } from "../../../definitions/object"
import { ModalEmployee } from "../../../components/Kit/ModalEmployee"
import { CardTeam } from "../../../components/Kit/CardTeam"
import { CardObject } from "../../../components/Kit/CardObject"
import { ModalObjectUpdate } from "../../../components/Kit/ModalObjectUpdate"

interface UpdateContentKitProps {
    edit?: boolean
    values: NewKit
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    data: {
        list: User[] | undefined
        listObjects: NewObject[]
        setListObjects: (value: NewObject[]) => void
        team: User[]
        setListEmployees: (value: User[]) => void
        dataEmployee: User[] | undefined
    }
}

const style_p = {
    fontSize: "3.5vw",
    fontWeight: "bold",
}

export const UpdateContentKit: React.FC<UpdateContentKitProps> = ({ edit, values, handleChange, data }) => {
    const [image, setImage] = useState<File>()
    const io = useIo()

    const [openedModalObjects, { open, close }] = useDisclosure(false)
    const [openedModalEmployees, { open: openEmployees, close: closeEmployees }] = useDisclosure(false)

    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", width: "100%", height: "92%" }}>
            <ModalObjectUpdate
                opened={openedModalObjects}
                close={close}
                object={values.objects || []}
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
                        src={image}
                        onChange={(file) => setImage(file)}
                        changeLabel="Trocar foto"
                        emptyLabel="Adicionar foto"
                        variant="square"
                        style={{
                            width: "28vw",
                            height: "28vw",
                            fontSize: "4vw",
                            fontFamily: "MalgunGothic2",
                        }}
                    />
                    <Box sx={{ flexDirection: "column", gap: "2vw", width: "70%" }}>
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
                                    multiline
                                    maxRows={3}
                                    label={"Descrição"}
                                    name="description"
                                    value={edit ? values.description : "Loren impsum dolor sit amet"}
                                    sx={textField}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        ) : (
                            <Box sx={{ flexDirection: "column", gap: "0.5vw", width: "100%" }}>
                                <p style={{ ...style_p }}>Nome do Kit </p>
                                <p style={{}}>{values.name}</p>
                                <p style={{ ...style_p }}>Descrição</p>
                                <p style={{}}>{values.description}</p>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ overflowY: "auto", gap: "4vw" }}>
                <Box sx={{}}>
                    <TitleComponents title="Objetos" button={edit} click={open} />
                    {values.objects?.map((item, index) => (
                        <CardObject key={index} object={item} />
                    ))}
                </Box>
                <Box sx={{ gap: "3vw" }}>
                    <TitleComponents title="Responsáveis" button={edit} click={openEmployees} />
                    {data?.dataEmployee?.map((item, index) => (
                        <CardTeam key={index} employee={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}