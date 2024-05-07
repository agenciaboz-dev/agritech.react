import { Modal, ModalContent, TextInput, Textarea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { ButtonAgritech } from "../ButtonAgritech"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Box, CircularProgress, IconButton, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import { AiOutlineDelete } from "react-icons/ai"
import { NewObject } from "../../definitions/object"

interface ModalObjectProps {
    object: NewObject[]
    setObject: (values: NewObject[]) => void
    opened: boolean
    close: () => void
}

export const ModalObject: React.FC<ModalObjectProps> = ({ opened, close, object, setObject }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const addObject = () => {
        setObject([...object, { name: "", quantity: 1, description: "" }])
    }
    const deleteObject = (id: number) => {
        const newObj = object.filter((_, index) => index !== id)
        setObject(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target
        const newValue = name === "quantity" ? parseInt(value) : value // Parse quantity as integer
        const newObj = object.map((item, idx) => (idx === index ? { ...item, [name]: newValue } : item))
        setObject(newObj)
    }

    const saveObject = () => {
        console.log("Objetos salvos:", object)
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
            title="Inserir objetos"
            styles={{
                body: {
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? "6vw" : "2vw",
                    borderRadius: "10vw",
                    maxHeight: isMobile ? "60vh" : "50vh",
                    minHeight: "fit-content",
                },
                content: { borderRadius: isMobile ? "6vw" : "2vw" },
            }}
        >
            {object.map((objeto, index) => (
                <Box sx={{ gap: "0.5vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Objeto {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                        <TextInput
                            label="Nome"
                            name="name"
                            value={objeto.name}
                            data-autofocus
                            type="text"
                            withAsterisk
                            styles={{ root: { width: "75%" }, input: { border: "1px solid black" } }}
                            leftSection={<LiaObjectGroupSolid style={{ width: "6vw", height: "6vw" }} />}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <TextInput
                            min={1}
                            label="Qtd."
                            name="quantity"
                            type="number"
                            value={objeto.quantity}
                            withAsterisk
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value)
                                if (!isNaN(newValue) && newValue >= 0) {
                                    handleChange(index, e)
                                } else if (e.target.value === "") {
                                    handleChange(index, {
                                        target: { name: e.target.name, value: "" },
                                    } as React.ChangeEvent<HTMLInputElement>)
                                }
                            }}
                            styles={{ root: { width: "30%" }, input: { border: "1px solid black" } }}
                            leftSection={<MdNumbers style={{ width: "4.5vw", height: "4.5vw" }} />}
                        />
                    </Box>
                    <Textarea
                        label="Descrição"
                        autosize
                        maxRows={2}
                        name="description"
                        value={objeto.description}
                        styles={{ root: { width: "100%" }, input: { border: "1px solid black" } }}
                        withAsterisk
                        onChange={(e) => handleChange(index, e)}
                        leftSection={<TbFileDescription style={{ width: "5vw", height: "5vw" }} />}
                    />
                </Box>
            ))}
            <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw", paddingBottom: isMobile ? "6vw" : "2vw" }}>
                <ButtonAgritech
                    variant="outlined"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "0.8rem",
                        p: "2vw",
                        bgColor: "red",
                        color: colors.text.black,
                    }}
                    onClick={addObject}
                >
                    <MdOutlineAdd color="#000" />
                    Adicionar objeto
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "0.8rem",
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
